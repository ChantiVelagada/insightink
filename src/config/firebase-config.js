import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQZUUz4NYqAOeo2x6EmMZ4WPNEHs93ymY",
  authDomain: "insightink-2d086.firebaseapp.com",
  projectId: "insightink-2d086",
  storageBucket: "insightink-2d086.appspot.com",
  messagingSenderId: "570581211398",
  appId: "1:570581211398:web:e30721c4cded0545b5a687",
  measurementId: "G-448YQ62HQ3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider =new GoogleAuthProvider();
