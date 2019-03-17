<template>
  <div class="flex-container">
    <form @submit.prevent="register">
      <h1>Register</h1>
      <Input label="email" type="text" placeholder="enter email" v-model="email"/>
      <Input label="nick" type="text" placeholder="enter nick" v-model="nick"/>
      <Input label="password" type="password" placeholder="enter password" v-model="password"/>
      <Button type="submit" :disabled="loading" loading-message="Registering...">Register</Button>
      <p class="error-message">{{parsedErrors}}</p>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

export default {
  data() {
    return {
      email: '',
      nick: '',
      password: '',
      loading: false,
      errors: [],
    };
  },
  components: {
    Input,
    Button,
  },
  computed: {
    parsedErrors() {
      return this.errors.length > 0
        ? this.errors.map(error => error.functionError).join(' ')
        : '';
    },
  },
  methods: {
    async register() {
      try {
        this.loading = true;
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation($email: String!, $nick: String!, $password: String!) {
              signupUser(email: $email, nick: $nick, password: $password) {
                id
                token
              }
            }
          `,
          variables: {
            email: this.email,
            nick: this.nick,
            password: this.password,
          },
        });
        this.loading = false;
        localStorage.setItem('id', result.data.signupUser.id);
        localStorage.setItem('token', result.data.signupUser.token);
        this.$router.push({ name: 'home' });
      } catch ({ graphQLErrors, networkError }) {
        this.loading = false;
        if (graphQLErrors) this.errors = [...graphQLErrors];
        if (networkError) this.errors = [...this.errors, ...networkError];
      }
    },
  },
};
</script>

<style>
</style>
