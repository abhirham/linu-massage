<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <h1 class="text-center">User Profile</h1>
                <div class="text-center mb-5">
                    Add information about yourself.
                </div>
                <v-form v-model="isValid" @submit.prevent="onSubmit">
                    <v-text-field
                        v-model="firstname"
                        label="First name"
                        :rules="validation_rules.required"
                        variant="outlined"
                        class="mb-5"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        v-model="lastname"
                        label="Last name"
                        :rules="validation_rules.required"
                        variant="outlined"
                        class="mb-4"
                        hide-details="auto"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        :loading="loading"
                        block
                        color="primary"
                        >Save Details</v-btn
                    >
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { auth } from '@/libs/firebase';
import User from '@/models/User';

export default {
    inject: ['validation_rules'],
    data() {
        return { firstname: '', lastname: '', loading: false, isValid: false };
    },
    mounted() {
        let { firstname, lastname } = this.$store.state.userModule.user;
        this.firstname = firstname;
        this.lastname = lastname;
    },
    methods: {
        async onSubmit() {
            if (!this.isValid) return;

            let { uid, email } = auth.currentUser;

            let userObj = new User({
                ...this,
                uid,
                email,
            });

            this.loading = true;
            try {
                await this.$store.dispatch(
                    'userModule/updateUserToDB',
                    userObj.to_json(['email', 'isAdmin'])
                );

                this.$store.commit('userModule/setUser', userObj.to_json());

                this.$store.commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: 'Details have been updated.',
                    },
                    { root: true }
                );
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
