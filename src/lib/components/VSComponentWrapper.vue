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
            <div class="vsc-prop-name-wrapper">
              <div class="vsc-prop-name">
                {{ prop.name }}
                <span class="vsc-prop-type">({{ prop.nativeType }})</span>
              </div>
            </div>
            <div class="vsc-prop-input">
              <VSComplexProp
                v-if="['$object', '$array'].includes(prop.type)"
                v-model="prop.value"
              />
              <b-form-input
                v-else
                :type="prop.type"
                v-model="prop.value"
                size="sm"
                class="form-control"
              />
            </div>
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
      <div class="vs-component-viewport">
        <div class="vs-component-viewport-render" v-html="componentHTMLOutput" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { DateTime } from 'luxon'
import { formatFromNativeType, formatFromNativeToNativeStrType, } from '@app/helpers/Formatter.js'
import { isOfPrimitiveType, } from '@app/helpers/Type.js'
import VSComplexProp from '@lib/components/VSComplexProp.vue'
import VSPropObjectField from '@lib/components/VSPropObjectField.vue'
import VSPropArrayField from '@lib/components/VSPropArrayField.vue'

/**
 * VSComponentWrapper
 * 
 * Root component for single-component live-testing.
 * It contains a component rendering area alongside a management panel
 * allowing live props' update through dedicated inputs.
 */

export default {
  name: 'VSComponentWrapper',
  components: {
    VSComplexProp,
    VSPropObjectField,
    VSPropArrayField,
  },

  props: {
    /**
     * VueSandbox-formatted component.
     * This object contains a compiled Vue component and some related meta informations.
     * 
     * Its format must follow the rules below:
     * @property component {object} [required] - Vue-compiled component.
     * @property filepath {object} [optional] - Component relative file path.
     */
    vsComponent: {
      type: Object,
      required: true,
      validator: vsComp => (vsComp.component && typeof vsComp.component === 'object'),
    },
  },

  data: () => ({
    /**
     * List of parsed component's props.
     * Used to generate live-testing form.
     * 
     * @type {array}
     */
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
    /**
     * Reducer property used to get component-compliant formatted props
     * (e.g. `propsData`) from `localFieldsProps`.
     * 
     * @type {object}
     */
    instanceFormattedProps () {
      return this.localFieldsProps.reduce((props, currentProp) => ({
        ...props,
        [currentProp.name]: currentProp.value,
      }), {})
    },
    /**
     * List of component general informations retrieved from component.
     * 
     * @type {array}
     */
    componentMetaInfos () {
      const c = this.vsComponent
      let infos = [
        { label: 'Component name', value: c.component.name || '-', },
      ]
      if (c.filepath) {
        infos.push({ label: 'Relative filepath', value: c.filepath, })
      }
      return infos
    },
    /**
     * Component computed rendering (HTML).
     * Instance-formatted props are injected to the component (from `localFieldsProps`)
     * before rendering.
     * 
     * @type {string<HTML>}
     */
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
          const fieldNativeType = value.type || value
          fmtProps.push({
            name: key,
            type: formatFromNativeType(fieldNativeType),
            nativeType: formatFromNativeToNativeStrType(fieldNativeType),
            value: this.parsePropValue(value),
          })
        }
      }
      return fmtProps
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
          return {}
        case '$array':
          return []
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
  },

  created () {
    this.localFieldsProps = this.getFieldsFormattedProps()
  },
}
</script>

<style lang="sass">
@import 'bootstrap/dist/css/bootstrap.css'
@import 'bootstrap-vue/dist/bootstrap-vue.css'
@import 'bootstrap-vue/dist/bootstrap-vue-icons.css'

// BS Overriding
.form-control:hover,
.form-control:focus
  box-shadow: none
.form-control:hover,
.form-control:focus
  border-color: #6697de

.form-control.xs
  min-height: calc(1em + 0.15rem + 1px)
  padding: 0.10rem 0.25rem
  font-size: 0.750rem
  border-radius: 0.18rem
</style>

<style lang="sass" scoped>
.vs-component-wrapper
  display: flex

  .vs-component-infos
    flex: 0 0 50%
    padding: 10px
    background: #eee
    border-right: 1px solid #bbb
    overflow: auto

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
          display: flex
          align-items: stretch
          width: 100%
          background: white
          border-bottom: 1px solid #bbb

          .vsc-prop-name-wrapper
            flex: 1 0 25%
            border-right: 1px solid #ddd

            .vsc-prop-name
              display: flex
              align-items: center
              justify-content: right
              height: 50px
              padding: 0 8px
              text-align: right
              font-size: 16px
              font-weight: 700

              .vsc-prop-type
                padding-left: 5px
                color: #b0b0b0
                font-style: italic
                font-weight: 400

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
    width: 100%

    .vs-component-viewport
      min-height: 30px
      height: 100%
      padding: 10px
      background: #eee
      overflow: auto

      .vs-component-viewport-render
        background: white
        border: 1px solid #bbb
</style>
