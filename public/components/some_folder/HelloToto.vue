<template>
  <div class="hello">
    Hey, {{ name }}!

    <pre>
      {{ user }}
    </pre>
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
    permissions: {
      type: Array,
      required: true,
    },
    firstDate: Date,
    offTestMsg: String,
  }
}
</script>
