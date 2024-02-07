<template>
    <v-app-bar :elevation="2" color="primary" density="prominent" absolute>
        <v-container class="align-self-center">
            <v-row class="align-center">
                <v-img
                    cover
                    src="https://d31ezp3r8jwmks.cloudfront.net/qhsul5bfyi7gl2y07chgojiqy6zk"
                ></v-img>
                <v-spacer></v-spacer>
                <v-btn variant="text">home</v-btn>
                <v-btn variant="text">About us</v-btn>
                <v-btn variant="text">rewards</v-btn>
                <v-btn variant="text">disclaimer</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-btn-blue">login</v-btn>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
        }
    },
}
</script>
