<template>
  <div class="c" v-if="resource && resource.data_builder">
    <v-dialog v-model="showDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary" flat icon class='ma-0 mx-1' small><v-icon size=19>fas fa-upload</v-icon></v-btn>
      </template>
      <q-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{ $t('execute.title')}}</v-card-title>
        <v-card-text>
          <v-text-field label="Select File" @click='pickFile' v-model="fileName" prepend-icon='attach_file'></v-text-field>
          <input type="file" ref="image" style="display: none" @change="processFile($event)">
          <v-select  :items="items" label="Type" v-model="type"></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary v-if="file" @click="generate(resource)">{{ $t('execute.action') }}</v-btn>
        </v-card-actions>
      </q-card>
    </v-dialog>
  </div>

</template>
<script>

import { DataResolver } from '@quartz/data-view/src/app/Services/DataResolver'
import { FileApi } from '@quartz/file/src/app/Api/FileApi'

export default {
  props: [
    'resource'
  ],
  data () {
    return {
      showDialog: false,
      uid: null,
      file: null,
      importer: null,
      type: null,
      target: null,
      fileName: null,
      items: ['csv', 'xlsx']
    }
  },
  methods: {

    pickFile () {
        this.$refs.image.click ()
    },
    processFile (event) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.file = e.target.result;
      }
      this.target = event.target.files[0];
      this.fileName = this.target.name;

      reader.readAsText(event.target.files[0])
    },
    generate (importer) {
      var self = this
      let dataResolver = new DataResolver();

      var api = dataResolver.newApiByName("importer");
      var fileApi = new FileApi();

      var header = this.type === 'csv' ?  'text/csv' : 'application/vnd.ms-excel';

      const formData = new FormData();

      formData.append("file", this.target, this.target.name)

      fileApi.create().then((response) => {
        return fileApi.upload(response.body.data.id, formData, (progress) => {
          console.log(progress);
        });
      }).then(response => {
        return api.post('/' + importer.id + '/execute', { type: this.type, file_id: response.body.data.id })
      }).then(response => {
        window.bus.$emit("message", {
          message: "Your request has been sent",
          type: "info"
        });
      }).catch(response => {
        window.bus.$emit("message", {
          message: response.body.errors[0].message,
          type: "error"
        });
      }).finally(response => {
        this.showDialog = false;
      })
    }

  }
}
</script>
