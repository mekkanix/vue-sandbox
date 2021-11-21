<template>
  <div></div>
</template>

<script>
export default {
  name: 'VSPropArrayField',

  props: {
    value: {
      type: Array,
      validator: (value) => {
        if (Array.isArray(value)) {
          return true
        }
        return false
      },
      default: () => ([]),
    },
  },

  data: () => ({
    currentValue: null,
  }),

  watch: {
    value: {
      handler (value) {
        this.currentValue = value
      },
      deep: true,
    },
    currentValue: {
      handler (value) {
        this.$emit('input', value)
      },
      deep: true,
    },
  },

  created () {
    this.currentValue = this.value
  },
}
</script>
