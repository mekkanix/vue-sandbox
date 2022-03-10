<template>
  <div class="vs-main-toolbar">
    <b-navbar type="dark" variant="dark" fixed class="px-3">
      <b-navbar-brand
        :to="{ name: 'home' }"
        toggleable="sm"
      >
        Vue<strong>S</strong>andbox
      </b-navbar-brand>
      <b-navbar-nav class="ms-auto">
        <b-button
          size="sm"
          :to="{ name: 'import' }"
        >
          Import...
        </b-button>
      </b-navbar-nav>
      <!-- <b-navbar-nav class="ms-auto">
        <b-form-select
          v-model="selectedComponent"
          :options="fmtComponentSelectOpts"
          size="sm"
          class="mt-3"
        ></b-form-select>
      </b-navbar-nav> -->
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'VSMainToolbar',

  props: {
    components: {
      type: Array,
      default: [],
    },
  },

  data: () => ({
    selectedComponent: null,
  }),

  computed: {
    // fmtComponentSelectOpts () {
    //   return this.components.map(component => ({
    //     value: component.name,
    //     text: component.name,
    //   }))
    // },
  },
}
</script>

<style lang="sass" scoped>
// .vs-main-toolbar
</style>
