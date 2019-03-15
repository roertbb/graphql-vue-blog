<template>
  <div>
    <label :for="label">{{label}}:</label>
    <input
      :type="type"
      :id="label"
      :placeholder="placeholder"
      v-model="content"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    type: String,
    placeholder: String,
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin: $spacing/2 0;
}

input {
  padding: $spacing;
  margin-bottom: $spacing;
  width: 100%;
  background-color: $input-bkg;
  border-radius: 8px;
  border: 0;
}
</style>
