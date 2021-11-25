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
      <div
        v-if="field.type === '$object'"
        class="vsc-prop-object"
        :class="{ open: field.open, }"
      >
        <div class="vsc-prop-object-kname-box" @click="onKeyNameClick(field)">
          <b-icon-caret-right-fill :font-scale="0.6" color="#555" class="vsc-prop-object-kname-icn" />
          <div class="vsc-prop-object-kname">{{ field.name }}</div>
        </div>
        <VSPropObjectField
          v-show="field.open"
          :value="field.raw"
          :depth="depth + 1"
          @update-value="field.raw = $event"
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
    <div class="vsc-prop-row-actions">
      <span class="vsc-prop-object-add-btn">
        <b-icon-plus-circle :scale="0.8" @click="onAddObjectFieldClick" />
      </span>
    </div>
  </div>
</template>

<script>
import { convertPropObjectToArray, } from '@app/helpers/Formatter.js'

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
        open: this.open,
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
        this.$emit('update-value', this.formatLocalToPropValue(value))
      },
      deep: true,
    },
  },

  methods: {
    formatPropToLocalValue (propValue) {
      let fmtValue = convertPropObjectToArray(propValue)
      console.log(fmtValue);
      fmtValue = this.formatPropObjectFields(fmtValue)
      // console.log(fmtValue);
      // let fmtValue = []
      // for (const [name, value] of Object.entries(propValue)) {
      //   if (!value._localFormatted) {
      //     if (typeof value === 'object' && !Array.isArray(value)) { // Object
      //       const row = {
      //         name,
      //         type: '$object',
      //         rawValue: value,
      //         value: this.formatPropToLocalValue(value),
      //         open: true,
      //         _localFormatted: true,
      //       }
      //       fmtValue.push(row)
      //     } else if (typeof value === 'object' && Array.isArray(value)) { // Array
      //       // ...
      //     } else { // Primitive
      //       fmtValue.push({
      //         name,
      //         type: typeof value,
      //         value,
      //         _localFormatted: true,
      //       })
      //     }
      //   }
      // }
      return fmtValue
    },
    formatLocalToPropValue (localValue) {
      let propValue = {}
      for (const field of localValue) {
        if (field.type === '$object') {
          propValue[field.name] = this.formatLocalToPropValue(field.value)
        } else if (field.type === '$array') {

        } else {
          propValue[field.name] = field.value
        }
      }
      return propValue
    },
    formatPropObjectFields (fields) {
      for (let field of fields) {
        if (field.type === '$object') {
          field.open = true
          this.formatPropObjectFields(field.value)
        } else if (field.type === '$array') {

        }
      }
      return fields
    },
    onKeyNameClick (field) {
      field.open = !field.open
    },
    onAddObjectFieldClick () {
      console.log(this.localValue);
    },
  },

  created () {
    this.localValue = this.formatPropToLocalValue(this.value)
  },
}
</script>

<style lang="sass" scoped>
.vsc-prop-field-object
  color: #444

  &.nested-field
    position: relative
    padding-left: 16px

    &::before
      content: ''
      display: block
      position: absolute
      top: 0
      bottom: 0
      left: 16px
      background: #ddd
      width: 1px

  .vsc-prop-primitive
    display: flex
    align-items: center

    .vsc-prop-name
      padding: 0 5px 0 15px
      font-size: 14px

    .vsc-prop-value
      width: 100px

  .vsc-prop-object
    &.open > .vsc-prop-object-kname-box > .vsc-prop-object-kname-icn
      transform: rotate(90deg)

    .vsc-prop-object-kname-box
      position: relative
      display: flex
      align-items: center
      min-height: 22px
      padding-bottom: 1px
      color: #444
      cursor: pointer

      .vsc-prop-object-kname-icn
        position: absolute
        left: 4px
        top: 6px
      .vsc-prop-object-kname
        padding-left: 15px
        font-size: 14px

  .vsc-prop-row-actions
    margin-left: 15px

    .vsc-prop-object-add-btn
      color: #777
      cursor: pointer

      &:hover
        color: #333

</style>
