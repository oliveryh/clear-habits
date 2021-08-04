<template>
  <q-page padding>
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="form" v-model="valid" :lazy-validation="true">
          <q-input
            v-model="email"
            label="Your email address *"
            hint="Email Address"
            lazy-rules
            :rules="emailRules"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-email" />
            </template>
          </q-input>
          <q-input
            v-model="password"
            label="Your password *"
            hint="Password (>6 characters long)"
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="passwordRules"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="onSubmit" color="primary">Login</q-btn>
      </q-card-actions>
    </q-card>
    <br />
    <p>
      If you don't yet have an account, please
      <router-link to="/register" tag="a" active-class="active" exact
        >Register</router-link
      >
    </p>
  </q-page>
</template>


<script>
import gql from 'graphql-tag'
import { onLogin } from '@/vue-apollo'

export default {
  name: 'Login',
  data: () => ({
    isPwd: true,
    valid: true,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v && v.length >= 6) || 'Password must be at last 6 characters long',
    ],
  }),

  methods: {
    onSubmit() {
      this.$refs.form.validate().then((validated) => {
        if (validated) {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation ($email: String!, $password: String!) {
                  signIn(input: { email: $email, password: $password }) {
                    jwtToken
                  }
                }
              `,
              variables: {
                email: this.email,
                password: this.password,
              },
              update: async (
                store,
                {
                  data: {
                    signIn: { jwtToken },
                  },
                },
              ) => {
                this.result = jwtToken
                await onLogin(jwtToken)
              },
            })
            .then(() => this.$router.push({ name: 'home' }))
            .catch((error) => {
              this.showErrors(error)
            })
        }
      })
    },
  },
}
</script>