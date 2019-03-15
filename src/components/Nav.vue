<template>
  <header>
    <nav>
      <a href="/">
        <h3>Blog</h3>
      </a>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>

    <nav>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
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
