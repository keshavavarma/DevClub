import React from "react";
import styles from "./Register.module.css";
import { Alert } from "@mui/material";
//import { useHistory } from "react-router-dom";
import { useState } from "react";
import { register } from "../api";
import { getToken, setToken } from "../util";
const Register = () => {
  //const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = await register({ name, email, password });
    if (token.error) {
      console.log("don't save");
      setError(token.error.message);
    } else {
      console.log("token saved");
      setToken(token);
      console.log(getToken());
      setSuccess("You have successfully Registered");
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className={styles.formContainer}>
      {error && (
        <Alert
          onClose={() => {
            setError("");
          }}
          severity="error"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          onClose={() => {
            setSuccess("");
          }}
          severity="success"
        >
          {success}
        </Alert>
      )}
      <form className={styles.loginForm}>
        <h2>Register</h2>
        <label>Name</label>
        <input
          value={name}
          className={styles.inputField}
          type="text"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label>Email</label>
        <input
          value={email}
          className={styles.inputField}
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          className={styles.inputField}
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className={styles.button} onClick={submitHandler}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
