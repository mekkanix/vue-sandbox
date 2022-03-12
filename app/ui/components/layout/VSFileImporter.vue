<template>
  <div class="vs-file-importer">
    <div class="file-drop-container">
      <div class="file-drop-area">
        <div>Drop files here</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSFileImporter',
}
</script>

<style lang="sass" scoped>
.file-drop-container
  height: 300px
  padding: 12px
  background: #ddd

  .file-drop-area
    display: flex
    width: 100%
    height: 100%
    border: 5px dashed #aaa
    align-items: center
    justify-content: center

    > div
      display: block
      color: #aaa
      font-size: 24px
      font-weight: 700
</style>
