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
                        @click="
                            link.onClick
                                ? link.onClick()
                                : $router.push({ name: link.url })
                        "
                        :class="['d-none d-md-block', link.class]"
                        :variant="link.variant ?? 'text'"
                        >{{ link.title }}</v-btn
                    >
                </template>
                <v-btn
                    @click="$store.dispatch('authModule/signinWithGoogle')"
                    class="d-none d-md-block bg-btn-blue"
                    variant="elevated"
                    >Login</v-btn
                >
                <v-menu
                    min-width="200px"
                    rounded
                    v-if="Object.keys(user).length > 0"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn icon v-bind="props">
                            <v-avatar color="brown" size="large">
                                <span class="text-h5">{{ initials }}</span>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <div class="mx-auto text-center">
                                <v-avatar color="brown">
                                    <span class="text-h5">{{ initials }}</span>
                                </v-avatar>
                                <h3>
                                    {{ user.firstname }} {{ user.lastname }}
                                </h3>
                                <p class="text-caption mt-1">
                                    {{ user.email }}
                                </p>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text">
                                    Edit Account
                                </v-btn>
                                <v-divider class="my-3"></v-divider>
                                <v-btn rounded variant="text"> Log out </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>

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
                                @click="item.onClick()"
                                :to="
                                    item.onClick
                                        ? undefined
                                        : { name: item.url }
                                "
                                v-else
                                :key="item.title"
                            >
                                <v-list-item-title>{{
                                    item.title
                                }}</v-list-item-title>
                            </v-list-item>
                        </template>
                        <v-list-item
                            @click="
                                $store.dispatch('authModule/signinWithGoogle')
                            "
                        >
                            <v-list-item-title>Login</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        links() {
            return [
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
            ];
        },
        user() {
            return this.$store.state.userModule.user;
        },
        initials() {
            let { firstname, lastname } = this.user;

            return `${firstname.substring(0, 1)} ${lastname.substring(0, 1)}`;
        },
    },
};
</script>
