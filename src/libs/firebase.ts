import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA7oMsyAfuwmLees_57cIaTf156bg4-kbE",
  authDomain: "ecommerce-95797.firebaseapp.com",
  projectId: "ecommerce-95797",
  storageBucket: "ecommerce-95797.appspot.com",
  messagingSenderId: "705086044020",
  appId: "1:705086044020:web:2db054dbefc7398662de21",
  measurementId: "G-98NW6LW3E1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);