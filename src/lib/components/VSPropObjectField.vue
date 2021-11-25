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
        class="vsc-prop-subobject"
        :class="{ open: field.open, }"
      >
        <div class="vsc-prop-object-kname-box" @click="onKeyNameClick(field)">
          <b-icon-caret-right-fill :font-scale="0.6" color="#555" class="vsc-prop-object-kname-icn" />
          <div class="vsc-prop-object-kname">{{ field.name }}</div>
        </div>
        <VSPropObjectField
          v-show="field.open"
          v-model="field.rawValue"
          :depth="depth + 1"
        />
      </div>
      <template v-else-if="field.type === '$array'">

      </template>
      <template v-else>
        <div class="vsc-prop-primitive" :class="{ idle: !field._updating, updating: field._updating, }">
          <template v-if="!field._updating">
            <div class="vsc-prop-name">
              {{ field.name }}:
            </div>
            <div class="vsc-prop-value">
              <VSPrimitiveValue
                :value="field.value"
                :type="field.type"
              />
            </div>
            <div class="vsc-prop-actions">
              <div class="vsc-prop-action edit">
                <b-icon-pencil-fill :scale="0.7" @click="onEditPropClick(field)" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="vsc-prop-name">
              <b-form-input
                type="text"
                v-model="field.name"
                size="sm"
                class="vsc-prop-name-input xs"
                placeholder="Name"
              />:
            </div>
            <div class="vsc-prop-value">
              <b-form-input
                type="text"
                v-model="field.value"
                size="sm"
                class="vsc-prop-value-input xs"
                placeholder="Value"
              />
            </div>
          </template>
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
import { cloneDeep } from 'lodash'
import { convertPropObjectToArray, } from '@app/helpers/Formatter.js'
import VSPrimitiveValue from '@lib/components/VSPrimitiveValue.vue'

/**
 * !!! TO SOLVE !!!
 * Actually, component's internal values (such as <field>._updating) cannot be updated
 * from parent component because v-model bindings don't contain this information (simple "key-value" pairs).
 *
 * --> Find a way to communicate such informations between components recursion.
 */

export default {
  name: 'VSPropObjectField',
  components: {
    VSPrimitiveValue,
  },

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
    localValue: {
      handler (value) {
        const processedValue = this.updateValueFromRawValue(value)
        this.$emit('input', this.formatLocalToPropValue(processedValue))
      },
      deep: true,
    },
  },

  methods: {
    formatPropToLocalValue (propValue) {
      let fmtValue = convertPropObjectToArray(propValue)
      fmtValue = this.formatPropObjectFields(fmtValue)
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

        } else {
          field._updating = false
        }
      }
      return fields
    },
    updateValueFromRawValue (fields) {
      let fmtFields = cloneDeep(fields) // avoid watcher's infinite loop while manipulating `localValue` reference (`fields`)
      for (let field of fmtFields) {
        if (field.type === '$object') {
          field.value = convertPropObjectToArray(field.rawValue)
          this.updateValueFromRawValue(field.value)
        } else if (field.type === '$array') {

        }
      }
      return fmtFields
    },
    onEditPropClick (field) {
      this.resetPropFieldsStates()
      field._updating = true
    },
    onKeyNameClick (field) {
      field.open = !field.open
    },
    onAddObjectFieldClick () {
      this.localValue.push({
        type: null,
        name: null,
        _updating: true,
      })
    },
    resetPropFieldsStates (nestedValue) {
      let value = nestedValue ?? this.localValue
      for (let field of value) {
        if (field.type === '$object') {
          this.resetPropFieldsStates(field.value)
        } else if (field.type === '$array') {

        } else {
          field._updating = false
        }
      }
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

    &:hover .vsc-prop-actions
      display: flex

    .vsc-prop-name
      padding: 0 5px 0 15px
      font-size: 14px

    .vsc-prop-value
      font-size: 14px

    .vsc-prop-actions
      display: none
      padding-left: 5px
      align-items: center

      .vsc-prop-action
        height: 21px
        flex: 0 0 21px
        display: flex
        align-items: center
        justify-content: center
        color: #777
        cursor: pointer

        &:hover
          color: #333

  .vsc-prop-subobject
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
