<template>
  <div>
    <b-breadcrumb :items="items"/>
    <b-form-file v-model="file"></b-form-file>
  </div>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data() {
    return {
      file:null,
      items:[{
        text: 'Admin',
        href: '#'
      }, {
        text: 'Manage',
        href: '#'
      }, {
        text: 'Library',
        active: true
      }]
    }
  }

}
</script>
<style lang="less" scoped>

</style>
