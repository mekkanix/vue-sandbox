<template>
  <div
    class="vsc-prop-field-object"
    :class="containerClasses"
  >
    <div
      v-for="(field, i) in localValue"
      :key="i"
      class="vsc-prop-field-wrapper"
    >
      <div v-if="field.type === '$object'" class="vsc-prop-object">
        <div class="vsc-prop-kname-wrapper">
          <b-icon-caret-down-fill :font-scale="0.7" class="vsc-prop-kname-icn" />
          <div class="vsc-prop-kname">{{ field.name }}</div>
        </div>
        <VSPropObjectField
          v-model="field.value"
          :depth="depth + 1"
        />
      </div>
      <template v-else-if="field.type === '$array'">

      </template>
      <template v-else>
        <div class="vsc-prop-primitive">
          <div class="vsc-prop-name">
            {{ field.name }}
          </div>
          <b-form-input
            type="text"
            v-model="field.value"
            size="sm"
            class="vsc-prop-value xs"
          />
        </div>
      </template>
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
    depth: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    localValue: [],
  }),

  computed: {
    containerClasses () {
      return {
        'nested-field': !!this.depth,
      }
    },
  },

  watch: {
    value: {
      handler (value) {
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
    formatPropToLocalValue (propValue, nestedValue = null) {
      let localValue = nestedValue ?? []
      for (const [name, value] of Object.entries(propValue)) {
        if (typeof value === 'object' && !Array.isArray(value)) { // Object
          localValue.push({
            name,
            type: '$object',
            value,
          })
        } else if (typeof value === 'object' && Array.isArray(value)) { // Array
          // ...
        } else { // Primitive
          localValue.push({ name, type: '$primitive', value, })
        }
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

<style lang="sass" scoped>
.vsc-prop-field-object
  &.nested-field
    padding-left: 10px

  .vsc-prop-primitive
    display: flex
    align-items: center

    .vsc-prop-name
      padding: 0 5px 0 15px
      font-size: 14px

    .vsc-prop-value
      width: 100px

  .vsc-prop-object
    .vsc-prop-kname-wrapper
      position: relative
      display: flex
      align-items: center
      min-height: 26px

      .vsc-prop-kname-icn
        position: absolute
        left: 0
        top: 8px
      .vsc-prop-kname
        padding-left: 15px
        font-size: 14px

</style>
