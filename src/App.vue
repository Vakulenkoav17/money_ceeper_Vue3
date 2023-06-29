<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>



<script>
import EmptyLayout from '@/layouts/EmtyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  computed :{
    layout() {
    return this.$route.meta.layout + 'Layout'
    },
  },
  
  components:{ 
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
