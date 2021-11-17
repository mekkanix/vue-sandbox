<template>
  <div class="vs-component-wrapper">
    <div class="vs-component-infos">
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
    component: {
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
      const componentInstance = new Vue(Object.assign(instanceConfig, this.component))
      return componentInstance.$mount().$el.outerHTML
    },
  },

  methods: {
    getFmtPropsList () {
      let fmtProps = []
      if (this.component.props) {
        for (const [key, value] of Object.entries(this.component.props)) {
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
      color: white
      text-align: center

    .vsc-section
      padding: 5px 10px 10px
      background: rgba(0,0,0,0.5)

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

            .vsc-prop-input
              flex: 0 1 75%

  .vs-component-viewport-container
    padding: 10px
    width: 100%
    background: #eee

    .vs-component-viewport
      min-height: 30px
      background: white
      border: 1px solid #bbb
</style>
