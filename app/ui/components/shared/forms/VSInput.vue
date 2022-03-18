<template>
  <div
    class="vs-input"
    :class="{
      'vs-input--inline': inline,
      'vs-input--tiny': size === 'tiny',
      'vs-input--small': size === 'small',
      'vs-input--large': size === 'large',
    }"
  >
    <label
      v-if="label"
      :for="computedId"
    >{{ label }}</label>
    <div class="vs-input__container">
      <BFormInput
        v-model="value"
        :type="type"
        :id="computedId"
        :size="formattedSize"
      />
    </div>
  </div>
</template>

<script>
import { BFormInput, } from 'bootstrap-vue'
import { random, } from '@ui/helpers/Str.js'

export default {
  name: 'VSInput',
  components: {
    BFormInput,
  },

  props: {
    value: {
      type: [String, Number,],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      validator: type => [
        'text',
      ].includes(type)
    },
    id: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
      validator: size => ['small', 'normal', 'large',].includes(size)
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    computedId: null,
  }),

  computed: {
    formattedSize() {
      const sizesMap = {
        // tiny: 'sm',
        small: 'sm',
        normal: 'md',
        large: 'lg',
      }
      return sizesMap[this.size]
    },
  },

  created() {
    this.initComputedId()
  },

  methods: {
    initComputedId() {
      this.computedId = this.id || `vs-input-${random(16)}`
    },
  },
}
</script>

<style lang="sass" scoped>
.vs-input
  font-size: 16px
  box-sizing: content-box

  // layout
  &--inline
    display: flex
    align-items: center

    label
      flex: 0 0 30%
    .vs-input__container
      flex: 1 0 70%

  // size
  &--tiny
    font-size: 12px

  &--small
    font-size: 14px
  &--large
    font-size: 18px

  label
    padding: 0 10px
</style>
