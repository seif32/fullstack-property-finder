// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
// import axios from "axios";
import { auth } from "./firebaseConfig";
import { createUser, getCurrentUser } from "../services/apiUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("authToken", token); // 👈 Keep localStorage in sync

        try {
          const data = await getCurrentUser(token);
          setUser({ ...data, token });
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, extraData) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    const userData = await createUser(
      {
        email,
        ...extraData,
        role: "USER",
      },
      token
    );

    setUser({ ...userData, token });
    localStorage.setItem("authToken", token);

    return userData;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    const userData = await getCurrentUser(token); // ✅

    setUser({ ...userData, token });

    localStorage.setItem("authToken", token);

    return userData;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    localStorage.removeItem("authToken"); // 👈 Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
