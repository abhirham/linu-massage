import { createApp } from 'vue';
import store from '@/store';
import App from './App.vue';
import router from './router';
import './main.css';
import vuetify from './vuetify.js';
import validationRules from '@/libs/validationRules';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '@mdi/font/css/materialdesignicons.css';

import './libs/firebase';

const app = createApp(App);

app.provide('validation_rules', validationRules);

app.use(router);
app.use(store);
app.use(vuetify);
app.use(VueSweetalert2);

app.mount('#app');
