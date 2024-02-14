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
  signUp: (email: string, password: string) => Promise<undefined | Error>;
  signIn: (email: string, password: string) => Promise<undefined | Error>;
  recoverPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<boolean>;
}
