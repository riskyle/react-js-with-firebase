import { initializeApp } from "firebase/app";
import {
    collection,
    getDoc,
    getFirestore,
    onSnapshot,
    doc,
} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// put the value on the .env
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// init firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

//Google Auth
export const provider = new GoogleAuthProvider();

//init services
export const db = getFirestore();

//collection ref
export const colRef = collection(db, 'books');

//get collection data
// export const Books = async () => {
//     try {
//         const snapshot = await getDocs(colRef);
//         const books = [];
//         for (const book of snapshot.docs) {
//             books.push({ ...book.data(), id: book.id })
//         }
//         console.log(books);
//     } catch (error) {
//         console.log(error);
//     }
// };
// Books();

//queries
// const q = query(colRef, where("author", "==", "Jee Ann Guinsod"), orderBy("title", "desc"))

//real time collection data
const Books = (snapshot) => {
    try {
        const books = [];
        for (const book of snapshot.docs) {
            books.push({ ...book.data(), id: book.id })
        }
        console.log(books);
    } catch (error) {
        console.log(error);
    }
};
export const unsubCol = onSnapshot(colRef, (snapshot) => Books(snapshot));

//get a single document
const docRef = doc(db, 'books', 'Uqz4je3NhxPwy4j3A7QS');
const bookDetails = async () => {
    const doc = await getDoc(docRef);
    console.log(doc.data(), doc.id);
};
export const unsubDoc = onSnapshot(docRef, (snapshot) => bookDetails(snapshot));

//subscribing to auth changes
const userStatus = (user) => { console.log('user status changed:', user) }
export const unSubAuth = onAuthStateChanged(auth, (user) => userStatus(user));
