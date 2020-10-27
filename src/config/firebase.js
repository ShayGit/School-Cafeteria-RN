import  "firebase/auth";
import  "firebase/firestore";
import "firebase/functions"

import * as firebase from 'firebase';


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();

export default firebase;