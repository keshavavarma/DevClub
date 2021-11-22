import React, { useState } from "react";
import styles from "../../screens/home/Home.module.css";
import { useHistory } from "react-router-dom";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Post = ({ post, user, likeHandler, unlikeHandler, isAuth }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  return (
    post && (
      <div className={`${styles.post} ${styles.card}`} key={post._id}>
        <div
          className={styles.userInfo}
          onClick={(e) => {
            if (post.user._id === user.current._id) {
              history.push("/Profile");
            } else {
              history.push(`user/${post.user._id}`);
            }
          }}
        >
          <Avatar
            src={
              isAuth.current &&
              (post && post.user.picture
                ? post.user.picture
                : `https://avatars.dicebear.com/api/initials/${post.user.name}.svg`)
            }
            className="avatar"
            style={{
              marginRight: "0.2rem",
              position: "static",
              cursor: "pointer",
            }}
          />
          <p>{post.user.name}</p>
        </div>
        <div
          className={styles.feedImgContainer}
          onClick={(e) => {
            history.push(`ViewPost/${post._id}`);
          }}
        >
          {/* <img src={post.picture} alt="post" /> */}
          <LazyLoadImage src={post.picture} alt="post" effect="blur" />
        </div>
        <div className={styles.feedPostActions}>
          {post.caption && (
            <div className={styles.feedPostActionsCaption}>
              <span>{post.caption}</span>
            </div>
          )}
          <div className={styles.feedPostActionsLikes}>
            {loading ? (
              <CircularProgress size="34px" sx={{ color: "red" }} />
            ) : (
              <button
                className="likes"
                onClick={async () => {
                  if (
                    post.likes.filter((id) => id === user.current._id)
                      .length !== 0
                  ) {
                    setLoading(true);
                    const toggle = await unlikeHandler(post._id);
                    console.log(toggle);
                    if (toggle) setLoading(false);
                  } else {
                    setLoading(true);
                    const toggle = await likeHandler(post._id);
                    if (toggle) setLoading(false);
                  }
                }}
              >
                {post.likes.filter((id) => id === user.current._id).length !==
                0 ? (
                  <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="large" />
                )}
              </button>
            )}

            <span>
              {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
            </span>
            <button
              onClick={(e) => {
                history.push(`ViewPost/${post._id}`);
              }}
            >
              <ChatBubbleOutlineOutlinedIcon fontSize="large" />
            </button>
            <span>
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "comment" : "comments"}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Post;
