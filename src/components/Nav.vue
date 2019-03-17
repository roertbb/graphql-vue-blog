<template>
  <header>
    <nav>
      <h3>Graph-Vue-Blog</h3>

      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>

    <nav>
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <router-link v-if="!loggedIn" to="/register">Register</router-link>

      <router-link v-if="loggedIn" to="/create-post">Create Post</router-link>
      <a @click.prevent="logout" v-if="loggedIn" href="/">Logout</a>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: undefined,
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) this.loggedIn = true;
    else this.loggedIn = false;
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="scss">
header {
  padding: $spacing;
  background-color: $accent;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $white;

  h3 {
    margin: 0 $spacing * 2 0 0;
    display: inline-block;
  }

  nav a {
    color: inherit;
    text-decoration: none;
    margin-right: $spacing/2;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
