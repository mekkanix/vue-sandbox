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
        :vs-component="currentComponent"
        class="vs-component-wrapper-root"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatComponentPath } from '@app/helpers/Formatter.js'
import VSComponentWrapper from '@lib/components/VSComponentWrapper.vue'

export default {
  name: 'ComponentView',
  components: {
    VSComponentWrapper,
  },

  computed: {
    ...mapGetters({
      userComponents: 'user_components/userComponents',
    }),
    currentComponent () {
      for (const c of this.userComponents) {
        const formattedRouteFilepath = formatComponentPath(this.$route.params.name, true)
        if (c.filepath === formattedRouteFilepath) {
          return c
        }
      }
      return null
    },
  },
}
</script>

<style lang="sass" scoped>
.vs-content-head
  padding: 10px 20px
  border-bottom: 1px solid #bbb

.vs-component-wrapper-root
  height: calc(100vh - 112px)
</style>
