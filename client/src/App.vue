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
        <q-route-tab icon="mdi-cog" to="/settings" exact />
      </q-tabs>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import gql from 'graphql-tag'
import JwtService from '@/common/jwt.service'

export default {
  name: 'App',
  apollo: {
    username: {
      query: gql`
        query me {
          me {
            username
          }
        }
      `,
      update: (data) => data.me.username,
    },
  },
  methods: {
    logout() {
      JwtService.destroyToken()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
