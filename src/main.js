import { createApp } from 'vue'
import { store } from '@/store'
import App from './App.vue'
import router from './router'
import './main.css'
import vuetify from './vuetify.js'

import '@mdi/font/css/materialdesignicons.css'

import './libs/firebase'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
