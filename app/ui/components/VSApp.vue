<template>
  <div class="vs-app-root">
    <VSMainToolbar :components="publicComponents" />
    <div class="vs-app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex'
import VSMainToolbar from '@ui/components/layout/VSMainToolbar.vue'

export default {
  name: 'VSApp',
  components: {
    VSMainToolbar,
  },

  computed: {
    ...mapGetters({
      publicComponents: 'public/components',
    }),
  },

  created() {
    this.fetchPublicComponents()
  },

  methods: {
    ...mapActions({
      fetchPublicComponents: 'public/fetchPublicComponents',
    }),
  },
}
</script>

<style lang="sass">
@import 'bootstrap/dist/css/bootstrap.css'
@import 'bootstrap-vue/dist/bootstrap-vue.css'
@import 'bootstrap-vue/dist/bootstrap-vue-icons.css'

@import 'common/layout.sass'

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
