import firebase, { auth } from '@/libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const erroCodeToMessageObj = {
    'auth/email-already-in-use': 'Email is already in use. Please Login',
    'auth/invalid-credential': '',
};

export default {
    name: 'authModule',
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async signupWithEmailAndPW(
            { commit, dispatch },
            { email, password, firstname, lastname }
        ) {
            try {
                let result = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                let { uid } = result.user;

                let userObj = { uid, email, firstname, lastname };

                await dispatch('userModule/createUserToDB', userObj, {
                    root: true,
                });
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
        signInWithEmailAndPassword({ commit }, { email, password }) {
            auth.signInWithEmailAndPassword(email, password).catch((error) => {
                commit(
                    'notificationModule/setAlert',
                    {
                        alertMessage: 'Invalid Email/Password.',
                        error: true,
                    },
                    { root: true }
                );
            });
        },
        signinWithGoogle() {
            let provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then(console.log)
                .catch(console.error);
        },
    },
};
