import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1nrGpH3ieu5QSUllWrzOJrdVyQV1Najw",
    authDomain: "weblaptop-97e79.firebaseapp.com",
    projectId: "weblaptop-97e79",
    storageBucket: "weblaptop-97e79.appspot.com",
    messagingSenderId: "786087694717",
    appId: "1:786087694717:web:f5bd744ae4bc6bb39e7c14",
    measurementId: "G-P5753FPVMJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.getAnalytics();

const fireStore = firebase.firestore();

export { fireStore   };
