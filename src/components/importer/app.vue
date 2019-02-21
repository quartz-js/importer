<template>
  <div>
    <router-view :config="config"></router-view>
  </div>
</template>
<script>

import importer from '../../app/Managers/ImporterManager'

export default {
  data () {
    return {
      config: importer
    }
  }
}
</script>
