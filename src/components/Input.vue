<template>
  <div>
    <label v-if="label" :for="label">{{label}}:</label>
    <input
      v-if="!textArea"
      :type="type"
      :id="label"
      :placeholder="placeholder"
      v-model="content"
      @input="handleInput"
    >
    <textarea
      rows="10"
      v-if="textArea"
      :type="type"
      :id="label"
      :placeholder="placeholder"
      v-model="content"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    type: String,
    placeholder: String,
    textArea: Boolean,
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

input,
textarea {
  padding: $spacing;
  margin-bottom: $spacing;
  width: 100%;
  background-color: $input-bkg;
  border-radius: 8px;
  border: 0;
  font-family: inherit;
  font-size: 1rem;
}
</style>
