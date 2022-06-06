import firebaseConfig from "./FirebaseConfig";
import { initializeApp } from "firebase/app";

const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;