<template>
  <div class="flex-container">
    <form @submit.prevent="createPost" :key="loading">
      <h1>Create Post</h1>
      <Input label="title" type="text" placeholder="enter title" v-model="title"/>
      <Input label="content" type="text" placeholder="enter content" textArea v-model="content"/>
      <Input label="cover" type="text" placeholder="enter cover image URL" v-model="cover"/>
      <Button type="submit" :disabled="loading" loading-message="Creating Post...">Create Post</Button>
      <p class="success-message" v-if="message">{{message}}</p>
      <p class="error-message" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import CREATE_POST from '@/graphql/createPost.graphql';

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      title: '',
      cover: '',
      content: '',
      message: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async createPost() {
      this.error = null;
      this.message = '';
      this.loading = true;

      if (this.title === '' || this.content === '' || this.cover === '') {
        this.error = 'Please fill out Post fields';
        this.loading = false;
        return;
      }

      const resp = await this.$apollo.mutate({
        mutation: CREATE_POST,
        variables: {
          title: this.title,
          content: this.content,
          cover: this.cover,
          authorId: localStorage.getItem('id'),
        },
      });

      if (resp.data.createPost.id) {
        this.title = '';
        this.content = '';
        this.cover = '';
        this.message = 'Successfully created Post!';
      }

      this.loading = false;
    },
  },
};
</script>

<style>
</style>
