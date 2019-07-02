import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyDkWyGTLnODSzNM1LCm-JxMdALhEWT9Oxo',
    authDomain: 'cvplat-test.firebaseapp.com',
    databaseURL: 'https://cvplat-test.firebaseio.com',
    projectId: 'cvplat-test',
    storageBucket: '',
    messagingSenderId: '676295529709',
    appId: '1:676295529709:web:2e565621a71c483a'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const storage = firebaseApp.storage()
export const db = firebaseApp.firestore()