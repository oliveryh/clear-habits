<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="mdi-sticker-check-outline"></q-icon>&nbsp;Clear Habits
        </q-toolbar-title>
        {{ username }}
        <q-btn v-if="username" flat round icon="mdi-account">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="logout">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-tabs>
        <q-route-tab icon="mdi-home" to="/" exact />
        <q-route-tab icon="mdi-chart-bar" to="/stats" exact />
      </q-tabs>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { A_AUTH_LOGOUT } from '@/store/actions.type'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      username: (state) => state.auth.user.username,
    }),
  },
  methods: {
    logout() {
      this.$store
        .dispatch(A_AUTH_LOGOUT)
        .then(() => this.$router.push({ name: 'login' }))
    },
  },
}
</script>
