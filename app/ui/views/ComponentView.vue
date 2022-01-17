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
import { formatComponentPath } from '@ui/helpers/Formatter.js'

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
      userComponents: 'user_components/userComponents',
    }),
    currentComponent () {
      for (const c of this.userComponents) {
        const formattedRouteFilepath = formatComponentPath(this.$route.params.name, true)
        if (c.filepath === formattedRouteFilepath) {
          return c.component
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
