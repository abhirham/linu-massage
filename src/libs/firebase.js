import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyCD1F5gfhOLi1ZY23JemO2jLNVlWS3cos0',
    authDomain: 'healing-touch-spa.firebaseapp.com',
    projectId: 'healing-touch-spa',
    storageBucket: 'healing-touch-spa.appspot.com',
    messagingSenderId: '701777771315',
    appId: '1:701777771315:web:a0cbe82ab4ecd2d1a21c46',
    measurementId: 'G-GP247GZL42',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)
