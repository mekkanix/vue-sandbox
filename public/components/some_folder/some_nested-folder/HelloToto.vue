<template>
  <div class="hello">
    Hey, {{ name }}!

    <h3>[user]</h3>
    <pre>
      {{ user }}
    </pre>

    <h3>[permissions]</h3>
    <pre>
      {{ permissions }}
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
    // firstDate: Date,
    // offTestMsg: String,
    // test: Object,
    // test2: Array,
  }
}
</script>
