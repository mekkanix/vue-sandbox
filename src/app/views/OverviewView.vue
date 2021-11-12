<template>
  <div class="vs-view overview">
    <div class="user-components">
      <b-list-group>
        <b-list-group-item
          v-for="(component, i) in formattedComponents"
          :key="i"
          :to="component.targetRoute"
        >
          {{ component.filepath }}
          ({{ component.name }})
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
        filepath: c.filepath,
        name: c.component.name,
        targetRoute: {
          name: 'component',
          params: { name: formatComponentPath(c.filepath) },
        }
      }))
    },
  }
}
</script>

<style lang="sass" scoped>
.user-components
  padding: 30px 0 0
  max-width: 500px
  margin: 0 auto
</style>
