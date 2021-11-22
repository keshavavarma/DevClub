import { useState, useEffect, useRef } from "react";
import styles from "./ViewPost.module.css";
import { useHistory, useParams } from "react-router";
import { comment, getAuthUser, getPost, deleteComment } from "../../api";
import { isEmpty } from "../../util";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import Navbar from "../../components/Navbar";
import SendIcon from "@mui/icons-material/Send";
import { Alert, Avatar } from "@mui/material";
import Comments from "../../components/comments/Comments";
import CircularProgress from "@mui/material/CircularProgress";

const ViewPost = () => {
  const user = useRef({});
  const post = useRef({});
  const [text, setText] = useState("");
  const [newComment, setNewComment] = useState();
  const [afterDelete, setAfterDelete] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    console.log("post details", post.current.comments);
    setRender(post.current);
  };

  const getCurrentUser = async () => {
    user.current = await getAuthUser();
    console.log("current user", user.current._id);
  };

  const addComment = async () => {
    console.log(text);
    setLoading(true);
    const newComment = await comment(text, postID, user.current.picture);
    if (newComment.error) {
      setLoading(false);
      console.log("Error", newComment.error.message);
      setError(newComment.error.message);
    }
    setLoading(false);
    console.log(newComment);
    setText("");
    setNewComment(newComment);
    scrollToBottom();
  };

  const deleteMyComment = async (id) => {
    console.log("comment id", id);
    const deleted = await deleteComment(id, postID);
    if (deleted.error) {
      console.log("Error", deleted.error.message);
      setError(deleted.error.message);
    }
    console.log(deleted);
    setAfterDelete(deleted);
    scrollToBottom();
    return deleted;
  };

  console.log(typeof post.current === "object", post.current);

  useEffect(() => {
    getPostDetails(postID);
    getCurrentUser();
  }, [newComment, afterDelete]);

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
              {!isEmpty(post.current) && `${post.current.caption}`}
            </span>
          </div>
        </div>
        <div className={styles.postRight}>
          <Comments post={post} user={user} deleteMyComment={deleteMyComment} />
          <form className={styles.addComment}>
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
            {loading ? (
              <button>
                <CircularProgress
                  size="24px"
                  sx={{ color: "rgb(0, 119, 255)" }}
                />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (text.length !== 0) {
                    addComment();
                  }
                }}
              >
                <SendIcon sx={{ color: "rgb(0, 119, 255)" }} />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
