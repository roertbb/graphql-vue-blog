<template>
  <div class="fullheight">
    <main class="flex-container" v-if="$apollo.loading">
      <div class="spinner"></div>
    </main>
    <main v-else-if="posts">
      <h1 class="heading">Recent Posts</h1>
      <section class="posts-container">
        <PostCard v-for="post in posts" :key="post.id" :post="post"></PostCard>
      </section>
    </main>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue';
import GET_ALL_POSTS from '@/graphql/getAllPosts.graphql';
import NEW_POST_SUB from '@/graphql/newPostSubscription.graphql';

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
      query: GET_ALL_POSTS,
      subscribeToMore: {
        document: NEW_POST_SUB,
        updateQuery: (previousResult, { subscriptionData }) => ({
          posts: [subscriptionData.data.Post.node, ...previousResult.posts],
        }),
      },
    },
  },
};
</script>

<style lang="scss">
.posts-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
