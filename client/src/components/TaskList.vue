<template>
    <v-card>
        <v-card-title primary-title>
            Welcome
        </v-card-title>
        <v-card-text
            :username="username"
        >
            Hello there {{ username }} bro!
        </v-card-text>
    </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: 'TaskList',
    computed: {
        ...mapState({
            username: state => state.auth.user.username
        })
    }
}
</script>