// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaMbxu3ALNC1RQkWAA-yop-zsyG7c94lM",
  authDomain: "evaluacion-4f263.firebaseapp.com",
  databaseURL: "https://evaluacion-4f263-default-rtdb.firebaseio.com",
  projectId: "evaluacion-4f263",
  storageBucket: "evaluacion-4f263.appspot.com",
  messagingSenderId: "855954965242",
  appId: "1:855954965242:web:f1ed3fe62eb5bcf5bf7f43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});