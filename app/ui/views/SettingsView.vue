<template>
  <div class="vs-view settings">
    <div class="vs-content">

      <div class="vs-content__section">
        <VSInput
          v-model="assetsDir"
          label="Assets directory"
          size="small"
          inline
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
    assetsDir: null,
  }),
}
</script>

<style lang="sass" scoped>
.vs-content
  max-width: 950px
  margin: 0 auto
</style>
