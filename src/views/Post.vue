<template>
  <div class="fullheight">
    <main class="flex-container" v-if="$apollo.loading">
      <div class="spinner"></div>
    </main>
    <main v-if="post">
      <div class="title" :style="{ backgroundImage: `url(${post.cover})` }">
        <h1>{{post.title}}</h1>
        <p>{{post.author.nick}} | {{this.created}}</p>
      </div>
      <div class="content">
        <p>{{post.content}}</p>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      postId: null,
      post: null,
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
      query: gql`
        query($postId: ID!) {
          post: Post(id: $postId) {
            id
            title
            cover
            content
            createdAt
            author {
              id
              nick
            }
            comments {
              content
              createdAt
              author {
                id
                nick
              }
            }
          }
        }
      `,
      variables() {
        return { postId: this.postId };
      },
      skip() {
        return !this.postId;
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
