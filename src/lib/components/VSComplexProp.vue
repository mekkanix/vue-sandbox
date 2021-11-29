<template>
  <div class="vsc-complex-prop">
    <VSPropObjectField
      v-if="typeof modelValue === 'object' && !Array.isArray(modelValue)"
      v-model="localValue"
      @edit-field="onEditObjectField"
    />
    <VSPropArrayField
      v-else-if="Array.isArray(modelValue)"
      v-model="localValue"
      @edit-field="onEditArrayFieldValue"
    />
  </div>
</template>

<script>
import { clone, } from 'lodash'
import {
  parsePrimitiveValue,
  formatPrimitiveValueToCode,
  convertPropObjectToArray,
  convertPropArrayToObject,
} from '@app/helpers/Formatter.js'
import { isValidPropName, isValidCodeValue, } from '@app/helpers/Validator.js'
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
          newField._initialized = true
          newField._editing = newField._editing ? newField._editing : false
          newField._canceling = newField._canceling ? newField._canceling : false
          newField._validating = newField._validating ? newField._validating : false
          newField._error = newField._error ? newField._error : false
          newField.userValue = formatPrimitiveValueToCode(field.rawValue, field.type)
          newField.value = field.rawValue !== null ? field.rawValue.toString() : null
          newField.initialName = newField.name
          newField.initialValue = newField.rawValue
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
      for (let [i, field] of value.entries()) {
        if (field.type === '$object') {
          this.updateInternalFieldValues(field.value)
        } else if (field.type === '$array') {

        } else {
          // Field updates handling
          const strNullValue = 'null'
          // Initialize field once user fills name & value
          if (!field._initialized && field._validating) {
            field._initialized = true
          }
          if (field._canceling) {
            if (!field._initialized) {
              value.splice(i, 1)
            } else {
              field.rawValue = field.initialValue
              field.name = field.initialName
              field.value = field.rawValue !== null ? field.rawValue.toString() : strNullValue
              field.type = field.rawValue !== null ? typeof field.rawValue : strNullValue
              field.userValue = formatPrimitiveValueToCode(field.rawValue, field.type)
              field._canceling = false
            }
          } else {
            // Handle user input validations & updates
            if (isValidPropName(field.name) && isValidCodeValue(field.userValue)) {
              field._error = false
              const parsedValue = JSON.parse(field.userValue)
              field.rawValue = parsedValue
              field.type = parsedValue !== null ? typeof parsedValue : strNullValue
              field.value = parsedValue !== null ? field.rawValue.toString() : strNullValue
              if (!field._editing) {
                field.initialName = field.name
                field.initialValue = field.rawValue
                field._validating = false
              }
            } else {
              field._error = true
              if (!field._editing) {
                field.rawName = field.initialName
                field.userValue = formatPrimitiveValueToCode(field.initialValue, field.type)
                field.rawValue = field.initialValue
                field.value = field.rawValue !== null ? field.rawValue.toString() : null
              }
            }
          }
        }
      }
      return value
    },
    resetPropFieldsStates (nestedValue) {
      let value = nestedValue ? nestedValue : this.localValue
      for (let field of value) {
        if (field.type === '$object') {
          this.resetPropFieldsStates(field.value)
        } else if (field.type === '$array') {

        } else {
          field._editing = false
        }
      }
    },
    onEditObjectField (field) {
      if (field.type === 'string') {
        // field.value = `"${field.value}"`
      }
    },
    // onAddObjectField (field) {
    //   console.log(field);
    // },
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
