<template>
    <v-app>
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
import Header from './components/Header.vue';
import Alerts from './components/Alerts.vue';

export default {
    components: {
        Header,
        Alerts,
    },
};
</script>
