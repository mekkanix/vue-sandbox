<template>
  <span class="vs-primitive-value" :class="cssClasses">
    {{ codeFormattedValue }}
  </span>
</template>

<script>
import { formatPrimitiveValueToCode, } from '@app/helpers/Formatter.js'

export default {
  name: 'VSPrimitiveValue',

  props: {
    value: {
      type: [Boolean, String, Number, Date,],
    },
    type: {
      type: String,
      required: true,
      validator: value => ['boolean', 'string', 'number', 'date', 'null'].includes(value),
    },
  },

  computed: {
    codeFormattedValue () {
      // This is needed because passing an empty string "" to a prop makes Vue convert it to `true`
      const value = this.value === true && this.type === 'string' ? '' : this.value
      return formatPrimitiveValueToCode(value, this.type)
    },
    cssClasses () {
      return {
        't-null': this.type === 'null',
        't-boolean': this.type === 'boolean',
        't-string': this.type === 'string',
        't-number': this.type === 'number',
        't-date': this.type === 'date',
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.vs-primitive-value
  &.t-null
    color: #ba4b00
  &.t-boolean
    color: #ba4b00
  &.t-string
    color: #148e15
  &.t-number
    color: #ba4b00
</style>
