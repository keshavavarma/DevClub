import styles from "./Profile.module.css";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getPostsByID, getProfileByID } from "../api";

import { AuthContext } from "../contexts/AuthContext";

const OthersProfile = () => {
  const { isAuth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState(false);

  const { userID } = useParams();

  const history = useHistory();

  const followHandler = () => {
    // follow logic
  };

  const unfollowHandler = () => {
    // unfollow logic
  };

  const profileDetails = async () => {
    const profile = await getProfileByID(userID);
    setName(profile.name);
    setBio(profile.bio);
    setPhoto(profile.picture);
  };
  const userPosts = async () => {
    const posts = await getPostsByID(userID);
    setPosts(posts);
    console.log(posts.length);
  };

  console.log("isAuth in OthersProfile.js", isAuth.current);

  useEffect(() => {
    profileDetails();
    userPosts();
    return console.log("OthersProfile cleanup done");
  }, []);

  return isAuth ? (
    <div className={`${styles.profile} ${styles.container}`}>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <img src={photo} alt="profile " />
        </div>
        <div className={styles.profileBio}>
          <p className={styles.userName}>{name}</p>
          <p className={styles.userBio}>{bio}</p>
          <div className={styles.profileConnections}>
            <p>
              Posts <span>6</span>
            </p>
            <p>
              followers <span>200</span>
            </p>
            <p>
              following <span>150</span>
            </p>
          </div>
          <div className={styles.profileActions}>
            {follow ? (
              <button
                className="edit"
                onClick={() => {
                  unfollowHandler();
                  setFollow(!follow);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="edit"
                onClick={() => {
                  followHandler();
                  setFollow(!follow);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.profilePosts}>
        {posts.length !== 0 ? (
          <h3>Posts</h3>
        ) : (
          <h3>
            No Posts Available,<Link to="/CreatePost">Create Post?</Link>
          </h3>
        )}
        <ul className={styles.profilePostContainer}>
          {posts.length !== 0
            ? posts.map((post) => {
                return (
                  <li key={post._id}>
                    <img src={post.picture} alt="post" />
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  ) : (
    <Redirect to="/Profile"></Redirect>
  );
};

export default OthersProfile;
