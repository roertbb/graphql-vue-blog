import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/create-post',
      name: 'createPost',
      component: () => import(/* webpackChunkName: "register" */ './views/CreatePost.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import(/* webpackChunkName: "register" */ './views/Post.vue'),
    },
  ],
});
