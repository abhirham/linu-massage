<template>
    <v-app>
        <ConfirmDetails />
        <Header />
        <v-main>
            <Alerts></Alerts>
            <RouterView />
        </v-main>
        <v-footer class="bg-primary" app absolute>
            <v-container>
                <v-btn variant="text">about</v-btn>
                <v-btn variant="text">disclaimer</v-btn>
                <v-btn variant="text">service</v-btn>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>
import { auth } from '@/libs/firebase';

import Header from './components/Header.vue';
import Alerts from './components/Alerts.vue';
import ConfirmDetails from './components/ConfirmDetails.vue';

export default {
    components: {
        Header,
        Alerts,
        ConfirmDetails,
    },
    mounted() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.$store
                    .dispatch('userModule/fetchUserById', user.uid)
                    .then((res) => {
                        this.$store.commit('userModule/setUser', res);
                    })
                    .catch((e) => {
                        if (e === 'User not found')
                            this.$store.commit('notificationModule/setAlert', {
                                alertMessage: e,
                                error: true,
                            });
                    });
            } else {
                this.$store.commit('userModule/setUser', {});
            }
        });
    },
};
</script>
