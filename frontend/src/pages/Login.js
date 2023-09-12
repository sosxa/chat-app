// export default Login;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import jwt_decode from "jwt-decode";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import LoginGoogle from "./loginGoogle";
// import LogOutGoogle from "./logoutGoogle";
import UserInput from "./userInput";
import { Navigate, json } from "react-router-dom";
// import { GoogleAuthProvider } from "firebase/auth";
// import firebase from "firebase";
// import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import GoogleButton from 'react-google-button'
// FOR FIREBASE
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import app from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {signInWithGoogle} from "../firebase/firebaseConfig";
import { Link } from 'react-router-dom';

const db = getFirestore(app);

function Login(props) {
  // axios default
  axios.defaults.baseURL = "http://localhost:5000";

  // const [googEmail, setGoogEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: String,
    password: String,
  });
  

  // const auth = firebase.auth();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  // recieving google email
  const handleCallBackReponse = () => {
    signInWithPopup(auth, provider).then((result)=> {
      console.log("This is the result: " + result.user)
      const name = result.user.displayName;
      const email = result.user.email;
      console.log("Name : " + name)
      console.log("Email : " + email)
    }).catch((err) => {
      console.log("Error: " + err);
    })
    // var decode = jwt_decode(response.credential);
    // console.log(response);
    // console.log(decode.email);
    // console.log(decode.email)
    // axios.post("/login", {
    //   email: decode.email,
    // });
    setRedirectUser(true);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    /* global google */
    // google.accounts.id.initialize({
    //   client_id:
    //     "2534974419-5ekje6q28irfoghc49s6f60tbs5r8r54.apps.googleusercontent.com",
    //   callback: handleCallBackReponse,
    // });

    // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    //   theme: "outline",
    //   size: "large",
    // });

    
  });

  // tearinty for user not to access home page until logging in
  if (redirectUser) {
    return <Navigate to="/" />;
  }

  // state for form data

  const handleInfo = (event) => {
    let input = event.target.value;
    let name = event.target.name;
    setUserInfo((prevValue) => {
      if (name === "email") {
        return {
          email: input,
          password: prevValue.password,
        };
      } else if (name === "password") {
        return {
          email: prevValue.email,
          password: input,
        };
      }
    });
  };

  // email: event.target.email.value,
  // password: event.target.password.value,
  const handleLogin = (response) => {
    axios
      .post("/login", {
        email: userInfo.email,
        password: userInfo.password,
      })
      .then(function (response) {
        var setInputEmail = userInfo.email;
        console.log("email: " + setInputEmail);
        const userToken = response.data.token;
        console.log(userToken);
        localStorage.setItem("token", userToken);
        setRedirectUser(true);
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendingToken = () => {
    axios.get("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
  };

  return (
    <div className="background">
      <div className="all">
        <h1>{props.title}</h1>
        <div>
          <UserInput
            className="userInput userDiv"
            placeholder="Email"
            type="text"
            name="email"
            onChange={handleInfo}
            value={userInfo.email}
          />
        </div>
        <div>
          <UserInput
            className="userInput userDiv"
            placeholder="Password"
            type="Password"
            name="password"
            onChange={handleInfo}
            value={userInfo.password}
          />
        </div>
        <div>
          <button
            onClick={() => {
              handleLogin();
              sendingToken();
            }}
            className="userButton userDiv"
            type="submit"
          >
            {props.btnName}
          </button>
        </div>
        <div className="btnGoogleDiv">     
        <GoogleButton onClick={handleCallBackReponse} />
        </div>
      </div>
    </div>
  );
}

export default Login;
