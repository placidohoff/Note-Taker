import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCvjuTP70wmabcrsi7-cBGDTgr2-Eiqa9Y",
    authDomain: "note-taker-99fac.firebaseapp.com",
    databaseURL: "https://note-taker-99fac.firebaseio.com",
    projectId: "note-taker-99fac",
    storageBucket: "note-taker-99fac.appspot.com",
    messagingSenderId: "600918240540",
    appId: "1:600918240540:web:1639076c47a1e8fb1eded9",
    measurementId: "G-BLVL1275VW"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth}