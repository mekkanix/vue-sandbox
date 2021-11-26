<template>
  <div class="vsc-complex-prop">
    <VSPropObjectField
      v-if="typeof modelValue === 'object' && !Array.isArray(modelValue)"
      v-model="localValue"
      @edit-prop="onEditObjectValue"
    />
    <VSPropArrayField
      v-else-if="Array.isArray(modelValue)"
      v-model="localValue"
      @edit-prop="onEditArrayValue"
    />
  </div>
</template>

<script>
import { parsePrimitiveValue, convertPropObjectToArray, convertPropArrayToObject, } from '@app/helpers/Formatter.js'
import VSPropObjectField from '@lib/components/VSPropObjectField.vue'
import VSPropArrayField from '@lib/components/VSPropArrayField.vue'

export default {
  name: 'VSComplexProp',
  components: {
    VSPropObjectField,
    VSPropArrayField,
  },

  props: {
    value: {
      type: [Object, Array,],
      required: true,
    },
  },

  data: () => ({
    modelValue: null,
    localValue: null,
  }),

  watch: {
    value: {
      handler (value) {
        this.modelValue = value
      },
      deep: true,
    },
    modelValue: {
      handler (value) {
        this.$emit('input', value)
      },
      deep: true,
    },
    localValue: {
      handler (value) {
        const updatedValue = this.updateValueFromRawValue(value)
        this.modelValue = this.formatLocalToModelValue(updatedValue)
      },
      deep: true,
    },
  },

  methods: {
    formatLocalValue (initValue) {
      if (typeof initValue === 'object' && !Array.isArray(initValue)) { // Object
        const formattedValue = convertPropObjectToArray(initValue)
        return this.formatLocalValueFields(formattedValue)
      } else { // Array
        return []
      }
    },
    formatLocalValueFields (value) {
      const fields = []
      for (let field of value) {
        let newField = {
          name: field.name,
          type: field.type,
          rawValue: field.rawValue,
        }
        if (field.type === '$object') {
          newField.open = true
          newField.value = this.formatLocalValueFields(field.value)
        } else if (field.type === '$array') {

        } else {
          newField._editing = false
          newField.value = field.value
        }
        fields.push(newField)
      }
      return fields
    },
    formatLocalToModelValue (modelValue) {
      let propValue = {}
      for (const field of modelValue) {
        if (field.type === '$object') {
          propValue[field.name] = this.formatLocalToModelValue(field.value)
        } else if (field.type === '$array') {

        } else {
          propValue[field.name] = field.rawValue
        }
      }
      return propValue
    },
    updateValueFromRawValue (value) {
      // let udpatedValue = cloneDeep(value) // avoid watcher's infinite loop while manipulating `modelValue` reference (`fields`)
      for (let field of value) {
        if (field.type === '$object') {
          this.updateValueFromRawValue(field.value)
        } else if (field.type === '$array') {

        } else if (field.value !== field.rawValue) {
          field.rawValue = parsePrimitiveValue(field.value, field.type)
        }
      }
      return value
    },
    resetPropFieldsStates (nestedValue) {
      let value = nestedValue ?? this.lcaoValue
      for (let field of value) {
        if (field.type === '$object') {
          this.resetPropFieldsStates(field.value)
        } else if (field.type === '$array') {

        } else {
          field._editing = false
        }
      }
    },
    onEditObjectValue (field) {
      console.log(field);
    },
    onEditArrayValue (field) {
      console.log(field);
    },
  },

  created () {
    this.modelValue = this.value
    this.localValue = this.formatLocalValue(this.value)
  },
}
</script>
