<template>
  <div class="vsc-prop-field-object">
    <!-- <b-form-input
      type="text"
      v-model="value"
      size="sm"
      class="form-control"
    /> -->
    <div
      v-for="(field, i) in localValue"
      :key="i"
      class="vsc-prop-field-wrapper"
    >
      <input v-model="field.value" />
    </div>
  </div>
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
      default: () => ({}),
    },
  },

  data: () => ({
    localValue: [],
  }),

  watch: {
    value: {
      handler (value) {
        console.log('ok')
        this.localValue = this.formatPropToLocalValue(value)
      },
      deep: true,
    },
    localValue: {
      handler (value) {
        // this.$emit('input', this.formatLocalToPropValue(value))
      },
      deep: true,
    },
  },

  methods: {
    formatPropToLocalValue (propValue) {
      let localValue = []
      for (const [name, value] of Object.entries(propValue)) {
        localValue.push({
          name: name,
          value,
        })
      }
      return localValue
    },
    formatLocalToPropValue (localValue) {
      let propValue = {}
      for (const field of localValue) {
        propValue[field.name] = field.value
      }
      return propValue
    },
  },

  created () {
    this.localValue = this.formatPropToLocalValue(this.value)
  },
}
</script>
