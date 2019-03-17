<template>
  <div class="flex-container">
    <form @submit.prevent="createPost" :key="loading">
      <h1>Create Post</h1>
      <Input label="title" type="text" placeholder="enter title" v-model="title"/>
      <Input label="content" type="text" placeholder="enter content" textArea v-model="content"/>
      <Button type="submit" :disabled="loading" loading-message="Creating Post...">Create Post</Button>
      <p class="success-message" v-if="message">{{message}}</p>
      <p class="error-message" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';
import Button from '../components/Button.vue';
import gql from 'graphql-tag';

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      title: '',
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

      if (this.title === '' || this.content === '') {
        this.error = 'Please fill out Post fields';
        this.loading = false;
        return;
      }

      const resp = await this.$apollo.mutate({
        mutation: gql`
          mutation($title: String!, $content: String!, $authorId: ID!) {
            createPost(title: $title, content: $content, authorId: $authorId) {
              id
            }
          }
        `,
        variables: {
          title: this.title,
          content: this.content,
          authorId: localStorage.getItem('id'),
        },
      });

      if (resp.data.createPost.id) {
        this.title = '';
        this.content = '';
        this.message = 'Successfully created Post!';
      }

      this.loading = false;
    },
  },
};
</script>

<style>
</style>
