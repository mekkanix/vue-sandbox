<template>
  <div class="vs-component-wrapper">
    <div class="vs-component-props">
      <b-list-group>
        <b-list-group-item
          v-for="(prop, i) in currentProps"
          :key="i"
        >
          <div class="vsc-prop-name">{{ prop.name }}</div>
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
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="vs-component-viewport" v-html="componentHTMLOutput" />
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

  .vs-component-props
    flex: 0 0 50%
</style>
