<template>
  <div class="comment">
    <p class="author">{{comment.author.nick}} | {{this.created}}</p>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
  computed: {
    created() {
      const date = new Date(this.comment.createdAt);
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss">
.comment {
  padding: $spacing/2;
  background-color: #ecf0f1;
  border-radius: $spacing;
  margin-bottom: $spacing/2;

  p {
    margin: $spacing/2;
  }

  .author {
    font-weight: bold;
  }
}
</style>
