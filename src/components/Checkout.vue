<template>
    <v-dialog
        :opacity="1"
        max-width="1000"
        no-click-animation
        persistent
        v-model="dialog"
    >
        <v-card>
            <template v-slot:title>
                <div class="font-weight-black px-6">Checkout</div>
            </template>
            <template v-slot:append>
                <div class="">
                    <v-btn
                        density="comfortable"
                        icon="mdi-close"
                        variant="plain"
                        @click="dialog = false"
                    ></v-btn>
                </div>
            </template>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6" class="pa-10">
                        <h3 class="mb-2">Billing Address</h3>
                        <v-form v-model="isBillingAddressValid">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="address1"
                                        label="Address 1"
                                        :rules="validation_rules.required"
                                        variant="outlined"
                                        hide-details="auto"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="address2"
                                        label="Address 2"
                                        variant="outlined"
                                        hide-details="auto"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="city"
                                        label="City"
                                        :rules="validation_rules.required"
                                        variant="outlined"
                                        hide-details="auto"
                                    ></v-text-field> </v-col
                                ><v-col cols="6">
                                    <v-select
                                        label="Province"
                                        :items="[
                                            'AB',
                                            'BC',
                                            'MB',
                                            'NB',
                                            'NL',
                                            'NS',
                                            'ON',
                                            'PE',
                                            'QC',
                                            'SK',
                                        ]"
                                        disabled
                                        :rules="validation_rules.required"
                                        variant="outlined"
                                        v-model="province"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="postalCode"
                                        label="Postal Code"
                                        :rules="[
                                            ...validation_rules.required,
                                            ...validation_rules.postalCode,
                                        ]"
                                        variant="outlined"
                                        hide-details="auto"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                        <h2 class="mt-10">Payment method</h2>
                        <form id="payment-form">
                            <div id="card-container"></div>
                            <v-btn
                                color="primary"
                                :loading="!cardLoaded || makingPayment"
                                @click.prevent="
                                    handlePaymentMethodSubmission(card)
                                "
                                block
                                type="button"
                                >Pay</v-btn
                            >
                        </form>
                        <div id="payment-status-container"></div>
                    </v-col>
                    <v-col class="grey-bg pa-10" cols="12" md="6">
                        <h3 class="mb-2">Summary</h3>
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
                        <v-divider class="my-3"></v-divider>
                        <div
                            class="d-flex justify-space-between font-weight-black"
                        >
                            Total:<span>CA$109.99</span>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style>
.grey-bg {
    background-color: #f8f9fb;
}
</style>

<script>
import { v4 as uuidv4 } from 'uuid';
let card = null;
let payments = null;

export default {
    inject: ['validation_rules'],
    props: ['courseId', 'price', 'modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            cardLoaded: false,
            makingPayment: false,
            locationId: 'LF9BJNQQ8HXGT',
            appId: 'sandbox-sq0idb-g_igKLi8rJiExJkSN1-4GQ',
            idempotencyKey: null,
            isBillingAddressValid: false,
            address1: '',
            address2: '',
            province: 'ON',
            city: '',
            _postalCode: '',
        };
    },
    computed: {
        user() {
            return this.$store.state.userModule.user;
        },
        postalCode: {
            get() {
                return this._postalCode;
            },
            set(val) {
                this._postalCode = val.toUpperCase();
            },
        },
        dialog: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            },
        },
    },
    methods: {
        async createPayment(token, verificationToken) {
            const body = JSON.stringify({
                locationId: this.locationId,
                sourceId: token,
                idempotencyKey: uuidv4(),
                courseId: this.courseId,
                verificationToken,
                customerId: this.user.uid,
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
        async verifyBuyer(token) {
            const verificationDetails = {
                /* collected from the buyer */
                billingContact: {
                    addressLines: [this.address1, this.address2],
                    familyName: this.user.lastname,
                    givenName: this.user.firstname,
                    email: this.user.email,
                    countryCode: 'CA',
                    state: this.province,
                    city: this.city,
                    postalCode: this.postalCode,
                },
                amount: this.price,
                currencyCode: 'CAD',
                intent: 'CHARGE',
            };

            const verificationResults = await payments.verifyBuyer(
                token,
                verificationDetails
            );
            return verificationResults.token;
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
                const verificationToken = await this.verifyBuyer(token);
                const paymentResults = await this.createPayment(
                    token,
                    verificationToken
                );

                this.$store.commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: 'Payment success.',
                    },
                    { root: true }
                );

                this.$store.commit('userModule/addCourseToUser', this.courseId);
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
        payments = window.Square.payments(this.appId, this.locationId);

        try {
            card = await this.initializeCard(payments);
            this.idempotencyKey = uuidv4();
        } catch (e) {
            console.error('Initializing Card failed', e);
            return;
        }

        // Step 5.2: create card payment
    },
};
</script>
