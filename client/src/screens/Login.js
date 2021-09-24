import React from "react";
import { Link } from "react-router-dom";
const login = () => {
  return (
    <div>
      <h2>This is Login Page</h2>
      <Link to="/Register">Register</Link>
    </div>
  );
};

export default login;
