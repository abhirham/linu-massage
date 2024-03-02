import { createStore } from 'vuex';

import userModule from './userModule';
import notificationModule from './notificationModule';
import authModule from './authModule';
import courseModule from './courseModule';

// Create a new store instance.
const store = createStore({
    modules: {
        userModule,
        notificationModule,
        authModule,
        courseModule,
    },
});

store.subscribeAction({
    error: (action, __, e) => {
        if (action.payload?.handleError === false) return;

        store.commit('notificationModule/setAlert', {
            alertMessage: e.message,
            error: true,
        });
    },
});

export default store;
