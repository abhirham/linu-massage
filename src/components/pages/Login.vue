<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
            <v-col cols="12" lg="4" sm="8">
                <p class="text-h5 mb-4">
                    Log in to Healing Touch Spa & Wellness Centre
                </p>
                <v-form @submit.prevent="onSubmit" v-model="isValid">
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
                        >Log in</v-btn
                    >
                </v-form>
                <div class="text-center mt-3">
                    Forgot your password?
                    <router-link
                        class="text-primary font-weight-black"
                        :to="{ name: 'forgot-pw' }"
                        >Click here</router-link
                    >
                </div>
                <v-divider class="my-3" :thickness="2"></v-divider>
                <div class="text-center">
                    Don't have an account?
                    <router-link
                        class="text-primary font-weight-black"
                        :to="{ name: 'signup' }"
                        >Sign up</router-link
                    >
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    inject: ['validation_rules'],
    data() {
        return { email: '', password: '', loading: false, isValid: false };
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('userModule/signinWithGoogle');
            if (!this.isValid) return;

            let { email, password } = this;

            this.loading = true;

            this.$store
                .dispatch('userModule/signInWithEmailAndPassword', {
                    email,
                    password,
                })
                .finally(() => (this.loading = false));
        },
    },
};
</script>
