<template>
  <div class="vs-component-wrapper">
    <div class="vs-component-infos">
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
      <div class="vsc-section vsc-props">
        <div class="vsc-section-title">Props</div>
        <template v-if="currentProps.length">
          <div
            v-for="(prop, i) in currentProps"
            :key="i"
            class="vsc-prop-field"
          >
            <label>
              <div class="vsc-prop-name">{{ prop.name }}</div>
              <div class="vsc-prop-input">
                <template v-if="!['object', 'array',].includes(prop.type)">
                  <input
                    :type="prop.type"
                    v-model="prop.value"
                    class="form-control"
                  >
                </template>
                <template v-else>
                  [Object/Array management]
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
import { formatFromNativeType, } from '@app/helpers/Formatter.js'

export default {
  name: 'VSComponentWrapper',

  props: {
    vsComponent: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    currentProps: [],
  }),

  watch: {
    component: {
      handler () {
        this.currentProps = this.getFmtPropsList()
      },
      deep: true,
    }
  },

  computed: {
    componentHTMLOutput () {
      let instanceConfig = {}
      if (this.currentProps.length) {
        instanceConfig.propsData = this.getInstanceFmtCurrentProps()
      }
      const componentInstance = new Vue(Object.assign(instanceConfig, this.vsComponent.component))
      return componentInstance.$mount().$el.outerHTML
    },
    componentMetaInfos () {
      const c = this.vsComponent
      return [
        { label: 'Component name', value: c.component.name, },
        { label: 'Filepath', value: c.filepath, },
      ]
    },
  },

  methods: {
    getFmtPropsList () {
      let fmtProps = []
      if (this.vsComponent.component.props) {
        for (const [key, value] of Object.entries(this.vsComponent.component.props)) {
          fmtProps.push({
            name: key,
            type: value.type ? formatFromNativeType(value.type) : formatFromNativeType(value),
            value: value.type ? value.type() : value(),
          })
        }
      }
      return fmtProps
    },
    getInstanceFmtCurrentProps () {
      let fmtProps = {}
      for (const prop of this.currentProps) {
        fmtProps[prop.name] = this.getInstanceFmtProp(prop.type, prop.value)
      }
      return fmtProps
    },
    getInstanceFmtProp (type, value) {
      switch (type) {
        case 'string':
          return value
        case 'number':
          return parseFloat(value)
        case 'date':
          return new Date()
        case 'object':
          return {}
        case 'array':
          return []
      }
    }
  },

  created () {
    this.currentProps = this.getFmtPropsList()
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
          padding: 10px
          border-bottom: 1px solid #ddd

          label
            display: flex
            align-items: center
            width: 100%

            .vsc-prop-name
              flex: 1 0 25%
              padding-right: 15px
              text-align: right
              font-weight: 700

            .vsc-prop-input
              flex: 0 1 75%

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
