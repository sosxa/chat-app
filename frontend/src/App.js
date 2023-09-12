import "./index";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import PrivateRoutes from "./pages/PrivateRoutes";
function App({isLoggedIn}) {
  return (
    <div>
      {/* <Login title="Welcome Back" btnName="Login" /> */}
      <Routes>
        <Route
          path="/login"
          element={<Login title="Welcome Back" btnName="Login" />}
        />
        <Route
          path="/register"
          element={<Register title="Welcome" btnName="Register" />}
        />
        <Route element={<PrivateRoutes isLoggedIn={null} />}>
          <Route
            path="/"
            element={<Home  />}
          />
        </Route>
      </Routes>
      {/* <LoginGoogle />
      <LogOutGoogle /> */}
    </div>
  );
}

export default App;
