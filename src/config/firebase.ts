// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, GithubAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// NOTE: Do not worry about the security of this key, it is a public key. Be sure to set up the security rules in the Firebase console.
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
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const githubAuthProvider = new GithubAuthProvider();

githubAuthProvider.addScope('repo');
githubAuthProvider.addScope('read:user');



export { githubAuthProvider, auth, analytics };
