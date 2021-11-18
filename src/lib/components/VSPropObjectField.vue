<template>
  <div></div>
</template>

<script>
export default {
  name: 'VSPropObjectField',

  props: {
    value: {
      type: Object,
      validator: (value) => {
        if (typeof value === 'object') {
          return true
        }
        return false
      },
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
