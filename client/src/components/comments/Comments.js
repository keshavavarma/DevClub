import { useRef, useState } from "react";
import styles from "../../screens/viewPost/ViewPost.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { isEmpty } from "../../util";
import { Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Comment from "./Comment";

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
              <Comment
                user={user}
                comment={comment}
                deleteMyComment={deleteMyComment}
              />
            ))
          : ""}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default Comments;
