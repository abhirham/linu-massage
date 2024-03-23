<template>
    <div class="bg-primary py-10 px-5">
        <v-container class="align-self-center">
            <v-row class="align-center">
                <v-img height="150" src="/logo.svg"></v-img>
                <v-spacer></v-spacer>
                <template v-for="link in navs">
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
                <v-spacer class="d-none d-md-block"></v-spacer>
                <div class="d-none d-md-block" v-if="isUserLoggedIn">
                    <v-menu min-width="200px" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props">
                                <v-avatar color="btn-blue" size="large">
                                    <span class="text-h6">{{ initials }}</span>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text>
                                <div class="mx-auto text-center">
                                    <v-avatar color="btn-blue">
                                        <span class="text-h6">{{
                                            initials
                                        }}</span>
                                    </v-avatar>
                                    <h3>
                                        {{ user.firstname }} {{ user.lastname }}
                                    </h3>
                                    <p class="text-caption mt-1">
                                        {{ user.email }}
                                    </p>
                                    <v-divider class="my-3"></v-divider>
                                    <v-btn
                                        rounded
                                        variant="text"
                                        @click="
                                            $router.push({ name: 'edit-user' })
                                        "
                                    >
                                        Edit Profile
                                    </v-btn>
                                    <v-divider class="my-3"></v-divider>
                                    <v-btn
                                        rounded
                                        variant="text"
                                        @click="
                                            $store.dispatch(
                                                'authModule/signout'
                                            )
                                        "
                                    >
                                        Log out
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </div>
                <v-btn
                    v-else
                    @click="$store.dispatch('authModule/signinWithGoogle')"
                    class="d-none d-md-block bg-btn-blue"
                    variant="elevated"
                    >Login</v-btn
                >
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
                        <template v-for="item in collapsed_navs">
                            <v-divider v-if="item === 'separator'"></v-divider>
                            <v-list-item
                                @click="
                                    item.onClick
                                        ? item.onClick()
                                        : $router.push({ name: item.url })
                                "
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
        return {};
    },
    computed: {
        navs() {
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
                {
                    title: 'Admin',
                    url: 'admin',
                    show: !!this.user.isAdmin,
                },
            ].filter((x) => x.show !== false);
        },
        collapsed_navs() {
            return [
                {
                    title: 'Edit Profile',
                    url: 'edit-user',
                    show: this.isUserLoggedIn,
                },
                {
                    title: 'Login',
                    onClick: () =>
                        this.$store.dispatch('authModule/signinWithGoogle'),
                    show: !this.isUserLoggedIn,
                },
                'separator',
                ...this.navs,

                'separator',
                {
                    title: 'Log out',
                    onClick: () => this.$store.dispatch('authModule/signout'),
                    show: this.isUserLoggedIn,
                },
            ].filter((x) => x.show !== false);
        },
        user() {
            return this.$store.state.userModule.user;
        },
        isUserLoggedIn() {
            return this.user.uid !== undefined;
        },
        initials() {
            let { firstname = '', lastname = '' } = this.user;

            return `${firstname.substring(0, 1)}${lastname.substring(0, 1)}`;
        },
    },
};
</script>
