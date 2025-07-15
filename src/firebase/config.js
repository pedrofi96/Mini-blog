import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdgSW05qzsMEeJpufADnRkrwTpHr2Ahqs",
  authDomain: "miniblog-e6780.firebaseapp.com",
  projectId: "miniblog-e6780",
  storageBucket: "miniblog-e6780.appspot.com",
  messagingSenderId: "422866774140",
  appId: "1:422866774140:web:301c50d53e078c499ac1f9"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha as instâncias dos serviços
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };