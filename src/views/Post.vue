<template>
  <div class="fullheight">
    <main class="flex-container" v-if="$apollo.loading">
      <div class="spinner"></div>
    </main>
    <main v-else-if="post">
      <div class="title" :style="{ backgroundImage: `url(${post.cover})` }">
        <h1>{{post.title}}</h1>
        <p>{{post.author.nick}} | {{this.created}}</p>
      </div>
      <div class="content">
        <p>{{post.content}}</p>
      </div>
      <h2>Comments</h2>
      <Comment v-for="comment in post.comments" :key="comment.id" :comment="comment"></Comment>
      <div v-if="loggedIn">
        <h2>Create Comment</h2>
        <CreateComment></CreateComment>
      </div>
    </main>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue';
import CreateComment from '@/components/CreateComment.vue';
import GET_POST from '@/graphql/getPost.graphql';
import NEW_COMMENT_SUB from '@/graphql/newCommentSubscription.graphql';

export default {
  components: {
    Comment,
    CreateComment,
  },
  data() {
    return {
      postId: null,
      post: null,
      loggedIn: localStorage.getItem('token'),
    };
  },
  computed: {
    created() {
      const date = new Date(this.post.createdAt);
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
  },
  mounted() {
    const path = this.$route.path.split('/');
    this.postId = path[path.length - 1];
  },
  apollo: {
    post: {
      query: GET_POST,
      variables() {
        return { postId: this.postId };
      },
      skip() {
        return !this.postId;
      },
      subscribeToMore: {
        document: NEW_COMMENT_SUB,
        variables() {
          return {
            id: this.postId,
          };
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          if (
            subscriptionData.data.Comment.node.author.id
            === localStorage.getItem('id')
          ) {
            return previousResult;
          }

          previousResult.post.comments = [
            subscriptionData.data.Comment.node,
            ...previousResult.post.comments,
          ];

          return previousResult;
        },
      },
    },
  },
};
</script>

<style lang="scss">
.title {
  @extend .post-heading;
  width: 100%;
  height: 400px;
  padding: $spacing * 2;

  h2 {
    margin: $spacing/2 0;
  }

  p {
    margin: 0;
  }
}
.content {
  padding: $spacing/2;
  font-size: 1.25rem;
  text-align: justify;
}
</style>
