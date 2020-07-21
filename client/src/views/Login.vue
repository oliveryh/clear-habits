<template>
    <div>
        <v-container
            class="fill-height"
            fluid
        >
            <v-row
            align="center"
            justify="center"
            >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card class="elevation-12">
                <v-toolbar
                    color="primary"
                    dark
                    flat
                >
                    <v-toolbar-title>Login
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        :lazy-validation="true"
                    >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            prepend-icon="mdi-at"
                            label="E-mail"
                            type="text"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            prepend-icon="mdi-lock"
                            type="password"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="onSubmit" color="primary">Login</v-btn>
                </v-card-actions>
                </v-card>
                <br />
                <p>If you don't yet have an account, please <router-link to="/register" tag="a" active-class="active" exact>Register</router-link></p>
            </v-col>
            </v-row>
            
        </v-container>
        
        <v-snackbar
            v-model="snackbar"
            color="error"
            v-if="errors"
        >
            <p style="margin: 0;" v-for="(v, k) in errors" :key="k">{{ k }} {{ v }}</p>
            <template v-slot:action="{ attrs }">
                <v-btn
                dark
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>



<script>
import { mapState } from "vuex";
import { A_AUTH_LOGIN } from '@/store/actions.type'

export default {
    name: 'Login',
    data: () => ({
        valid: true,
        snackbar: false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at last 6 characters long'
        ]
    }),

    computed: {
        ...mapState({
            errors: state => state.auth.errors
        })
    },

    watch: {
        errors() {
            if(Object.keys(this.errors).length){
                this.snackbar = true
            }
        }
    },

    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch(A_AUTH_LOGIN, {
                email: this.email,
                password: this.password,
                }).then(() => this.$router.push({ name: 'home' }))
            }
        },
    },
}
</script>