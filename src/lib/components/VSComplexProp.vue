<template>
  <div class="vsc-complex-prop">
    <VSPropObjectField
      v-if="typeof modelValue === 'object' && !Array.isArray(modelValue)"
      v-model="localValue"
    />
    <VSPropArrayField
      v-else-if="Array.isArray(modelValue)"
      v-model="localValue"
    />
  </div>
</template>

<script>
import { cloneDeep, sortBy, } from 'lodash'
import {
  formatFromNativeStrType,
  formatPrimitiveValueToCode,
  convertPropObjectToArray,
} from '@app/helpers/Formatter.js'
import { isValidPropName, isValidCodePrimitiveValue, } from '@app/helpers/Validator.js'
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
        let formattedValue = convertPropObjectToArray(initValue)
        formattedValue = this.formatLocalValueFields(formattedValue)
        formattedValue = this.formatLocalValueFields(formattedValue)
        return formattedValue
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
          _deleting: field._deleting ? field._deleting : false,
        }
        if (field.type === '$object') {
          newField.open = true
          newField.value = this.formatLocalValueFields(field.value)
        } else if (field.type === '$array') {

        } else {
          newField._initialized = true
          newField._editing = field._editing ? field._editing : false
          newField._cancelling = field._cancelling ? field._cancelling : false
          newField._validating = field._validating ? field._validating : false
          newField._error = field._error ? field._error : false
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
        // Object field updates
        if (field.type === '$object') {
          if (!field._editing) {
            this.updateInternalFieldValues(field.value)
          }
          // - Deleting
          if (field._deleting) {
            value.splice(i, 1)
          }
        } else if (field.type === '$array') {

        } else { // Primitive Field updates
          const strNullValue = 'null'
          // - Initialize if validated
          if (field._validating && !field._initialized) {
            field._initialized = true
          }
          // - Canceling (edit)
          if (field._cancelling) {
            if (!field._initialized) {
              value.splice(i, 1)
            } else {
              field.rawValue = field.initialValue
              field.name = field.initialName
              field.value = field.rawValue !== null ? field.rawValue.toString() : strNullValue
              field.type = this.getFormattedType(field.rawValue)
              field.userValue = formatPrimitiveValueToCode(field.rawValue, field.type)
              field._cancelling = false
            }
          } else {
            // - [continuing] Valid code provided (name & value)
            if (isValidPropName(field.name) && isValidCodePrimitiveValue(field.userValue)) {
              field._error = false
              const parsedValue = this.parseUserCodeValue(field.userValue)
              field.rawValue = parsedValue
              field.type = this.getFormattedType(parsedValue)
              field.value = parsedValue !== null ? field.rawValue.toString() : strNullValue
              // -- Field's values update if editing done
              if (!field._editing) {
                field.initialName = field.name
                field.initialValue = field.rawValue
                field._validating = false
              }
            } else { // -- Invalid code provided (error)
              field._error = true
              if (!field._editing) { // --- Reset to field's previous values if editing done
                field.name = field.initialName
                field.userValue = formatPrimitiveValueToCode(field.initialValue, field.type)
                field.rawValue = field.initialValue
                field.value = field.rawValue !== null ? field.rawValue.toString() : null
              }
            }
          }
          // - Deleting
          if (field._deleting) {
            value.splice(i, 1)
          }
        }
      }
      return value
    },
    sortLocalFields (fields) {
      let sortedFields = sortBy(fields, [field => field.name])
      for (let field of sortedFields) {
        if (field.type === '$object') {
          field.value = this.sortLocalFields(field.value)
        } else if (field.type === '$array') {

        }
      }
      return sortedFields
    },
    getFormattedType (value) {
      if (Array.isArray(value)) {
        return '$array'
      } else if (value === null) {
        return 'null'
      } else {
        return formatFromNativeStrType(typeof value)
      }
    },
    parseUserCodeValue (value) {
      return value === '""' ? "" : JSON.parse(value)
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
