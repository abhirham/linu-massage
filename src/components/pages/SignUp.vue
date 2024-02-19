<template>
    <v-container fluid>
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
                <v-form @submit.prevent="onSubmit">
                    <v-text-field
                        v-model="firstname"
                        label="First name"
                        :rules="rules.required"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        v-model="lastname"
                        label="Last name"
                        :rules="rules.required"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        type="email"
                        v-model="email"
                        label="Email"
                        :rules="rules.email"
                        variant="outlined"
                        class="mb-2"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="rules.required"
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
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            loading: false,
            alertError: '',
            rules: {
                required: [
                    (val) => {
                        if (val) return true;

                        return 'This field cannot be empty.';
                    },
                ],
                email: [
                    (val) => {
                        if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val))
                            return true;

                        return 'Invalid email.';
                    },
                ],
            },
        };
    },
    methods: {
        onSubmit() {
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
