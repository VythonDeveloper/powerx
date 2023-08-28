// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Add these imports for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHkIRE2-PPEKAtnQn_A4yvka5NqqiP6PU",
  authDomain: "game-project-timer.firebaseapp.com",
  databaseURL: "https://game-project-timer-default-rtdb.firebaseio.com",
  projectId: "game-project-timer",
  storageBucket: "game-project-timer.appspot.com",
  messagingSenderId: "313565163673",
  appId: "1:313565163673:web:c6746b4e60023bdcb5c808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Initialize the authentication instance
const provider = new GoogleAuthProvider(); // Create Google authentication provider instance

export { app, database, auth, provider };
