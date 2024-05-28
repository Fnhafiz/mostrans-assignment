// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA-d_WO9xB_1HRDH01vWHQpPxK609RxKYw",
	authDomain: "mostrans-assignment.firebaseapp.com",
	projectId: "mostrans-assignment",
	storageBucket: "mostrans-assignment.appspot.com",
	messagingSenderId: "593574590775",
	appId: "1:593574590775:web:74b0fcfd154f94fba602b2",
	measurementId: "G-JYDV1VSKM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
