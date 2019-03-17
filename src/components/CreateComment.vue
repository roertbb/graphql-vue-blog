<template>
  <div>
    <form @submit.prevent="addComment">
      <Input type="text" placeholder="enter comment" v-model="comment"/>
      <Button
        type="submit"
        :disabled="$apollo.loading"
        loading-message="Creating Comment..."
      >Create Comment</Button>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import GET_POST from '@/graphql/getPost.graphql';
import CREATE_COMMENT from '@/graphql/createComment.graphql';

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      comment: '',
      postId: null,
    };
  },
  mounted() {
    const path = this.$route.path.split('/');
    this.postId = path[path.length - 1];
  },
  methods: {
    async addComment() {
      await this.$apollo.mutate({
        mutation: CREATE_COMMENT,
        variables: {
          authorId: localStorage.getItem('id'),
          postId: this.postId,
          content: this.comment,
        },
        update: async (store, { data }) => {
          const resp = await store.readQuery({
            query: GET_POST,
            variables: { postId: this.postId },
          });
          resp.post.comments = [data.createComment, ...resp.post.comments];
          await store.writeQuery({
            query: GET_POST,
            variables: { postId: this.postId },
            data: {
              post: resp.post,
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="scss">
</style>
