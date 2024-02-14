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
  deleteUser,
} from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
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
  deleteAccount: async () => {},
};

export const AuthContext: React.Context<IAuthContext> =
  createContext(defaultValue);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router: AppRouterInstance = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);

      if (userCredentials) {
        await fetch(`/api/auth/sign_in`, {
          method: "POST",
          body: JSON.stringify({ uid: userCredentials.user.uid }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      router.push("/");
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
        await fetch(`/api/auth/sign_in`, {
          method: "POST",
          body: JSON.stringify({ uid: userCredentials.user.uid }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      router.push("/");
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
        await fetch(`/api/auth/sign_in`, {
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

    await fetch(`/api/auth/log_out`, { method: "DELETE" });

    location.reload();
  };

  const deleteAccount = async () => {
    if (user) await deleteUser(user);
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
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
