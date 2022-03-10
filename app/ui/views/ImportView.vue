<template>
  <div class="vs-view import">
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
      TODO:<br>
      - Multi-import panel (components, assets, keep folder structure if possible)<br>
      - Managed components' quick overview

      <VSFileImporter />
    </div>
  </div>
</template>

<script>
import VSFileImporter from '@ui/components/layout/VSFileImporter.vue'

export default {
  name: 'OverviewView',
  components: {
    VSFileImporter,
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
