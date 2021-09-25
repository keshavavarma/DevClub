import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const login = () => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm}>
        <h2>Login</h2>
        <label>Email</label>
        <input className={styles.inputField} type="email" required></input>
        <label>Password</label>
        <input className={styles.inputField} type="password" required></input>
        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default login;
