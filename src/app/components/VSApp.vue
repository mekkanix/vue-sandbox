<template>
  <div class="vs-app-root">
    <MainToolbar :components="components" />
    <router-view></router-view>
  </div>
</template>

<script>
import MainToolbar from '@app/components/layout/MainToolbar.vue'
// import VueSandbox from '@/lib/components/VueSandbox.vue'
// import VSComponentWrapper from '@/lib/components/VSComponentWrapper.vue'

export default {
  name: 'VSApp',
  components: {
    MainToolbar,
    // VueSandbox,
    // VSComponentWrapper,
  },

  props: {
    components: {
      type: Array,
      required: true,
    },
  },

  mounted () {
    console.log(this.components);
  },
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';
@import 'bootstrap-vue/dist/bootstrap-vue-icons.css';
</style>
