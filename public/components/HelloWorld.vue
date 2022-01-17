<template>
  <div class="hello">
    <img src="/sitecontents/assets/toto.jpeg" />
    <img src="/sitecontents/assets/path/to/toto.jpeg" />
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'By editing this you can see the component in action!',
    }
  }
}
</script>

<style scoped>
.hello {
  text-align: center;
}
p {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
