import { createApp } from 'vue';
import { store } from '@/store';
import App from './App.vue';
import router from './router';
import './main.css';
import vuetify from './vuetify.js';

import '@mdi/font/css/materialdesignicons.css';

import './libs/firebase';

const app = createApp(App);

app.provide('validation_rules', {
    required: [
        (val) => {
            if (val) return true;

            return 'This field cannot be empty.';
        },
    ],
    password: [
        (val) =>
            val.length >= 6 ? true : 'Password should be atleast 6 characters.',
    ],
    email: [
        (val) => {
            if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) return true;

            return 'Invalid email.';
        },
    ],
});

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');
