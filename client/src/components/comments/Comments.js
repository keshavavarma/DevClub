import { useRef } from "react";
import styles from "../../screens/ViewPost.module.css";
import { isEmpty } from "../../util";
import { Avatar } from "@mui/material";
const Comments = ({ post, user, deleteMyComment }) => {
  const scrollRef = useRef();

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
                    onClick={() => deleteMyComment(comment._id)}
                  >
                    X
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
