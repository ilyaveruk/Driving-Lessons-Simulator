import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: process.env.API_KEY,

    authDomain: "driving-lessons-simulator.firebaseapp.com",

    databaseURL: "https://driving-lessons-simulator-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "driving-lessons-simulator",

    storageBucket: "driving-lessons-simulator.appspot.com",

    messagingSenderId: "662107425234",

    appId: "1:662107425234:web:ecfc9afbf740f9b4d0e00b"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;

