import React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
const Register = () => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm}>
        <h2>Register</h2>
        <label>Name</label>
        <input className={styles.inputField} type="text" required></input>
        <label>Email</label>
        <input className={styles.inputField} type="email" required></input>
        <label>Password</label>
        <input className={styles.inputField} type="password" required></input>
        <button className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
