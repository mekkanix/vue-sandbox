<template>
  <div
    class="vsc-prop-field-object"
    :class="containerClasses"
  >
    <div
      v-for="(field, i) in modelValue"
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
          v-model="field.value"
          :depth="depth + 1"
          @edit-field="onEditPropClick"
          @reset-fields="resetPropFieldsStates"
        />
      </div>
      <template v-else-if="field.type === '$array'">

      </template>
      <template v-else>
        <div class="vsc-prop-primitive" :class="{ idle: !field._editing, updating: field._editing, }">
          <template v-if="!field._editing">
            <div class="vsc-prop-name">
              <div class="vsc-prop-kv-wrapper vsc-prop-name-wrapper">
                <div class="vsc-prop-name-label">{{ field.name }}</div>
              </div>
              <div class="vsc-prop-colon">:</div>
            </div>
            <div class="vsc-prop-value">
              <VSPrimitiveValue
                :value="field.value"
                :type="field.type"
              />
              <div class="vsc-prop-actions">
                <div class="vsc-prop-action edit" @click="onEditPropClick(field)">
                  <b-icon-pencil-fill :scale="0.7" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="vsc-prop-name">
              <div class="vsc-prop-kv-wrapper vsc-prop-name-wrapper">
                <b-form-input
                  type="text"
                  v-model="field.name"
                  ref="inputKeyName"
                  size="sm"
                  class="vsc-prop-input input-name xs"
                  :class="{ 'errored': field._initialized && field._error }"
                  :style="keyNameInputStyles"
                  placeholder="name"
                  autocomplete="none"
                />
                <div class="vsc-prop-v-input v-input-name" ref="vInputKeyName">{{ field.name }}</div>
              </div>
              <div class="vsc-prop-colon">:</div>
            </div>
            <div class="vsc-prop-value">
              <div class="vsc-prop-kv-wrapper vsc-prop-value-wrapper">
                <b-form-input
                  type="text"
                  v-model="field.userValue"
                  ref="inputKeyValue"
                  size="sm"
                  class="vsc-prop-input input-value xs"
                  :class="{ 'errored': field._initialized && field._error }"
                  :style="keyValueInputStyles"
                  placeholder="value"
                  autocomplete="none"
                />
                <div class="vsc-prop-v-input v-input-value" ref="vInputKeyValue">{{ field.userValue }}</div>
              </div>
              <div class="vsc-prop-actions">
                <div
                  class="vsc-prop-action cancel-edit"
                  @click="onCancelPropEditClick(field)"
                >
                  <b-icon-x-circle :scale="0.9" />
                </div>
                <div
                  v-if="!field._error"
                  class="vsc-prop-action validate-edit"
                  @click="onValidatePropEditClick(field)"
                >
                  <b-icon-check-circle :scale="0.9" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div class="vsc-prop-row-actions">
      <span class="vsc-prop-object-add-btn">
        <b-icon-plus-circle :scale="0.8" @click="onAddPropClick" />
      </span>
    </div>
  </div>
</template>

<script>
import { clone, } from 'lodash'
import { isValidPropName, isValidCodeValue, } from '@app/helpers/Validator.js'
import VSPrimitiveValue from '@lib/components/VSPrimitiveValue.vue'

