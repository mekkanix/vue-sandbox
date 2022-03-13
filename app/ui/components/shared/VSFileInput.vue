<template>
  <div class="vs-file-input">
    <Vue2Dropzone
      ref="userFiles"
      id="dropzone"
      :options="dropzoneOpts"
      @vdropzone-files-added="onUserFilesDrop"
    />
    <!-- <div
      class="vs-file-input__drop-container"
      :class="{ dragging: isDragging, over: isOver, }"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
      @click="onDropAreaClick"
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
    </div> -->
  </div>
</template>

<script>
import Vue2Dropzone from 'vue2-dropzone'

export default {
  name: 'VSFileInput',
  components: {
    Vue2Dropzone,
  },

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
    dropzoneOpts: {
      url: 'test',
      autoProcessQueue: false,
      thumbnailWidth: 100,
      thumbnailHeight: 100,
    },
    files: [],
    // isDragging: false,
    // isOver: false,
  }),

  mounted() {
    // this.initDocumentDragEvents()
  },

  methods: {
    onUserFilesDrop(files) {
      files.map(file => {
        console.log(file, file.fullPath);
      })
    },
    // initDocumentDragEvents() {
    //   document.addEventListener('dragstart', this.onDragStart)
    //   document.addEventListener('dragend', this.onDragEnd)
    // },
    // onDropAreaClick() {
    //   this.$refs.userFiles.click()
    // },
    // onDragStart(e) {
    //   this.isDragging = true
    // },
    // onDragEnd(e) {
    //   this.isDragging = false
    // },
    // onDragOver(e) {
    //   this.isOver = true
    // },
    // onDragLeave(e) {
    //   this.isOver = false
    // },
    // onDrop(e) {
    //   this.isDragging = false
    //   this.isOver = false
    //   this.$refs.userFiles.files = e.dataTransfer.files
    //   this.onChange()
    // },
    // onChange(e) {
    //   this.files = [...this.$refs.userFiles.files]
    // },
  },
}
</script>

<style lang="sass">
@import 'vue2-dropzone/dist/vue2Dropzone.min.css'
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
