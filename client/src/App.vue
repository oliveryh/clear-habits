<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
      dark
    >
    <v-toolbar-title><v-icon>mdi-sticker-check-outline</v-icon> Clear Habits</v-toolbar-title>
    <v-spacer></v-spacer>
    {{ username }}
    <div id="avatar">
      <v-menu
        bottom
        left
        v-if="username"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { A_AUTH_LOGOUT } from '@/store/actions.type'
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      username: state => state.auth.user.username
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(A_AUTH_LOGOUT)
        .then(() => this.$router.push({ name: 'login' }))
    }
  }
};
</script>
