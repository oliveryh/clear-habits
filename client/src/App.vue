<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
      dark
    >
    <v-toolbar-title>Clear Habits</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
