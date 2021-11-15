<template>
  <div class="hello">
    Hey, {{ name }}!
  </div>
</template>

<script>
export default {
  name: 'HelloToto',
  props: {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    firstDate: Date,
    offTestMsg: String,
  }
}
</script>