export default {
  name: 'VSPropObjectField',
  components: {
    VSPrimitiveValue,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    modelValue: [],
    $inputKeyName: null,
    $inputKeyValue: null,
    $vInputKeyName: null,
    $vInputKeyValue: null,
    vKeyNameInputWidth: 0,
    vKeyValueInputWidth: 0,
  }),

  computed: {
    containerClasses () {
      return {
        open: this.open,
        'nested-field': this.depth > 0,
      }
    },
    keyNameInputStyles () {
      return {
        width: `${this.vKeyNameInputWidth}px`,
      }
    },
    keyValueInputStyles () {
      return {
        width: `${this.vKeyValueInputWidth}px`,
      }
    },
  },

  watch: {
    modelValue: {
      handler (value) {
        this.$nextTick(() => {
          this.autosetInputsElements()
          this.handleLocalFieldUpdate(value)
          this.$emit('input', value)
        })
      },
      deep: true,
    },
  },

  methods: {
    autosetInputsElements () {
      this.$inputKeyName = this.$refs.inputKeyName && this.$refs.inputKeyName.length ? this.$refs.inputKeyName[0].$el : null
      this.$inputKeyValue = this.$refs.inputKeyValue && this.$refs.inputKeyValue.length ? this.$refs.inputKeyValue[0].$el : null
      this.$vInputKeyName = this.$refs.vInputKeyName && this.$refs.vInputKeyName.length ? this.$refs.vInputKeyName[0] : null
      this.$vInputKeyValue = this.$refs.vInputKeyValue && this.$refs.vInputKeyValue.length ? this.$refs.vInputKeyValue[0] : null
    },
    handleLocalFieldUpdate (localValue) {
      this.handleDOMUpdates()
    },
    handleDOMUpdates () {
      if (this.$inputKeyName && this.$vInputKeyName) {
        this.vKeyNameInputWidth = this.$inputKeyName.value ? this.$vInputKeyName.offsetWidth : 40
      }
      if (this.$inputKeyValue && this.$vInputKeyValue) {
        this.vKeyValueInputWidth = this.$inputKeyValue.value ? this.$vInputKeyValue.offsetWidth : 40
      }
    },
    onEditPropClick (field) {
      this.resetPropFieldsStates()
      this.$emit('edit-field', field)
      field._editing = true
      this.$nextTick(() => {
        this.autosetInputsElements()
        this.$inputKeyValue.focus()
      })
    },
    onKeyNameClick (field) {
      this.resetPropFieldsStates()
      field.open = !field.open
    },
    onCancelPropEditClick (field) {
      field._editing = false
      field._canceling = true
      field.rawValue = field.initialValue
    },
    onValidatePropEditClick (field) {
      if (!field._error) {
        field._editing = false
        field._validating = true
      }
    },
    onAddPropClick () {
      this.resetPropFieldsStates()
      const newField = {
        _initialized: false,
        _editing: true,
        _canceling: false,
        _validating: false,
        _error: false,
        type: null,
        name: null,
        value: null,
        rawValue: null,
        userValue: '',
        initialName: null,
        initialValue: null,
      }
      this.modelValue.push(newField)
      this.$nextTick(() => {
        this.autosetInputsElements()
        this.$inputKeyName.focus()
      })
    },
    resetPropFieldsStates (nestedValue) {
      let value = nestedValue ? nestedValue : this.modelValue
      for (let [i, field] of value.entries()) {
        if (field.type === '$object') {
          this.resetPropFieldsStates(field.value)
        } else if (field.type === '$array') {

        } else {
          field._editing = false

          if (!field._initialized && (!isValidPropName(field.name) || !isValidCodeValue(field.userValue))) {
            value.splice(i, 1)
          } else {
            field._initialized = true
          }
        }
      }
      this.$emit('reset-fields')
    },
  },

  created () {
    this.modelValue = this.value
  },
}
</script>

<style lang="sass" scoped>
.vsc-prop-field-object
  color: #444

  // Nested objects-specific content
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

  // Primitive value
  .vsc-prop-primitive
    position: relative
    display: flex
    align-items: center
    padding: 0 0 0 15px

    &.idle .vsc-prop-name
      border: 1px solid transparent

      .vsc-prop-colon
        margin-left: 1px

      &.vsc-prop-colon
        margin-left: 1px

    &:hover .vsc-prop-actions
      display: flex

    // - Generic input-related content
    .vsc-prop-kv-wrapper
      position: relative

      .vsc-prop-input
        padding: 0
        font-size: 14px
        box-shadow: none
        border: 1px solid transparent
        border-bottom-color: #8e949a
        border-radius: 0

        &:hover,
        &:focus
          border-bottom-color: #3667ae

        &.errored
          border-bottom-style: solid
          border-bottom-color: #dd0000

      .vsc-prop-v-input
        position: absolute
        top: 25px
        min-width: 40px
        height: 100%
        padding: 0
        white-space: nowrap
        font-size: 14px
        border: 1px solid transparent
        pointer-events: none
        visibility: hidden

    // - Specific input-related content
    .vsc-prop-name
      display: inline-flex
      align-items: baseline
      margin: 0 5px 0 0
      font-size: 14px

      .input-name
        // width: 40px

    .vsc-prop-value
      flex: 1 1 auto
      display: flex
      position: relative
      font-size: 14px

      .input-value
        width: auto
        // min-width: 40px

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
