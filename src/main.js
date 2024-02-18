import { createApp } from 'vue'
import { store } from '@/store'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import './main.css'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme: {
                colors: {
                    primary: '#01008a',
                    'btn-blue': '#2c41dd',
                    secondary: '#06a0c1',
                },
            },
        },
    },
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
