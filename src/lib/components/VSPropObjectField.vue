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
          @field-edit="onEditPropClick"
        />
      </div>
      <template v-else-if="field.type === '$array'">

      </template>
      <template v-else>
        <div class="vsc-prop-primitive" :class="{ idle: !field._editing, updating: field._editing, }">
          <template v-if="!field._editing">
            <div class="vsc-prop-name">
              <div class="vsc-prop-name-wrapper">
                <div class="vsc-prop-name-label">{{ field.name }}</div>
              </div>
              <div class="vsc-prop-colon">:</div>
            </div>
            <div class="vsc-prop-value">
              <VSPrimitiveValue
                :value="field.value"
                :type="field.type"
              />
            </div>
            <div class="vsc-prop-actions">
              <div class="vsc-prop-action edit" @click="onEditPropClick(field)">
                <b-icon-pencil-fill :scale="0.7" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="vsc-prop-name">
              <div class="vsc-prop-name-wrapper">
                <b-form-input
                  type="text"
                  v-model="field.name"
                  ref="inputKeyName"
                  size="sm"
                  class="vsc-prop-input input-name xs"
                  :style="keyNameInputStyles"
                  placeholder="Name"
                />
                <div class="vsc-prop-v-input v-input-name" ref="vInputKeyName">{{ field.name }}</div>
              </div>
              <div class="vsc-prop-colon">:</div>
            </div>
            <div class="vsc-prop-value">
              <b-form-input
                type="text"
                v-model="field.userValue"
                ref="inputKeyValue"
                size="sm"
                class="vsc-prop-input input-value xs"
                :class="{ 'errored': field._initialized && field._error }"
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
    initializingField: false,
    vKeyNameInputWidth: 0,
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
  },

  watch: {
    modelValue: {
      handler (value) {
        this.handleLocalFieldUpdate(value)
        this.$emit('input', value)
      },
      deep: true,
    },
  },

  methods: {
    handleLocalFieldUpdate (localValue) {
      this.$nextTick(() => {
        this.handleDOMUpdates()
      })
    },
    handleDOMUpdates () {
      const $inputKeyName = this.$refs.inputKeyName && this.$refs.inputKeyName.length ? this.$refs.inputKeyName[0].$el : null
      const $vInputKeyName = this.$refs.vInputKeyName && this.$refs.vInputKeyName.length ? this.$refs.vInputKeyName[0] : null
      if ($inputKeyName && $vInputKeyName) {
        this.vKeyNameInputWidth = $vInputKeyName.offsetWidth
      }
    },
    onEditPropClick (field) {
      this.resetPropFieldsStates()
      this.$emit('field-edit', field)
      field._editing = true
    },
    onKeyNameClick (field) {
      field.open = !field.open
    },
    onAddObjectFieldClick () {
      if (!this.initializingField) {
        this.resetPropFieldsStates()
        this.modelValue.push({
          _initialized: false,
          _editing: true,
          type: null,
          name: null,
          value: null,
          rawValue: null,
          userValue: ''
        })
        this.initializingField = true
      }
    },
    resetPropFieldsStates (nestedValue) {
      let value = nestedValue ?? this.modelValue
      for (let field of value) {
        if (field.type === '$object') {
          this.resetPropFieldsStates(field.value)
        } else if (field.type === '$array') {

        } else {
          field._editing = false
        }
      }
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
    .vsc-prop-input
      padding: 0
      font-size: 14px
    
    .vsc-prop-v-input
      position: absolute
      height: 100%
      min-width: 50px
      padding: 0
      font-size: 14px
      border: 1px solid transparent

    // - Specific input-related content
    .vsc-prop-name
      display: inline-flex
      align-items: baseline
      margin: 0 5px 0 0
      font-size: 14px

      .vsc-prop-name-wrapper
        position: relative
        
        .input-name
          width: 50px
        .v-input-name
          top: 0
          pointer-events: none
          visibility: hidden

    .vsc-prop-value
      font-size: 14px

      .input-value
        &.errored
          border-color: #dd0000

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
