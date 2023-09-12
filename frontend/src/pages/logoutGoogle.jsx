import React from "react";
import GoogleLogout from "react-google-login";

const clientid =
  "2534974419-5ekje6q28irfoghc49s6f60tbs5r8r54.apps.googleusercontent.com";
function LogOutGoogle() {
  return (
    <div>
      <GoogleLogout
        clientId={clientid}
        buttonText="Sign out with google"
        onSuccess={() => {
          console.log("User logged out");
        }}
      />
    </div>
  );
}

export default LogOutGoogle;
