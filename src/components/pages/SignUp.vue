<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
            <v-col cols="12" lg="4" sm="8">
                <p class="text-h5 mb-4">Sign up and start learning</p>
                <v-alert
                    v-show="alertError.length"
                    type="error"
                    class="mb-3"
                    variant="tonal"
                >
                    <template #text>
                        <div v-html="alertError"></div>
                    </template>
                </v-alert>
                <v-form @submit.prevent="onSubmit" v-model="isValid">
                    <v-text-field
                        v-model="firstname"
                        label="First name"
                        :rules="validation_rules.required"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        v-model="lastname"
                        label="Last name"
                        :rules="validation_rules.required"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        type="email"
                        v-model="email"
                        label="Email"
                        :rules="validation_rules.email"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="validation_rules.password"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        :loading="loading"
                        block
                        color="primary"
                        class="mt-5"
                        >Sign up</v-btn
                    >
                </v-form>
                <v-divider class="my-3" :thickness="2"></v-divider>
                <div class="text-center">
                    Already have an account?
                    <router-link :to="{ name: 'login' }">Log in</router-link>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    inject: ['validation_rules'],
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            loading: false,
            alertError: '',
            isValid: false,
        };
    },
    methods: {
        async onSubmit() {
            if (!this.isValid) return;

            this.loading = true;
            let { firstname, lastname, email, password } = this;

            this.$store
                .dispatch('userModule/signupWithEmailAndPW', {
                    firstname,
                    lastname,
                    email,
                    password,
                })
                .catch((e) => {
                    this.alertError = e;
                })
                .finally(() => (this.loading = false));
        },
    },
};
</script>
