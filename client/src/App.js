import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import EditProfile from "./screens/EditProfile";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/Register">
          <Register />
        </Route>
        <Route exact path="/Profile">
          <Profile />
        </Route>
        <Route exact path="/CreatePost">
          <CreatePost />
        </Route>
        <Route exact path="/EditProfile">
          <EditProfile />
        </Route>
      </Router>
    </div>
  );
}

export default App;
