import { useState, useEffect, useRef } from "react";
import styles from "./ViewPost.module.css";
import { useHistory, useParams } from "react-router";
import { comment, getAuthUser, getPost } from "../api";
import { isEmpty } from "../util";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Navbar from "../components/Navbar";
import SendIcon from "@mui/icons-material/Send";
import { Alert, Avatar } from "@mui/material";

const ViewPost = () => {
  const user = useRef({});
  const post = useRef({});
  const [text, setText] = useState("");
  const [newComment, setNewComment] = useState();
  const [error, setError] = useState("");
  const [render, setRender] = useState({});
  const history = useHistory();
  const { postID } = useParams();
  const scrollRef = useRef();

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.goBack();
  };

  const getPostDetails = async (postID) => {
    post.current = await getPost(postID);
    console.log("Post Details", post.current);
    setRender(post.current);
  };

  const getCurrentUser = async () => {
    user.current = await getAuthUser();
    console.log("current user", user.current.picture);
  };

  const addComment = async () => {
    console.log(text);
    const newComment = await comment(text, postID, user.current.picture);
    if (newComment.error) {
      console.log("Error", newComment.error.message);
      setError(newComment.error.message);
    }
    console.log(newComment);
    setText("");
    setNewComment(newComment);
    scrollToBottom();
  };

  console.log(typeof post.current === "object", post.current);

  useEffect(() => {
    getPostDetails(postID);
    getCurrentUser();
  }, [newComment]);

  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
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
      <div className={`${styles.post} ${styles.card}`}>
        <div className={styles.postLeft}>
          <div className={styles.imgContainer}>
            <img src={post.current.picture} alt="post" />
          </div>
          <div className={styles.postActions}>
            {/* <button className={styles.likes}>like</button> */}
            <span>
              {!isEmpty(post.current) ? post.current.likes.length : ""}
              {post.current.likes && post.current.likes.length === 1
                ? " like"
                : " likes"}
              <FavoriteIcon sx={{ color: "red" }} />
            </span>
            <span className={styles.caption}>
              {" "}
              "{!isEmpty(post.current) ? post.current.caption : ""}"
            </span>
          </div>
        </div>
        <div className={styles.postRight}>
          <div className={styles.commentSection}>
            <div className={styles.postCommentHeader}>
              <p>Comments</p>
            </div>
            <div className={styles.comments}>
              {!isEmpty(post.current)
                ? post.current.comments.map((comment) => (
                    <div className={styles.comment}>
                      {/* <img src={comment.picture} alt="profile " /> */}
                      <Avatar
                        src={comment.picture}
                        alt="profile "
                        className="avatar"
                        style={{
                          marginLeft: "0.3rem",
                          marginRight: "0.3rem",
                          position: "static",
                        }}
                      />
                      <p>{comment.text}</p>
                    </div>
                  ))
                : ""}
              <div ref={scrollRef} />
            </div>
          </div>
          <div className={styles.addComment}>
            {/* <img src={user.current.picture} alt="profile " /> */}
            <Avatar
              src={user.current.picture}
              alt="profile "
              className="avatar"
              style={{
                marginLeft: "0.3rem",
                marginRight: "0.3rem",
                position: "static",
              }}
            />
            <input
              type="text"
              placeholder="Add Comment..."
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <button
              onClick={() => {
                if (text.length !== 0) {
                  addComment();
                }
              }}
            >
              <SendIcon sx={{ color: "rgb(0, 119, 255)" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
