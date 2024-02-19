import { createStore } from 'vuex'

import userModule from './userModule'
import notificationModule from './notificationModule'

// Create a new store instance.
export const store = createStore({
    modules: {
        userModule,
        notificationModule,
    },
})
