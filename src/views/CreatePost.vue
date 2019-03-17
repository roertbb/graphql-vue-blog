<template>
  <div class="flex-container">
    <form @submit.prevent="createPost">
      <h1>Create Post</h1>
      <Input label="title" type="text" placeholder="enter title" v-model="title"/>
      <Input label="content" type="text" placeholder="enter content" textArea v-model="content"/>
      <Button type="submit">Create Post</Button>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';
import Button from '../components/Button.vue';

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
};
</script>

<style>
</style>
