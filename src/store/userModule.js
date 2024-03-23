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
            state.user = payload;
        },
    },
    actions: {
        createUserToDB({ commit }, payload) {
            return db.collection('users').doc(payload.uid).set(payload);
        },
        updateUserToDB(ctx, { uid, ...payload }) {
            return db.collection('users').doc(uid).update(payload);
        },
        fetchUserById({ commit }, { uid }) {
            return db
                .collection('users')
                .doc(uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        let userObj = new User(doc.data());
                        return userObj.to_json();
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
