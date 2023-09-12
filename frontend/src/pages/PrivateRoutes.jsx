// import {Login, isLoggedIn} from "./Login";
import {Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes({isLoggedIn}) {
    let auth = isLoggedIn
    return(
        !auth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes