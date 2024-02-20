<template>
    <v-snackbar
        v-model="showAlert"
        content-class="bg-white"
        location="top right"
        timeout="-1"
    >
        <div class="d-flex align-center">
            <v-icon class="mr-3" :color="error ? 'error' : 'success'" size="25"
                >mdi-{{
                    error ? 'alert-circle' : 'checkbox-marked-circle'
                }}</v-icon
            >

            <div>
                <p class="font-weight-black">
                    {{ error ? 'Error' : 'Success' }}
                </p>
                <span>{{ alertMessage }}</span>
            </div>
        </div>
        <template v-slot:actions>
            <v-btn icon="mdi-close" @click="showAlert = false"> </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('notificationModule', ['alertMessage', 'error']),
        showAlert: {
            get() {
                return this.alertMessage.length > 0;
            },
            set() {
                this.$store.commit('notificationModule/setAlert', {
                    alertMessage: '',
                });
            },
        },
    },
};
</script>
