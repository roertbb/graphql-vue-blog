<template>
  <router-link
    :to="`/post/${post.id}`"
    class="box"
    :style="{ backgroundImage: `url(${post.cover})` }"
  >
    <h2>{{post.title}}</h2>
    <p>{{post.author.nick}} | {{this.created}}</p>
  </router-link>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  computed: {
    created() {
      const date = new Date(this.post.createdAt);
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss">
.box {
  @extend .post-heading;
  height: 250px;
  flex-basis: calc(50% - #{$spacing});
  margin: $spacing / 2;
  padding: $spacing;
  text-decoration: none;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  h2 {
    margin: $spacing/2 0;
  }

  p {
    margin: 0;
  }
}
</style>
