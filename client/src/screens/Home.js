import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";
import { getAllPosts, getAuthUser, likePost, unlikePost } from "../api";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const user = useRef({});
  const { isAuth } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [feed, setFeed] = useState([]);
  console.log("In Home.js");
  const history = useHistory();
  const createHandler = () => {
    history.push("/CreatePost");
  };
  const getCurrentUser = async () => {
    user.current = await getAuthUser();
  };
  const likeHandler = async (postID) => {
    const post = await likePost(postID);
    setLike(!like);
  };
  const unlikeHandler = async (postID) => {
    const post = await unlikePost(postID);
    setLike(!like);
  };

  const homeFeed = async () => {
    const feed = await getAllPosts();
    console.log(feed);
    setFeed(feed);
  };
  useEffect(() => {
    getCurrentUser();
    homeFeed();
    return console.log("HomePage cleanup done");
  }, [like]);

  return (
    <div className={`${styles.feed} ${styles.container}`}>
      <button className={styles.createPost} onClick={createHandler}>
        +
      </button>
      {feed.length !== 0 ? (
        feed.map((post) => {
          return (
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
                <img src={post.user.picture} alt=" profile" />
                <p>{post.user.name}</p>
              </div>
              <div
                className={styles.feedImgContainer}
                onClick={(e) => {
                  history.push(`ViewPost/${post._id}`);
                }}
              >
                <img src={post.picture} alt="post" />
              </div>
              <div className={styles.feedPostActions}>
                <button
                  className="likes"
                  onClick={() => {
                    if (
                      post.likes.filter((id) => id === user.current._id)
                        .length !== 0
                    ) {
                      unlikeHandler(post._id);
                    } else {
                      likeHandler(post._id);
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
                <span>
                  {post.likes.length}{" "}
                  {post.likes.length === 1 ? "like" : "likes"}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No Posts</h2>
      )}
    </div>
  );
};

export default Home;
