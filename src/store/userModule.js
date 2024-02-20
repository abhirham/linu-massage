import { db } from '@/libs/firebase';
import User from '@/models/User';

export default {
    name: 'userModule',
    namespaced: true,
    state: () => ({
        user: {},
    }),
    mutations: {
        setUser(state, payload) {
            state.user = new User(payload);
        },
    },
    actions: {
        createUserToDB({ commit }, payload) {
            return db.collection('users').doc(payload.uid).set(payload);
        },
        fetchUserById({ commit }, uid) {
            return db
                .collection('users')
                .doc(uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        return doc.data();
                    } else {
                        throw { message: 'User not found.' };
                    }
                })
                .catch((e) => {
                    throw e.message;
                });
        },
    },
};
