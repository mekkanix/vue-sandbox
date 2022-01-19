<template>
  <div class="vs-app-root">
    <MainToolbar :components="components" />
    <div class="vs-app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import MainToolbar from '@ui/components/layout/MainToolbar.vue'

export default {
  name: 'VSApp',
  components: {
    MainToolbar,
  },

  props: {
    components: {
      type: Array,
      // required: true,
      default: () => [],
    },
  },

  created() {
    this.fetchPublicComponents()
    // this.setUserComponents(this.components)
  },

  methods: {
    ...mapActions({
      fetchPublicComponents: 'public/fetchPublicComponents',
    }),
    // ...mapMutations({
    //   setUserComponents: 'user_components/setUserComponents',
    // })
  },
}
</script>

<style lang="sass">
@import 'bootstrap/dist/css/bootstrap.css'
@import 'bootstrap-vue/dist/bootstrap-vue.css'
@import 'bootstrap-vue/dist/bootstrap-vue-icons.css'

// BS Overriding
.form-control:hover,
.form-control:focus
  box-shadow: none
.form-control:hover,
.form-control:focus
  border-color: #6697de

.form-control.xs
  min-height: calc(1em + 0.15rem + 1px)
  padding: 0.10rem 0.25rem
  font-size: 0.750rem
  border-radius: 0.18rem
</style>
