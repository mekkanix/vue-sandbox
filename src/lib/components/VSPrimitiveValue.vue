<template>
  <span class="vs-primitive-value" :class="cssClasses">
    {{ formatPrimitiveValue(value, type) }}
  </span>
</template>

<script>
import { formatPrimitiveValue, } from '@app/helpers/Formatter.js'

export default {
  name: 'VSPrimitiveValue',

  data: () => ({
    formatPrimitiveValue: formatPrimitiveValue,
  }),

  props: {
    value: {
      type: [Boolean, String, Number, Date,],
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: value => ['boolean', 'string', 'number', 'date',].includes(value),
    },
  },

  computed: {
    cssClasses () {
      return {
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
  &.t-boolean
    color: #7e21be
  &.t-string
    color: #148e15
  &.t-number
    color: #ba5b10
</style>
