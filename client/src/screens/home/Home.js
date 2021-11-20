import Post from "../../components/post/Post";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";
import { getAllPosts, getAuthUser, likePost, unlikePost } from "../../api";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const user = useRef({});
  const { isAuth } = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);
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
    const toggle = await likePost(postID);
    setLike(!like);
    return toggle;
  };

  const unlikeHandler = async (postID) => {
    const toggle = await unlikePost(postID);
    setLike(!like);
    return toggle;
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
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        {/* <h1>Hello</h1> */}
        <div className={styles.feed}>
          <button className={styles.createPost} onClick={createHandler}>
            Create Post
          </button>
          <button className={styles.createPostSm} onClick={createHandler}>
            +
          </button>
          {feed.length !== 0 ? (
            feed.map((post) => (
              <Post
                key={post._id}
                post={post}
                user={user}
                isAuth={isAuth}
                // loading={loading}
                // setLoading={setLoading}
                likeHandler={likeHandler}
                unlikeHandler={unlikeHandler}
              />
            ))
          ) : (
            <h2>No Posts</h2>
          )}
        </div>
        {/* <h1>There</h1> */}
      </div>
    </>
  );
};

export default Home;
