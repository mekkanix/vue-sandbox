<template>
  <div class="vs-file-importer">
    <VSFileInput
      v-model="files"
      multiple
    />
  </div>
</template>

<script>
import VSFileInput from '@ui/components/shared/VSFileInput.vue'

export default {
  name: 'VSFileImporter',
  components: {
    VSFileInput,
  },

  data: () => ({
    files: [],
  }),
}
</script>

<style lang="sass" scoped>

</style>
