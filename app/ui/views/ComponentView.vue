<template>
  <div class="vs-view component">
    <div class="vs-content-head">
      <b-button
        variant="outline-primary"
        size="sm"
        :to="{ name: 'home' }"
      >
        <b-icon-arrow-left />
        Gallery
      </b-button>
    </div>
    <div class="vs-content">
      <VSComponentWrapper
        v-if="currentComponent"
        :vue="vue"
        :component="currentComponent"
        class="vs-component-wrapper-root"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { VSComponentWrapper } from 'vue-sandbox-wrapper'

export default {
  name: 'ComponentView',
  components: {
    VSComponentWrapper,
  },
  data: () => ({
    vue: Vue,
  }),

  computed: {
    ...mapGetters({
      publicComponents: 'public/components',
    }),
    currentComponent () {
      const routeParamCompName = this.$route.params.name
      for (const publicComp of this.publicComponents) {
        if (publicComp.scriptName === routeParamCompName) {
          return {
            name: publicComp.vCompName,
            compiledObject: publicComp.compiledObject,
          }
        }
      }
      return null
    },
  },
}
</script>

<style lang="sass" scoped>
@import 'vue-sandbox-wrapper/dist/vue-sandbox-wrapper.css'

.vs-content-head
  padding: 10px 20px
  border-bottom: 1px solid #bbb

.vs-component-wrapper-root
  height: calc(100vh - 112px)
</style>
