import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import EditProfile from "./screens/EditProfile";
import OthersProfile from "./screens/OthersProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ViewPost from "./screens/ViewPost";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
