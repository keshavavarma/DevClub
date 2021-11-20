import "./App.css";
import React, { Suspense, lazy } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
const Home = lazy(() => import("./screens/home/Home"));
const Login = lazy(() => import("./screens/login/Login"));
const Register = lazy(() => import("./screens/register/Register"));
const Profile = lazy(() => import("./screens/profile/Profile"));
const CreatePost = lazy(() => import("./screens/createPost/CreatePost"));
const EditProfile = lazy(() => import("./screens/editProfile/EditProfile"));
const OthersProfile = lazy(() => import("./screens/profile/OthersProfile"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const ViewPost = lazy(() => import("./screens/viewPost/ViewPost"));

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Suspense fallback={<CircularProgress color="inherit" />}>
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute path="/Profile">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute path="/CreatePost">
                <CreatePost />
              </ProtectedRoute>
              <ProtectedRoute path="/ViewPost/:postID">
                <ViewPost />
              </ProtectedRoute>
              <ProtectedRoute path="/EditProfile">
                <EditProfile />
              </ProtectedRoute>
              <Route path="/user/:userID">
                <OthersProfile />
              </Route>
              <Route path="/Login">
                <Login />
              </Route>
              <Route path="/Register">
                <Register />
              </Route>
            </Switch>
          </Suspense>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
