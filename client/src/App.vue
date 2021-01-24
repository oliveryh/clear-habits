<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="mdi-sticker-check-outline"></q-icon>&nbsp;Clear Habits
        </q-toolbar-title>
        <q-btn-group class="q-pr-sm" outline rounded>
          <q-btn
            padding="sm"
            outline
            icon="mdi-home"
            to="/"
            exact
            class="q-pl-sm"
            ><q-tooltip>Home</q-tooltip></q-btn
          >
          <q-btn
            padding="sm"
            outline
            icon="mdi-book-variant"
            to="/planner"
            exact
            ><q-tooltip>Planner</q-tooltip></q-btn
          >
          <q-btn padding="sm" outline icon="mdi-chart-bar" to="/stats" exact
            ><q-tooltip>Stats</q-tooltip></q-btn
          >
          <q-btn
            padding="sm"
            outline
            icon="mdi-cog"
            to="/settings"
            exact
            class="q-pr-sm"
            ><q-tooltip>Settings</q-tooltip></q-btn
          >
        </q-btn-group>
        <q-btn
          v-if="username"
          outline
          :label="username"
          rounded
          icon="mdi-account"
        >
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
