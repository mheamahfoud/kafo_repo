// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvdEoBdtF5S7qBQ3BT6ctSiHIRONwZjIM",
  authDomain: "kafo-d2991.firebaseapp.com",
  projectId: "kafo-d2991",
  storageBucket: "kafo-d2991.appspot.com",
  messagingSenderId: "305941023338",
  appId: "1:305941023338:web:33420ab564362b1c301813",
  measurementId: "G-E1WLC68WF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);