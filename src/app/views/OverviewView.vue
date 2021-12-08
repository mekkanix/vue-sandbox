<template>
  <div class="vs-view overview">
    <div class="user-components">
      <h3>Components</h3>
      <b-list-group>
        <b-list-group-item
          v-for="(component, i) in formattedComponents"
          :key="i"
          :to="component.targetRoute"
        >
          <span v-html="component.filepath" />
          <span class="component-int-name">({{ component.name }})</span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatComponentPath, } from '@app/helpers/Formatter.js'

export default {
  name: 'OverviewView',

  computed: {
    ...mapGetters({
      userComponents: 'user_components/userComponents',
    }),
    formattedComponents () {
      return this.userComponents.map(c => ({
        filepath: this.stylizeComponentFilepath(c.filepath),
        name: c.component.name,
        targetRoute: {
          name: 'component',
          params: { name: formatComponentPath(c.filepath) },
        }
      }))
    },
  },

  methods: {
    stylizeComponentFilepath (filepath) {
      const path = filepath.substr(0, filepath.lastIndexOf('/') + 1)
      const filename = filepath.substr(filepath.lastIndexOf('/') + 1)
      return `${path}<span class="fw-bold">${filename}</span>`
    },
  },
}
</script>

<style lang="sass" scoped>
.user-components
  padding: 30px 0 0
  max-width: 1100px
  margin: 0 auto

  h3
    margin: 0 0 25px
    padding: 15px 0
    border-bottom: 1px solid #777
    font-size: 24px

  .component-int-name
    font-style: italic
    color: #909090
</style>
