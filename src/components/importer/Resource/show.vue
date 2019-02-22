<template>
  <q-resource-show v-bind="$attrs">
    <template slot="show" slot-scope="scope">
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('name')" />
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('description')" />
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('data_builder_id')" />
      <q-show-text :resource="scope.resource" :attribute="scope.config.getAttribute('data')" />
    </template>
  </q-resource-show>
</template>