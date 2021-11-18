import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
const Home = lazy(() => import("./screens/home/Home"));
const Login = lazy(() => import("./screens/login/Login"));
const Register = lazy(() => import("./screens/register/Register"));
const Profile = lazy(() => import("./screens/Profile"));
const CreatePost = lazy(() => import("./screens/CreatePost"));
const EditProfile = lazy(() => import("./screens/EditProfile"));
const OthersProfile = lazy(() => import("./screens/OthersProfile"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const ViewPost = lazy(() => import("./screens/ViewPost"));
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Suspense fallback={<h1>Loading...</h1>}>
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
