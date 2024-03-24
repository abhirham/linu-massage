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
                <h2>Order details</h2>
                <v-list-item class="px-0">
                    <template v-slot:title
                        ><div class="font-weight-black">
                            Strive 1: Act with Professional Integrity
                        </div></template
                    >
                    <template v-slot:prepend>
                        <v-img
                            width="50"
                            max-height="100"
                            cover
                            src="/home.jpeg"
                            class="mr-5"
                        ></v-img>
                    </template>

                    <template v-slot:append>
                        <div class="ml-5">CA$109.99</div>
                    </template>
                </v-list-item>
                <h2 class="mt-10">Payment method</h2>
                <form id="payment-form">
                    <div id="card-container"></div>
                    <v-btn
                        color="primary"
                        :loading="!cardLoaded || makingPayment"
                        @click.prevent="handlePaymentMethodSubmission(card)"
                        block
                        type="button"
                        >Pay</v-btn
                    >
                </form>
                <div id="payment-status-container"></div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
// import './Payment.css';
let card = null;

export default {
    data() {
        return {
            cardLoaded: false,
            makingPayment: false,
            locationId: 'LF9BJNQQ8HXGT',
            appId: 'sandbox-sq0idb-g_igKLi8rJiExJkSN1-4GQ',
        };
    },
    methods: {
        async createPayment(token) {
            const body = JSON.stringify({
                locationId: this.locationId,
                sourceId: token,
                idempotencyKey: 'something',
                customerId: this.$store.state.userModule.user.uid,
            });

            const paymentResponse = await fetch(
                'http://127.0.0.1:3000/payments',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body,
                }
            );
            if (paymentResponse.ok) {
                return paymentResponse.json();
            }
            const errorBody = await paymentResponse.text();
            throw new Error(errorBody);
        },
        async tokenize() {
            const tokenResult = await card.tokenize();
            if (tokenResult.status === 'OK') {
                return tokenResult.token;
            } else {
                let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
                if (tokenResult.errors) {
                    errorMessage += ` and errors: ${JSON.stringify(
                        tokenResult.errors
                    )}`;
                }
                throw new Error(errorMessage);
            }
        },
        async initializeCard(payments) {
            const card = await payments.card();
            await card.attach('#card-container');
            this.cardLoaded = true;
            return card;
        },
        async handlePaymentMethodSubmission() {
            try {
                this.makingPayment = true;

                const token = await this.tokenize();
                const paymentResults = await this.createPayment(token);

                this.$store.commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: 'Payment success.',
                    },
                    { root: true }
                );

                console.debug('Payment Success', paymentResults);
            } catch (e) {
                this.makingPayment = false;
                this.$store.commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: 'There was an error. Please try again.',
                        error: true,
                    },
                    { root: true }
                );
                console.error(e.message);
            }
        },
    },
    async mounted() {
        if (!window.Square) {
            throw new Error('Square.js failed to load properly');
        }
        const payments = window.Square.payments(this.appId, this.locationId);

        try {
            card = await this.initializeCard(payments);
        } catch (e) {
            console.error('Initializing Card failed', e);
            return;
        }

        // Step 5.2: create card payment
    },
};
</script>
