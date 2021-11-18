import Post from "../../components/post/Post";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";
import { getAllPosts, getAuthUser, likePost, unlikePost } from "../../api";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";

const Home = () => {
  const user = useRef({});
  const { isAuth } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [feed, setFeed] = useState([]);
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
    setFeed(feed);
  };

  useEffect(() => {
    getCurrentUser();
    homeFeed();
    return console.log("HomePage cleanup done");
  }, [like]);

  return (
    <>
      <Navbar />
      <div className={`${styles.feed} ${styles.container}`}>
        <button className={styles.createPost} onClick={createHandler}>
          Create Post
        </button>
        <button className={styles.createPostSm} onClick={createHandler}>
          +
        </button>
        {feed.length !== 0 ? (
          feed.map((post) => (
            <Post
              post={post}
              user={user}
              isAuth={isAuth}
              likeHandler={likeHandler}
              unlikeHandler={unlikeHandler}
            />
          ))
        ) : (
          <h2>No Posts</h2>
        )}
      </div>
    </>
  );
};

export default Home;
