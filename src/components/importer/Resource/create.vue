<template>
  <q-resource-create v-bind="$attrs">
    <template slot='create' slot-scope="scope">
      <q-text v-model="scope.resource" :attribute="scope.config.getAttribute('name')" :errors="scope.errors"/>
      <q-textarea v-model="scope.resource" :attribute="scope.config.getAttribute('description')" :errors="scope.errors"/>
      <q-belongs-to v-model="scope.resource" :attribute="scope.config.getAttribute('data_builder_id')" :errors="scope.errors"/>
      <q-yaml v-model="scope.resource" :attribute="scope.config.getAttribute('data')" :errors="scope.errors"/>
    </template>
  </q-resource-create>
</template>