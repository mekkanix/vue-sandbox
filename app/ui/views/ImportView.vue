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
      <!-- <p class="vs-notice">
        Select the components you want to test with VueSandbox to import them for processing.<br>
        Note that folder structure must be preserved when importing files to ensure correct processing of your components and assets.
      </p> -->


      <div style="margin-top: 100px">TODO:<br>
      - Multi-import panel (components, assets, keep folder structure if possible)<br>
      - Managed components' quick overview</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewView',
}
</script>

<style lang="sass" scoped>
.vs-content-head
  padding: 10px 10px
  border-bottom: 1px solid #bbb
</style>
