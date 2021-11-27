<template>
  <div class="vsc-complex-prop">
    <VSPropObjectField
      v-if="typeof modelValue === 'object' && !Array.isArray(modelValue)"
      v-model="localValue"
      @field-edit="onEditObjectFieldValue"
    />
    <VSPropArrayField
      v-else-if="Array.isArray(modelValue)"
      v-model="localValue"
      @field-edit="onEditArrayFieldValue"
    />
  </div>
</template>

<script>
import {
  parsePrimitiveValue,
  formatPrimitiveValueToCode,
  convertPropObjectToArray,
  convertPropArrayToObject,
} from '@app/helpers/Formatter.js'
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
        const updatedValue = this.updateInternalFieldValues(value)
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
          newField._error = false
          newField.userValue = formatPrimitiveValueToCode(field.rawValue, field.type)
          newField.value = field.rawValue.toString()
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
    updateInternalFieldValues (value) {
      for (let field of value) {
        if (field.type === '$object') {
          this.updateInternalFieldValues(field.value)
        } else if (field.type === '$array') {

        } else {
          if (this.isValidCodeValue(field.userValue)) {
            field._error = false
            const parsedValue = JSON.parse(field.userValue)
            if (parsedValue !== field.value) {
              field.rawValue = parsedValue
              field.value = field.rawValue.toString()
            }
          } else {
            field._error = true
            // field.rawValue = field.value
            // field.userValue = formatPrimitiveValueToCode(field.rawValue, field.type)
            // field.value = field.rawValue.toString()
          }
          // const isValidValue = this.checkForValidPrimitive(field.userValue)
          // console.log(isValidValue);
          // field.rawValue = parsePrimitiveValue(field.value, field.type)
        }
      }
      return value
    },
    isValidCodeValue (value) {
      // NOTE: Use this code basis if custom validation processes/errors are needed.
      // For now, simple `JSON.parse` error handling makes the trick for generic error management.
      // ("Don't reinvent the wheel, huh?")
      // ==========
      /* const stringDelimiters = value.match(/"|'/g)
      const validString = !!(stringDelimiters && stringDelimiters.length === 2)
      const validBoolean = ['true', 'false',].includes(value)
      const validNumber = !isNaN(parseInt(value))
      console.log(value, validString, validBoolean, validNumber);
      return validString || validBoolean || validNumber */

      try {
        JSON.parse(value)
        return true
      } catch (e) {
        return false
      }
    },
    checkForValidPrimitive (value) {
      console.log(value)
      // console.log(JSON.parse(value))
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
    onEditObjectFieldValue (field) {
      if (field.type === 'string') {
        // field.value = `"${field.value}"`
      }
    },
    onEditArrayFieldValue (field) {
      console.log(field);
    },
  },

  created () {
    this.modelValue = this.value
    this.localValue = this.formatLocalValue(this.value)
  },
}
</script>
