<template>
  <div class="vs-app-root">
    <MainToolbar :components="components" />
    <div class="vs-app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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

  methods: {
    ...mapMutations({
      setUserComponents: 'user_components/setUserComponents',
    })
  },

  created () {
    this.setUserComponents(this.components)
  },
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';
@import 'bootstrap-vue/dist/bootstrap-vue-icons.css';
</style>
