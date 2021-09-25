import React from "react";
import styles from "./EditProfile.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
const EditProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  //const [picture, setPicture] = useState("");
  const history = useHistory();

  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.push("/Profile");
  };
  const submitHandler = () => {
    // Put request to database
  };
  const uploadPicture = () => {
    // Put request to database
  };
  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <form className={styles.loginForm}>
        <h2>Profile</h2>
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
        <label>Bio</label>
        <input
          value={bio}
          className={styles.inputField}
          type="text"
          required
          onChange={(e) => {
            setBio(e.target.value);
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
        <button className={styles.button} onClick={uploadPicture}>
          Upload Picture
        </button>
        <button className={styles.button} onClick={submitHandler}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
