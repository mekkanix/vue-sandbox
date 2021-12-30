<template>
  <div>
    <h1>MyComp</h1>
    <MyChildComp />
  </div>
</template>

<script>
import MyChildComp from './MyChildComp.vue'

export default {
  name: 'MyComp',
  components: {
    MyChildComp,
  },
}
</script>
