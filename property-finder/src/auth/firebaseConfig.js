// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIc8IlRdQoSa6bbzbyfE7n3iTuRXUM9r4",
  authDomain: "property-finder-8db45.firebaseapp.com",
  projectId: "property-finder-8db45",
  storageBucket: "property-finder-8db45.firebasestorage.app",
  messagingSenderId: "115713483782",
  appId: "1:115713483782:web:7b1033a2b0ce69dc718f87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the auth module for use elsewhere
const auth = getAuth(app);

export { app, auth };
