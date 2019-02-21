<template>
  <q-resource-show v-bind="$attrs">
    <template slot="show" slot-scope="scope">
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('name')" />
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('description')" />
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('data_builder_id')" />
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('data')" />
    </template>
    <template slot='actions' slot-scope="scope">
        <edit :resource="scope.resource" v-bind="$attrs"/>
        <action :id="scope.resource.id" :api="scope.config.manager" :handler="(id,data) => { return scope.config.manager.send(id, data)}"/>
    </template>
  </q-resource-show>
</template>

<script>

import Edit from './edit'
import Action from './action'


export default {
  components: {
    Edit,
    Action
  }
}
</script>
