<template>
  <div
    class="vsc-prop-field-array"
    :class="containerClasses"
  >
    <template v-if="modelValue.length">
      <div
        v-for="(field, i) in modelValue"
        :key="i"
        class="vsc-prop-field-wrapper"
      >

        <!-- Prop: Array -->
        <div
          v-if="field.type === '$array'"
          class="vsc-prop-subarray"
          :class="{ open: field.open, }"
        >
          <div class="vsc-prop-kname-box">
            <div
              class="vsc-prop-kname-wrapper"
              :class="{ 'opening-disabled': !field._initialized }"
              @click="onNestedGroupKeyNameClick(field)"
            >
              <b-icon-caret-right-fill
                :font-scale="0.6"
                color="#555"
                class="vsc-prop-array-kname-icn"
              />
              <div class="vsc-prop-array-icn">
                <span class="prop-type">Array</span>
                <span class="prop-type-icn" v-show="!field.open">[...]</span>
              </div>
            </div>
            <div class="vsc-prop-array-actions">
              <div
                class="vsc-prop-action delete"
                @click="onDeletePropClick(field)"
              >
                <b-icon-trash-fill :scale="0.9" />
              </div>
            </div>
          </div>
          <VSPropArrayField
            v-show="field.open"
            v-model="field.value"
            :depth="depth + 1"
            :parent-type="field.type"
            @delete-field="onDeletePropClick"
            @reset-fields="resetPropFieldsStates"
          />
        </div>

        <!-- Prop: Object -->
        <template v-else-if="field.type === '$object'">
          <div
            v-if="parentType === '$array'"
            class="vsc-prop-kname-box"
            :class="{ open: field.open, }"
          >
            <div
              class="vsc-prop-kname-wrapper"
              :class="{ 'opening-disabled': !field._initialized }"
              @click="onNestedGroupKeyNameClick(field)"
            >
              <b-icon-caret-right-fill
                :font-scale="0.6"
                color="#555"
                class="vsc-prop-array-kname-icn"
              />
              <div class="vsc-prop-object-kname">
                <span class="prop-type">Object</span>
                <span v-show="!field.open" class="prop-type-icn">{...}</span>
              </div>
            </div>
            <div class="vsc-prop-actions">
              <div
                class="vsc-prop-action delete"
                @click="onDeletePropClick(field)"
              >
                <b-icon-trash-fill :scale="0.9" />
              </div>
            </div>
          </div>
          <!-- VSPropObjectField -->
          <component
            v-if="objFieldComp"
            :is="objFieldComp"
            v-model="field.value"
            v-show="field.open"
            :depth="depth + 1"
            :parent-type="field.type"
            @delete-field="onDeletePropClick"
            @reset-fields="resetPropFieldsStates"
          />
        </template>

        <!-- Prop: Primitive -->
        <template v-else>
          <div class="vsc-prop-primitive" :class="{ idle: !field._editing, updating: field._editing, }">
            <template v-if="!field._editing">
              <div class="vsc-prop-value">
                <VSPrimitiveValue
                  :value="field.value"
                  :type="field.type"
                />
                <div class="vsc-prop-actions">
                  <div class="vsc-prop-action edit" @click="onEditPropClick(field)">
                    <b-icon-pencil-fill :scale="0.7" />
                  </div>
                  <div
                    v-if="field._initialized"
                    class="vsc-prop-action delete"
                    @click="onDeletePropClick(field)"
                  >
                    <b-icon-trash-fill :scale="0.9" />
                  </div>
                  <div
                    v-if="field._initialized"
                    class="vsc-prop-action convert2object"
                    @click="onConvertToObjectPropClick(field)"
                  >
                    <span>{}</span>
                  </div>
                  <div
                    v-if="field._initialized"
                    class="vsc-prop-action convert2array"
                    @click="onConvertToArrayPropClick(field)"
                  >
                    <span>[]</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
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
                    @keyup.enter.native="onValidatePropEditClick(field)"
                    @keyup.esc.native="onCancelPropEditClick(field)"
                  />
                  <div class="vsc-prop-v-input v-input-value" ref="vInputKeyValue">{{ field.userValue }}</div>
                </div>
                <div class="vsc-prop-actions">
                  <div
                    v-if="!field._error"
                    class="vsc-prop-action validate-edit"
                    @click="onValidatePropEditClick(field)"
                  >
                    <b-icon-check-circle :scale="0.9" />
                  </div>
                  <div
                    class="vsc-prop-action cancel-edit"
                    @click="onCancelPropEditClick(field)"
                  >
                    <b-icon-x-circle :scale="0.9" />
                  </div>
                  <div
                    v-if="field._initialized"
                    class="vsc-prop-action delete"
                    @click="onDeletePropClick(field)"
                  >
                    <b-icon-trash-fill :scale="0.9" />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="vsc-prop-array-blank">(empty)</div>
    </template>
    <div class="vsc-prop-row-actions">
      <span class="vsc-prop-action add-primitive" @click="onAddPropClick()">
        <b-icon-plus-circle :scale="1" />
      </span>
      <span class="vsc-prop-action convert2object add-object" @click="onAddPropClick('$object')">
        +{}
      </span>
      <span class="vsc-prop-action convert2array add-array" @click="onAddPropClick('$array')">
        +[]
      </span>
    </div>
  </div>
