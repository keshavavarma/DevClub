import { useState, useEffect, useRef } from "react";
import styles from "./ViewPost.module.css";
import { useHistory, useParams } from "react-router";
import { comment, getAuthUser, getPost } from "../api";
import { isEmpty } from "../util";

const ViewPost = () => {
  const user = useRef({});
  const post = useRef({});
  const [text, setText] = useState("");
  const [render, setRender] = useState({});
  const history = useHistory();
  const { postID } = useParams();

  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.goBack();
  };

  const getPostDetails = async (postID) => {
    post.current = await getPost(postID);
    setRender(post.current);
  };

  const getCurrentUser = async () => {
    user.current = await getAuthUser();
  };

  const addComment = async () => {
    console.log(text);
    const addedComment = await comment(text, postID);
  };

  console.log(typeof post.current === "object", post.current);

  useEffect(() => {
    getPostDetails(postID);
    getCurrentUser();
  }, []);

  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <div className={`${styles.post} ${styles.card}`}>
        <div className={styles.postLeft}>
          <div className={styles.imgContainer}>
            <img src={post.current.picture} alt="post" />
          </div>
          <div className={styles.postActions}>
            {/* <button className={styles.likes}>like</button> */}
            <span>
              {!isEmpty(post.current) ? post.current.likes.length : ""} likes
            </span>
          </div>
        </div>
        <div className={styles.postRight}>
          <div className={styles.postCommentHeader}>
            <p>Comments</p>
          </div>
          <div className={styles.comments}>
            {!isEmpty(post.current)
              ? post.current.comments.map((comment) => (
                  <div className={styles.comment}>
                    <img src="" alt="profile " />
                    <p>{comment.text}</p>
                  </div>
                ))
              : ""}
          </div>
          <div className={styles.addComment}>
            <img src={user.current.picture} alt="profile " />
            <input
              type="text"
              placeholder="Add Comment..."
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                addComment();
              }}
            >
              add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
