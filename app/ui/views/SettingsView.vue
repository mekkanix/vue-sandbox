<template>
  <div class="vs-view settings">
    <div class="vs-content">

      <div class="vs-content__section">
        <h2 class="vs-content__section__title">
          General configuration
        </h2>
        <VSInput
          v-model="componentsDir"
          label="Components directory"
          size="small"
          inline
          class="vs-input-wrapper"
        />
        <VSInput
          v-model="assetsDir"
          label="Assets directory"
          size="small"
          inline
          class="vs-input-wrapper"
        />
      </div>

    </div>
  </div>
</template>

<script>
import VSInput from '@ui/components/shared/forms/VSInput.vue'

export default {
  name: 'SettingsView',
  components: {
    VSInput,
  },

  data: () => ({
    componentsDir: null,
    assetsDir: null,
  }),
}
</script>

<style lang="sass" scoped>
.vs-content
  max-width: 950px
  margin: 0 auto

  .vs-input-wrapper
    margin-bottom: 10px
</style>
