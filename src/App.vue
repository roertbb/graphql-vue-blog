<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  components: {
    Nav,
  },
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
html {
  font-family: "Raleway", sans-serif;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
