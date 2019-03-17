<template>
  <main>
    <h1>Recent Posts</h1>
    <section class="posts-container">
      <PostCard v-for="post in posts" :key="post.id" :post="post"></PostCard>
    </section>
  </main>
</template>

<script>
import PostCard from '@/components/PostCard.vue';
import gql from 'graphql-tag';

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    PostCard,
  },
  apollo: {
    posts: {
      query: gql`
        query {
          posts: allPosts(orderBy: createdAt_DESC) {
            id
            title
            content
            cover
            createdAt
            author {
              id
              nick
            }
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            Post(filter: { mutation_in: [CREATED, UPDATED, DELETED] }) {
              node {
                id
                title
                content
                cover
                createdAt
                author {
                  id
                  nick
                }
              }
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => ({
          posts: [subscriptionData.data.Post.node, ...previousResult.posts],
        }),
      },
    },
  },
};
</script>

<style lang="scss">
main {
  width: 90%;
  max-width: 1000px;
  margin: auto;

  h1 {
    text-align: center;
  }
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
