<template>
  <div class="vs-view component">
    <div class="vs-head">
      <b-button
        variant="outline-primary"
        size="sm"
        :to="{ name: 'home' }"
      >
        <b-icon-arrow-left />
        Back to gallery
      </b-button>
    </div>
    <div class="vs-content">
      <VSComponentWrapper v-if="currentComponent" :component="currentComponent" />
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
          return c.component
        }
      }
      return null
    },
  },
}
</script>

<style lang="sass" scoped>
.vs-head
  padding: 10px 20px
  border-bottom: 1px solid #bbb

.vs-content
  padding: 50px
</style>
