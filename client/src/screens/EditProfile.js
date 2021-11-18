import React from "react";
import styles from "./EditProfile.module.css";
import { Alert } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { deleteProfile, updateProfile } from "../api";
import { clearToken } from "../util";
import { AuthContext } from "../contexts/AuthContext";

const EditProfile = () => {
  const { isAuth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const history = useHistory();

  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.push("/Profile");
  };
  const uploadPicture = async () => {
    console.log(photo);
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "pixtagram");
    data.append("cloud_name", "cr7");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/cr7/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!response || !response.ok) {
        const error = await response.json();
        throw new Error("Picture Not Updated");
      }
      const output = await response.json();
      setUrl(output.url);
      console.log("picture uploaded to cloudinary successfully", output.url);
      setSuccess("Picture Updated");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      //return { error: err };
    }
  };

  useEffect(() => {
    if (photo) {
      uploadPicture();
    }
    return console.log("EditProfile clean-up");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProfile = await updateProfile({
      name,
      password,
      picture: url,
      bio,
    });
    if (updatedProfile.error) {
      console.log(updatedProfile.error);
      setError(updatedProfile.error.message);
    } else {
      console.log("Profile Updated Successfully");
      history.push("/Profile");
    }
  };

  const deleteHandler = async () => {
    const deletedMsg = await deleteProfile();
    if (deletedMsg.error) {
      console.log(deletedMsg.error.message);
      setError(deletedMsg.error.message);
    } else {
      console.log(deletedMsg);
      setSuccess(deletedMsg);
      clearToken();
      isAuth.current = false;
      history.push("/Login");
    }
  };
  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <form className={styles.loginForm}>
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
        <h2>Profile</h2>
        <label>Name</label>
        <input
          value={name}
          className={styles.inputField}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label>Bio</label>
        <input
          value={bio}
          className={styles.inputField}
          type="text"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          className={styles.inputField}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <label
          htmlFor="fileUpload"
          className={styles.fileUploadLabel}
          role="button"
        >
          {fileName ? fileName : "Upload Photo"}
          <input
            id="fileUpload"
            className={styles.fileUpload}
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={(e) => {
              if (e.target.files[0] === undefined) {
                console.log(e.target.files[0], "selected undefined file");
                setPhoto("");
              } else {
                console.log(e.target.files[0]);
                setPhoto(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }
            }}
          />
        </label>
        <button
          className={styles.button}
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          Save
        </button>
        <button
          className={styles.buttonDelete}
          onClick={(e) => {
            deleteHandler();
          }}
        >
          Delete Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
