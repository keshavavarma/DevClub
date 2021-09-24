import React from "react";
import styles from "./CreatePost.module.css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.push("/");
  };
  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <div className={`${styles.createPost} ${styles.card} `}>
        <div className={styles.imgContainer}>
          <button>+</button>
          {/* <img src="images/homer.jpg" alt="post image" /> */}
        </div>
        <div className={styles.addCaption}>
          <input type="text" placeholder="Add Caption..." />
          <button>post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
