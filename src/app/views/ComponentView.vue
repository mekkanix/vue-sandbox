<template>
  <div>
    Component...
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ComponentView',

  computed: {
    ...mapGetters({
      userComponents: 'user_components/userComponents',
    }),
  },

  created () {
    console.log(this.userComponents)
    console.log(this.$route.params.name)
  },
}
</script>
