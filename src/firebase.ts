import { initializeApp } from "firebase/app";
import { browserLocalPersistence, setPersistence, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const store = getFirestore(app);

(async function() {
    await setPersistence(auth, browserLocalPersistence);
})

export {
    app,
    auth,
    database,
    store
}