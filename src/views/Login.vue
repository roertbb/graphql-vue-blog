<template>
  <div class="flex-container">
    <form @submit.prevent="login">
      <h1>Login</h1>
      <Input label="email" type="text" placeholder="enter email" v-model="email"/>
      <Input label="password" type="password" placeholder="enter password" v-model="password"/>
      <Button type="submit" :disabled="loading" loading-message="Logging in...">Login</Button>
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
    async login() {
      try {
        this.loading = true;
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              authenticateUser(email: $email, password: $password) {
                id
                token
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password,
          },
        });
        this.loading = false;
        localStorage.setItem('token', result.data.authenticateUser.token);
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
