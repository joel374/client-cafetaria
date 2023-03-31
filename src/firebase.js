// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-7r-NXC3020G-JoMpeQ5NKjx29_yDAoU",
  authDomain: "convers-time.firebaseapp.com",
  projectId: "convers-time",
  storageBucket: "convers-time.appspot.com",
  messagingSenderId: "470306178759",
  appId: "1:470306178759:web:189acc2839150c068220e2",
  measurementId: "G-33CDWB2LCQ",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user.displayName)
      console.log(result.user.email)
    })
    .catch((error) => {
      console.log(error)
    })
}
