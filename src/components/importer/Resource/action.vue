<template>
  <div class="c" v-if="executor && executor.data_builder">
    <v-dialog v-model="showDialog" width="500">
      <v-btn color="primary" flat icon @click="showDialog = true" slot="activator"><v-icon>adjust</v-icon></v-btn>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{ $t('execute.title')}}</v-card-title>
        <v-card-text>
          <v-text-field label="Select File" @click='pickFile' v-model="fileName" prepend-icon='attach_file'></v-text-field>
          <input type="file" ref="image" style="display: none" @change="processFile($event)">
          <v-select  :items="items" label="Type" v-model="type"></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary v-if="file" @click="generate(executor, report.form)">{{ $t('execute.action') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script>

import { FileApi } from '../../../app/Api/FileApi'
import { ImporterApi } from '../../../app/Api/ImporterApi'
import { DataBuilderApi } from '@railken/quartz/data-builder/src/app/Api/DataBuilderApi'
import Action from '@railken/quartz/data-builder/src/components/data-builder/Resource/action'

export default {
  extends: Action,
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
    generate (importer, data) {
      var self = this

      var api = new ImporterApi()

      var header = this.type === 'csv' ?  'text/csv' : 'application/vnd.ms-excel';


      const formData = new FormData();

      formData.append("file", this.target, this.target.name)

      var fileApi = new FileApi()
      fileApi.create().then((response) => {
        return fileApi.upload(response.body.data.id, formData);
      }).then(response => {
        return api.import(importer.id, { type: this.type, file_id: response.body.data.id })
      }).then(response => {
        this.showDialog = false;
        self.$notify({
          'group': 'system',
          'type': 'info',
          'text': 'Your request has been sent.',
          'title': 'Information',
          'duration': 2000
        })

      }).catch(response => {
        console.log(response)
      })
    }

  }
}
</script>