</template>

<script>
import { isValidPropName, isValidCodePrimitiveValue, } from '@app/helpers/Validator.js'
import VSPrimitiveValue from '@lib/components/VSPrimitiveValue.vue'

export default {
  name: 'VSPropArrayField',
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
    parentType: {
      type: String,
      default: null,
    }
  },

  data: () => ({
    objFieldComp: null,
    modelValue: [],
    $inputKeyValue: null,
    $vInputKeyValue: null,
    vKeyValueInputWidth: 0,
  }),

  computed: {
    containerClasses () {
      return {
        open: this.open,
        'nested-field': this.depth > 0,
        'parent-array': this.parentType === '$array',
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
    hasNestedObjectFields () {
      return !!this.modelValue.filter(field => field.type === '$object').length
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
    hasNestedObjectFields (value) {
      if (value) {
        this.objFieldComp = require('@lib/components/VSPropObjectField.vue').default
      }
    },
  },

  methods: {
    autosetInputsElements () {
      this.$inputKeyValue = this.$refs.inputKeyValue && this.$refs.inputKeyValue.length ? this.$refs.inputKeyValue[0].$el : null
      this.$vInputKeyValue = this.$refs.vInputKeyValue && this.$refs.vInputKeyValue.length ? this.$refs.vInputKeyValue[0] : null
    },
    handleLocalFieldUpdate (localValue) {
      this.handleDOMUpdates()
    },
    handleDOMUpdates () {
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
        if (this.$inputKeyValue) {
          this.$inputKeyValue.focus()
        }
      })
    },
    onNestedGroupKeyNameClick (field) {
      if (field._initialized) {
        this.resetPropFieldsStates()
        field.open = !field.open
      }
    },
    onCancelPropEditClick (field) {
      field._editing = false
      field._cancelling = true
      field.rawValue = field.initialValue
    },
    onValidatePropEditClick (field) {
      if (!field._error) {
        field._editing = false
        field._validating = true
      }
    },
    onAddPropClick (specialType = null) {
      this.resetPropFieldsStates()
      let newField = null
      if (!specialType) {
        newField = {
          _initialized: false,
          _editing: true,
          _cancelling: false,
          _validating: false,
          _deleting: false,
          _converting: false,
          _error: false,
          type: null,
          name: null,
          value: null,
          rawValue: null,
          userValue: '',
          initialName: null,
          initialValue: null,
        }
      } else {
        if (specialType === '$object') {
          newField = {
            _initialized: true,
            _editing: false,
            _cancelling: false,
            _validating: false,
            _deleting: false,
            _error: false,
            open: false,
            type: '$object',
            name: '',
            value: [],
            rawValue: {},
            initialName: '',
          }
        } else if (specialType === '$array') {
          newField = {
            _initialized: true,
            _editing: false,
            _cancelling: false,
            _validating: false,
            _deleting: false,
            _error: false,
            open: false,
            type: '$array',
            name: null,
            value: [],
            rawValue: [],
            initialName: null,
          }
        }
      }
      this.modelValue.push(newField)
      this.$nextTick(() => {
        this.autosetInputsElements()
        if (this.$inputKeyValue) {
          this.$inputKeyValue.focus()
        }
      })
    },
    onDeletePropClick (field) {
      this.resetPropFieldsStates()
      field._deleting = true
    },
    onConvertToObjectPropClick (field) {
      if (!field._error) {
        field._converting = '$object'
      }
    },
    onConvertToArrayPropClick (field) {
      if (!field._error) {
        field._converting = '$array'
      }
    },
    resetPropFieldsStates (nestedValue) {
      let value = nestedValue ? nestedValue : this.modelValue
      for (let [i, field] of value.entries()) {
        field._editing = false
        if (field.type === '$object') {
          this.resetPropFieldsStates(field.value)
        } else if (field.type === '$array') {

        } else {
          if (!field._initialized && (!isValidPropName(field.name) || !isValidCodePrimitiveValue(field.userValue))) {
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
.vsc-prop-field-array
  color: #444

  .vsc-prop-kv-wrapper,
  .vsc-prop-kname-wrapper
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

  .vsc-prop-actions, .vsc-prop-array-actions, .vsc-prop-row-actions
    display: none
    padding-left: 10px
    align-items: center
    font-size: 14px

    .vsc-prop-action
      width: 21px
      height: 21px
      flex: 0 0 21px
      display: flex
      align-items: center
      justify-content: center
      color: #777
      cursor: pointer

      &:hover
        color: #333

      &.convert2object,
      &.convert2array
        font-family: 'Source Code Pro', monospace
        font-size: 12px
        font-weight: 700

        span
          position: relative
          top: -1px

  .vsc-prop-array-blank
    padding: 1px 0 1px 15px
    font-size: 14px
    font-style: italic
    color: #999

  // Nested objects-specific content (via CSS class)
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
      background: #bbb
      width: 1px

  // Nested objects
  &.parent-array
    &.open > .vsc-prop-kname-box > .vsc-prop-kname-wrapper > .vsc-prop-array-kname-icn,
    .vsc-prop-kname-box.open > .vsc-prop-kname-wrapper > .vsc-prop-array-kname-icn
      transform: rotate(90deg)

    .vsc-prop-kname-box
      position: relative
      display: flex
      align-items: center
      min-height: 22px
      padding-bottom: 1px
      color: #444
      cursor: pointer

      &:hover .vsc-prop-object-actions
        display: flex

      .vsc-prop-kname-wrapper
        display: flex
        align-items: center

        &.opening-disabled .vsc-prop-array-kname-icn
          color: #aaa

        .vsc-prop-array-kname-icn
          position: absolute
          left: 4px
          top: 6px
        .vsc-prop-object-kname
          display: flex
          padding-left: 15px
          font-size: 14px
        .prop-type
          color: #909090
          font-size: 14px
          font-weight: 700
        .prop-type-icn
          position: relative
          top: 1px
          padding-left: 4px
          font-size: 12px
          color: #909090
          font-weight: 500
          letter-spacing: 0.5px

  .vsc-prop-subarray
    &.open > .vsc-prop-kname-box > .vsc-prop-kname-wrapper > .vsc-prop-array-kname-icn
      transform: rotate(90deg)

    .vsc-prop-kname-box
      position: relative
      display: flex
      align-items: center
      min-height: 22px
      padding-bottom: 1px
      color: #444
      cursor: pointer

      &:hover .vsc-prop-array-actions
        display: flex

      .vsc-prop-kname-wrapper
        display: flex

        &.opening-disabled .vsc-prop-array-kname-icn
          color: #aaa

        .vsc-prop-array-kname-icn
          position: absolute
          left: 4px
          top: 6px
        .vsc-prop-array-kname
          display: flex
          padding-left: 15px
          font-size: 14px
        .vsc-prop-array-icn
          position: relative
          top: 1px
          padding-left: 16px
          font-size: 12px
          color: #909090
          font-weight: 500
          letter-spacing: 0.5px

        .prop-type
          color: #909090
          font-size: 14px
          font-weight: 700

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

    .vsc-prop-name
      display: inline-flex
      align-items: baseline
      margin: 0 5px 0 0
      font-size: 14px

    .vsc-prop-value
      flex: 1 1 auto
      display: flex
      position: relative
      font-size: 14px

      .input-value
        width: auto

  .vsc-prop-kname-box
    &:hover > .vsc-prop-actions
      display: flex

  .vsc-prop-row-actions
    display: flex
    margin-left: 15px
    padding-left: 0
    padding-top: 4px

    &:hover .vsc-prop-action,
    &:hover .vsc-prop-action:not(.add-primitive)
      display: block

    .vsc-prop-action
      flex: 0 0 auto
      color: #777
      cursor: pointer
      text-align: center

      &:not(.add-primitive)
        display: none
        width: auto
        padding: 0 4px

      &:hover
        color: #333

</style>
