import { useRef, useState } from "react";
import styles from "../../screens/viewPost/ViewPost.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { isEmpty } from "../../util";
import { Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Comments = ({ post, user, deleteMyComment }) => {
  const scrollRef = useRef();
  const [loading, setLoading] = useState(false);

  return (
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

                {user.current._id === comment.postedBy && (
                  <button
                    className={styles.deleteCommentBtn}
                    onClick={async () => {
                      setLoading(true);
                      const deleted = await deleteMyComment(comment._id);
                      setLoading(false);
                    }}
                  >
                    {loading ? (
                      <CircularProgress color="error" size="20px" />
                    ) : (
                      <DeleteIcon color="error" />
                    )}
                  </button>
                )}
              </div>
            ))
          : ""}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default Comments;
