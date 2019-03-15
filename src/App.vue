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

* {
  box-sizing: border-box;
}

html {
  font-family: "Raleway", sans-serif;
}

html,
body,
#app {
  height: calc(100% - 75px);
  margin: 0;
  padding: 0;
}
</style>
