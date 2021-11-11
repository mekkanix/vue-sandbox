<template>
  <div class="vs-main-toolbar">
    <b-navbar type="dark" variant="dark" fixed class="px-3">
      <b-navbar-brand
        :to="{ name: 'home' }"
        toggleable="sm"
      >
        Vue Sandbox
      </b-navbar-brand>
      <b-navbar-nav class="ms-auto">
        <b-nav-item :to="{ name: 'home' }">
          <b-icon-house></b-icon-house>
        </b-nav-item>
        <b-nav-item :to="{ name: 'collection' }">
          Collection
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'MainToolbar',
}
</script>

<style lang="sass" scoped>
// .vs-main-toolbar
</style>
