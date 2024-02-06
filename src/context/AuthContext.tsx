"use client";
import { auth } from "@/libs/firebase";
import { IAuthContext } from "@/libs/interfaces";
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useEffect, useState, createContext } from "react";

const defaultValue: IAuthContext = {
  user: null,
  loaded: false,
  googleSignIn: async () => {},
  facebookSignIn: async () => {},
  logOut: async () => {},
  signUp: async () => {
    return undefined;
  },
  signIn: async () => {
    return undefined;
  },
  recoverPassword: async () => {},
};

export const AuthContext: React.Context<IAuthContext> =
  createContext(defaultValue);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);

      if (userCredentials) {
        await fetch(`/api/account/sign_in`, {
          method: "POST",
          body: JSON.stringify({ uid: userCredentials.user.uid }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      location.reload();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const facebookSignIn = async (): Promise<void> => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);

      if (userCredentials) {
        await fetch(`/api/account/sign_in`, {
          method: "POST",
          body: JSON.stringify({ uid: userCredentials.user.uid }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      location.reload();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<undefined | Error> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<undefined | Error> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials) {
        await fetch(`/api/account/sign_in`, {
          method: "POST",
          body: JSON.stringify({ uid: userCredentials.user.uid }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  };

  const recoverPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const logOut = async (): Promise<void> => {
    signOut(auth);

    await fetch(`/api/account/log_out`, { method: "DELETE" });

    location.reload();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
      }
      setLoaded(true);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        loaded,
        user,
        logOut,
        googleSignIn,
        facebookSignIn,
        signUp,
        signIn,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
