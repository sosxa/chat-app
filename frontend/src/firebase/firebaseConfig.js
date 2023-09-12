// 
// import getAuth from "firebase/auth"
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// 
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyATte60_EzCuBSnf8NZho45hHhMKjCKvo8",
  authDomain: "chat-app-788c0.firebaseapp.com",
  projectId: "chat-app-788c0",
  storageBucket: "chat-app-788c0.appspot.com",
  messagingSenderId: "976396662508",
  appId: "1:976396662508:web:dbc26199f3e6be2c3c97c9",
  measurementId: "G-YWG0RJL7SG"
};

const app = initializeApp(firebaseConfig);
// 
// export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error)
//   }) 
// }
// 
export default app;