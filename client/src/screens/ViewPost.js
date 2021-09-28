import React from "react";
import styles from "./ViewPost.module.css";
import { useHistory } from "react-router";

const ViewPost = () => {
  const history = useHistory();
  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.goBack();
  };

  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <div className={`${styles.post} ${styles.card}`}>
        <div className={styles.postLeft}>
          <div className={styles.imgContainer}>
            <img src="images/homer.jpg" alt="post " />
          </div>
          <div className={styles.postActions}>
            <button className={styles.likes}>like</button>
            <span>10 likes</span>
          </div>
        </div>
        <div className={styles.postRight}>
          <div className={styles.postCommentHeader}>
            <p>Comments</p>
          </div>
          <div className={styles.comments}>
            <div className={styles.comment}>
              <img src="images/profile.jpeg" alt="profile " />
              <p>comment...</p>
            </div>
            <div className={styles.comment}>
              <img src="images/profile.jpeg" alt="profile " />
              <p>comment...</p>
            </div>
            <div className={styles.comment}>
              <img src="images/profile.jpeg" alt="profile " />
              <p>comment...</p>
            </div>
            <div className={styles.comment}>
              <img src="images/profile.jpeg" alt="profile " />
              <p>comment...</p>
            </div>
            <div className={styles.comment}>
              <img src="images/profile.jpeg" alt="profile " />
              <p>comment...</p>
            </div>
            <div className={styles.comment}>
              <img src="images/profile.jpeg" alt="profile " />
              <p>comment...</p>
            </div>
          </div>
          <div className={styles.addComment}>
            <img src="images/profile.jpeg" alt="profile " />
            <input type="text" placeholder="Add Comment..." />
            <button>add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
