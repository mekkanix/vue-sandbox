<template>
  <div class="vs-component-wrapper">
    <div class="vs-component-infos">
      <!-- Informations -->
      <div class="vsc-section vsc-meta">
        <div class="vsc-section-title">Informations</div>
        <div class="vsc-section-frame">
          <div class="vsc-meta-panel">
            <ul>
              <li
                v-for="(info, i) in componentMetaInfos"
                :key="i"
              >
                <span class="vsc-meta-label">{{ info.label }}</span>
                <span class="vsc-meta-value">{{ info.value }}</span>
              </li>
            </ul>
          </div>
          <div class="vsc-meta-panel">
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Props -->
      <div class="vsc-section vsc-props">
        <div class="vsc-section-title">Props</div>
        <template v-if="localFieldsProps.length">
          <div
            v-for="(prop, i) in localFieldsProps"
            :key="i"
            class="vsc-prop-field"
          >
            <label>
              <div class="vsc-prop-name">{{ prop.name }}</div>
              <div class="vsc-prop-input">
                <VSPropObjectField
                  v-if="prop.type === '$object'"
                  v-model="prop.value"
                />
                <VSPropArrayField
                  v-else-if="prop.type === '$array'"
                  v-model="prop.value"
                />
                <template v-else>
                  <b-form-input
                    :type="prop.type"
                    v-model="prop.value"
                    size="sm"
                    class="form-control"
                  />
                </template>
              </div>
            </label>
          </div>
        </template>
        <template v-else>
          <div class="vsc-section-nodata">
            No props defined for this component.
          </div>
        </template>
      </div>
    </div>

    <div class="vs-component-viewport-container">
      <div class="vs-component-viewport" v-html="componentHTMLOutput" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { DateTime } from 'luxon'
import { formatFromNativeType, formatFromStrType, } from '@app/helpers/Formatter.js'
import { isOfPrimitiveType, } from '@app/helpers/Type.js'
import VSPropObjectField from '@lib/components/VSPropObjectField.vue'
import VSPropArrayField from '@lib/components/VSPropArrayField.vue'

export default {
  name: 'VSComponentWrapper',
  components: {
    VSPropObjectField,
    VSPropArrayField,
  },

  props: {
    vsComponent: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    localFieldsProps: [],
  }),

  watch: {
    component: {
      handler () {
        this.localFieldsProps = this.getFieldsFormattedProps()
      },
      deep: true,
    }
  },

  computed: {
    instanceFormattedProps () {
      return this.localFieldsProps.reduce((props, currentProp) => ({
        ...props,
        [currentProp.name]: this.formatPropValueFromStrType(currentProp.type, currentProp.value),
      }), {})
    },
    componentMetaInfos () {
      const c = this.vsComponent
      return [
        { label: 'Component name', value: c.component.name, },
        { label: 'Filepath', value: c.filepath, },
      ]
    },
    componentHTMLOutput () {
      let instanceConfig = {}
      if (this.localFieldsProps.length) {
        instanceConfig.propsData = this.instanceFormattedProps
      }
      const componentInstance = new Vue(Object.assign(instanceConfig, this.vsComponent.component))
      return componentInstance.$mount().$el.outerHTML
    },
  },

  methods: {
    getFieldsFormattedProps () {
      let fmtProps = []
      if (this.vsComponent.component.props) {
        for (const [key, value] of Object.entries(this.vsComponent.component.props)) {
          fmtProps.push({
            name: key,
            type: value.type ? this.parseFieldTypeFromPropType(value.type) : this.parseFieldTypeFromPropType(value),
            value: this.parsePropValue(value),
          })
        }
      }
      return fmtProps
    },
    formatPropValueFromStrType (type, value) {
      switch (type) {
        case 'text':
          return value
        case 'number':
          return parseFloat(value)
        case 'date':
          return new Date() // Parse real prop value
        case '$object':
          return {} // Parse real prop value
        case '$array':
          return [] // Parse real prop value
      }
    },
    getDefaultPropValue (type) {
      switch (formatFromNativeType(type)) {
        case 'text':
          return ''
        case 'number':
          return 0
        case 'date':
          return DateTime.now().toString()
        case '$object':
          return {
            field1: 1,
            field2: 'This is a sentence.',
            field3: true,
            group1: {
              nestedField1: 4,
              nestedField2: 5,
              nestedGroup1: {
                nestedNestedField1: 6
              }
            },
            field4: 7,
            group2: {
              nested2Field1: 4,
              nested2Field2: 5,
            },
          }
        case '$array':
          return ['toto', 'tata', 'titi']
      }
    },
    parsePropValue (value) {
      if (isOfPrimitiveType(value)) {
        return this.getDefaultPropValue(value)
      } else {
        if (value.default) {
          return typeof value.default === 'function' ? value.default() : value.default
        } else if (value.type) {
          return this.getDefaultPropValue(value.type)
        }
      }
    },
    parseFieldTypeFromPropType (type) {
      return formatFromNativeType(type)
    },
    onPropObjectValueUpdate (value) {
      // console.log(value);
    },
    onPropArrayValueUpdate (value) {
      // console.log(value);
    },
  },

  created () {
    this.localFieldsProps = this.getFieldsFormattedProps()
  },
}
</script>

<style lang="sass" scoped>
.vs-component-wrapper
  display: flex

  .vs-component-infos
    flex: 0 0 50%
    padding: 10px
    background: #eee
    border-right: 1px solid #bbb

    .vsc-section-title
      margin: 0 0 4px
      font-size: 20px
      font-weight: 700
      color: white
      text-align: center

    .vsc-section
      margin-bottom: 10px
      padding: 5px 10px 10px
      background: rgba(0,0,0,0.5)
      border-radius: 5px

      &:last-child
        margin-bottom: 0

      .vsc-section-frame
        background: #ddd

      .vsc-section-nodata
        padding: 6px
        color: #bbb
        text-align: center

      &.vsc-props
        .vsc-prop-field
          background: white
          border-bottom: 1px solid #bbb

          label
            display: flex
            align-items: stretch
            width: 100%

            .vsc-prop-name
              flex: 1 0 25%
              display: flex
              align-items: center
              justify-content: right
              padding: 0 8px
              text-align: right
              font-weight: 700
              border-right: 1px solid #ddd

            .vsc-prop-input
              flex: 0 1 75%
              padding: 8px 8px

      &.vsc-meta
        .vsc-section-frame
          display: flex
          font-size: 14px

          .vsc-meta-panel
            padding: 6px 10px
            flex: 0 0 50%

            &:first-child
              border-right: 1px solid #777

            ul
              margin: 0
              padding: 0

              li
                list-style-type: none
                display: flex
                justify-content: space-between
                padding: 2px 0

          .vsc-meta-label
            color: #333
            font-weight: 700

  .vs-component-viewport-container
    padding: 10px
    width: 100%
    background: #eee

    .vs-component-viewport
      min-height: 30px
      background: white
      border: 1px solid #bbb
</style>
