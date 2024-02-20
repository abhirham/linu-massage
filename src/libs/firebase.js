import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCD1F5gfhOLi1ZY23JemO2jLNVlWS3cos0',
    authDomain: 'healing-touch-spa.firebaseapp.com',
    projectId: 'healing-touch-spa',
    storageBucket: 'healing-touch-spa.appspot.com',
    messagingSenderId: '701777771315',
    appId: '1:701777771315:web:a0cbe82ab4ecd2d1a21c46',
    measurementId: 'G-GP247GZL42',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebase.auth();

export default firebase;
