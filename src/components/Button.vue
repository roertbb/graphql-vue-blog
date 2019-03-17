<template>
  <button :disabled="disabled">
    <template v-if="disabled">{{loadingMessage}}</template>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    disabled: Boolean,
    loadingMessage: String,
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

  &:disabled {
    background-color: $disabled;
  }
}
</style>
