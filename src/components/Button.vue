<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 0;
  background-color: $accent;
  padding: $spacing;
  color: $white;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  font-size: 1.25rem;
}
</style>
