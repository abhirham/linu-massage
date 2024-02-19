<template>
    <div class="bg-primary py-10 px-5">
        <v-container class="align-self-center">
            <v-row class="align-center">
                <v-img height="150" src="/src/assets/logo.svg"></v-img>
                <v-spacer></v-spacer>
                <template v-for="link in links">
                    <v-spacer
                        v-if="link === 'separator'"
                        class="d-none d-md-block"
                    ></v-spacer>
                    <v-btn
                        @click="$router.push({ name: link.url })"
                        :class="['d-none d-md-block', link.class]"
                        :variant="link.variant ?? 'text'"
                        >{{ link.title }}</v-btn
                    >
                </template>

                <v-menu location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            class="d-md-none"
                            variant="text"
                            icon
                            v-bind="props"
                        >
                            <v-icon icon="mdi-text" size="40"></v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <template v-for="item in links">
                            <v-divider v-if="item === 'separator'"></v-divider>
                            <v-list-item
                                :to="{ name: item.url }"
                                v-else
                                :key="item.title"
                            >
                                <v-list-item-title>{{
                                    item.title
                                }}</v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-menu>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    title: 'Home',
                    url: 'home',
                },
                {
                    title: 'About Us',
                    url: 'about',
                },
                {
                    title: 'Rewards',
                    url: 'referral',
                },
                {
                    title: 'Disclaimer',
                    url: '',
                },
                'separator',
                {
                    title: 'Login',
                    url: 'login',
                    class: 'bg-btn-blue',
                    variant: 'elevated',
                },
                {
                    title: 'Sign up',
                    url: 'signup',
                    class: ' ml-3',
                    variant: 'outlined',
                },
            ],
        }
    },
    computed: {},
}
</script>
