import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../screens/Login";

const ProtectedRoute = (props) => {
  const { isAuth } = useContext(AuthContext);
  console.log("IN Protected Route", isAuth.current);
  return isAuth.current ? <Route {...props} /> : <Redirect to="/Login" />;
};

export default ProtectedRoute;
