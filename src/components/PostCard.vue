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
  background-image: url("https://images.unsplash.com/photo-1503252947848-7338d3f92f31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80");
  background-size: cover;
  background-position: center center;
  color: $white;
  height: 250px;
  flex-basis: calc(50% - #{$spacing});
  margin: $spacing / 2;
  padding: $spacing;
  border-radius: $spacing;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
