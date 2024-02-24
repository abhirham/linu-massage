<template>
    <v-navigation-drawer :width="200">
        <v-list>
            <v-list-item
                prepend-avatar="/src/assets/logo.svg"
                title="Admin Page"
            ></v-list-item>
            <v-list-item link title="Home"></v-list-item>
            <v-list-item link title="Courses"></v-list-item>
            <v-list-item link title="Reports"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>
