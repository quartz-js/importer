<template>
  <q-page-show v-bind="$attrs">
    <template slot='body' slot-scope="scope">
      <show :resource="scope.resource" v-bind="$attrs"/>
    </template>
    <template slot='actions' slot-scope="scope">
        <edit :resource="scope.resource" v-bind="$attrs"/>
        <action :id="scope.resource.id" :api="scope.config.manager" :handler="(id,data) => { return scope.config.manager.send(id, data)}"/>
    </template>
  </q-page-show>
</template>

<script>

import Show from '../Resource/show'
import Edit from '../Resource/edit'
import Action from '../Resource/action'

export default {
  components: {
    Show,
    Edit,
    Action
  }
}
</script>
