// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
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
                    'gray-text': '#a8a8b0',
                },
            },
        },
    },
    options: {
        customProperties: true,
    },
})
