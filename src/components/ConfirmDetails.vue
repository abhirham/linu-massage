<template>
    <v-dialog
        :opacity="1"
        width="auto"
        no-click-animation
        persistent
        :model-value="true"
    >
        <v-card>
            <v-card-text>
                <v-alert class="mb-3">
                    Please enter the following details.
                    <p class="font-weight-black">
                        This is required to generate your certificate of
                        completion.
                    </p>
                </v-alert>
                <v-form ref="form">
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
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                    variant="elevated"
                    color="btn-blue"
                    :loading="loading"
                    @click="onSubmit"
                    >save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { auth } from '@/libs/firebase';
import User from '@/models/User';

export default {
    inject: ['validation_rules'],
    data() {
        return { firstname: '', lastname: '', loading: false };
    },
    methods: {
        async onSubmit() {
            let { valid } = await this.$refs.form.validate();

            let { uid, email } = auth.currentUser;

            if (!valid) return;

            let userObj = new User({
                ...this,
                uid,
                email,
            });

            this.loading = true;
            try {
                await this.$store.dispatch(
                    'userModule/createUserToDB',
                    userObj.to_json()
                );

                this.$store.commit('userModule/setUser', userObj.to_json());

                this.$emit('complete');
            } catch (e) {
                this.$store.commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: e.message,
                        error: true,
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
