<template>
    <v-app>
        <ConfirmDetails
            v-if="showConfirmDetails"
            @complete="showConfirmDetails = false"
        />

        <v-main>
            <Header />
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
import NavigationDrawer from './components/NavigationDrawer.vue';

export default {
    components: {
        Header,
        Alerts,
        ConfirmDetails,
        NavigationDrawer,
    },
    data() {
        return {
            showConfirmDetails: false,
        };
    },
    mounted() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.$store
                    .dispatch('userModule/fetchUserById', {
                        uid: user.uid,
                        handleError: false,
                    })
                    .then((res) => {
                        this.$store.commit('userModule/setUser', res);
                        this.$router.push({ name: this.$route.name });
                    })
                    .catch((e) => {
                        if (e === 'User not found.') {
                            this.showConfirmDetails = true;
                            return;
                        }

                        this.$store.commit('notificationModule/setAlert', {
                            alertMessage: e,
                            error: true,
                        });
                    });
            } else {
                this.$store.commit('userModule/setUser', {});
                this.$router.push({ name: 'home' });
            }
        });
    },
};
</script>
