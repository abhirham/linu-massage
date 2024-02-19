import { auth, db } from '@/libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const erroCodeToMessageObj = {
    'auth/email-already-in-use': 'Email is already in use. Please Login',
};

export default {
    name: 'userModule',
    namespaced: true,
    state: () => ({
        user: {},
    }),
    mutations: {
        setUser({ state }, payload) {
            state.user = payload;
        },
    },
    actions: {
        async signupWithEmailAndPW(
            { commit },
            { email, password, firstname, lastnam }
        ) {
            try {
                let result = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                let { uid } = result.user;

                let userObj = { uid, email, firstname, lastnam };

                await db.collection('users').doc(uid).set(userObj);
            } catch (error) {
                let message = erroCodeToMessageObj[error.code];

                if (message !== undefined) {
                    throw message;
                }

                commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: error.message,
                        error: true,
                    },
                    { root: true }
                );
            }
        },
    },
};
