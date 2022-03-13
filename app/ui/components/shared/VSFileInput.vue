<template>
  <div class="vs-file-input">
    <div
      class="vs-file-input__drop-container"
      :class="{ dragging: isDragging, over: isOver, }"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <div class="vs-file-input__drop-area">
        <div>Drop files here</div>
      </div>
      <input
        type="file"
        :multiple="multiple"
        ref="userFiles"
        @change="onChange"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSFileInput',

  props: {
    value: {
      type: [Object, Array,],
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    files: {},
    isDragging: false,
    isOver: false,
  }),

  mounted() {
    this.initDocumentDragEvents()
  },

  methods: {
    initDocumentDragEvents() {
      document.addEventListener('dragstart', this.onDragStart)
      document.addEventListener('dragend', this.onDragEnd)
    },
    onDropAreaClick() {
      this.$refs.userFiles.click()
    },
    onDragStart(e) {
      this.isDragging = true
    },
    onDragEnd(e) {
      this.isDragging = false
    },
    onDragOver(e) {
      this.isOver = true
    },
    onDragLeave(e) {
      this.isOver = false
    },
    onDrop(e) {
      this.isDragging = false
      this.isOver = false
      // this.$refs.userFiles.files = e.dataTransfer.files
      // this.onChange(e)
      this.handleFileSystemImport(e)
    },
    onChange(e) {
      
    },
    handleFileSystemImport(e) {
      async function* getFilesRecursively (entry) {
        if (entry.kind === 'file') {
          const file = await entry.getFile()
          if (file !== null) {
            file.relativePath = getRelativePath(entry)
            yield file
          }
        } else if (entry.kind === 'directory') {
          for await (const handle of entry.values()) {
            yield* getFilesRecursively(handle)
          }
        }
      }

      // for await (const fileHandle of getFilesRecursively(directoryHandle)) {
      //   console.log(fileHandle);
      // }

      for (const [_, item] of Object.entries(e.dataTransfer.items)) {
        item.getAsFileSystemHandle()
          .then(file => {
            console.log(getFilesRecursively(file)._invoke())
            // if (file.kind === 'file') {

            // } else if (file.kind === 'directory') {

            // }
          })
        // item.getAsString((data) => {
        //   console.log(data);
        // })
        console.log('--------------------');
      }
      // this.files = [...this.$refs.userFiles.files]
    },
  },
}
</script>

<style lang="sass">
// @import 'vue2-dropzone/dist/vue2Dropzone.min.css'
</style>
<style lang="sass" scoped>
.vs-file-input__drop-container
  height: 300px
  padding: 12px
  background: #ddd

  &.dragging
    background: #888
  &.over
    background: green

  input[type="file"]
    visibility: hidden !important
    opacity: 0 !important

  .vs-file-input__drop-area
    display: flex
    width: 100%
    height: 100%
    border: 5px dashed #aaa
    align-items: center
    justify-content: center
    cursor: pointer

    > div
      display: block
      color: #aaa
      font-size: 24px
      font-weight: 700
</style>
