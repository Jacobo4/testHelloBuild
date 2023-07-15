// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GithubAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAINbWQzFVz-dNCazU7Ermdy6DscYI4MbU",
  authDomain: "testhellobuild.firebaseapp.com",
  projectId: "testhellobuild",
  storageBucket: "testhellobuild.appspot.com",
  messagingSenderId: "273395629259",
  appId: "1:273395629259:web:d402a3eaf8646dc0482f4e",
  measurementId: "G-SGW923581R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Analytics
export const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const githubAuthProvider =
    new GithubAuthProvider()
    .addScope('read:user');
