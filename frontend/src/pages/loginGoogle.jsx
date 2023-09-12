import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import dotenv from "./.env";
import { auth } from "../firebase/firebaseConfig";
const clientid =
  "2534974419-5ekje6q28irfoghc49s6f60tbs5r8r54.apps.googleusercontent.com";

function LoginGoogle(props) {
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState(null);
  const onSuccess = async (res) => {
    // const provider = await new GoogleAuthProvider();
    setName(res.profileObj["name"]);
    console.log("Success " + res.profileObj);
    setFlag(true);
    console.log(flag);
    console.log(name);
    // const auth = new firebase.auth();
// auth.signInWithPopup(provider).then((result) => {
//   setUser(result.user);
// });
    // return signInWithPopup(auth, provider);
  };
  const onFailure = (res) => {
    console.log("Failed" + res);
  };
}


// import React, { useState } from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import dotenv from "./.env";
// import { auth } from "../firebase/firebaseConfig";
// dotenv.config();
// const cliendId = process.env.CLIENTID;
// const clientSecret = process.env.CLIENTSECRET;

//  function LoginGoogle(){
//   const [user, setUser] = useState(null);

//   const signInWithGoogle =async () => {
//     const provider = await new GoogleAuthProvider();
    
//     // provider.setCredentials({
//     //   client_id: cliendId,
//     //   client_secret: clientSecret,
//     // });
//     return signInWithPopup(auth, provider);


//     // const auth = new firebase.auth();
//     // auth.signInWithPopup(provider).then((result) => {
//     //   setUser(result.user);
//     // });
//   };

//   return (
//     <div>
//       <button onClick={signInWithGoogle}>Sign in with Google</button>
//       {user && (
//         <div>
//           User ID: {user.uid}
//           Email: {user.email}
//         </div>
//       )}
//     </div>
//   );
// };

export default LoginGoogle;
