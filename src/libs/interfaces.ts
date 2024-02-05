import { User } from "firebase/auth";

export interface IHomeCard {
  _id: string;
  marca: string;
  detalle: string;
  categoria: string;
  img: Array<string>;
  precio: number;
}

export interface IAuthContext {
  user: User | null;
  loaded: boolean;
  googleSignIn: () => Promise<void>;
  facebookSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<Error | boolean>;
  signIn: (email: string, password: string) => Promise<Error | boolean>;
  recoverPassword: (email: string) => Promise<void>;
}
