import styles from "./Profile.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import {
  followUser,
  getAuthUser,
  getPostsByID,
  getProfileByID,
  unfollowUser,
} from "../../api";

import { AuthContext } from "../../contexts/AuthContext";
import { Avatar } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";

const OthersProfile = () => {
  const { isAuth } = useContext(AuthContext);
  const loggedinUser = useRef({});
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userID } = useParams();

  const history = useHistory();

  const getCurrentUser = async () => {
    loggedinUser.current = await getAuthUser();
  };

  const followHandler = async (followID) => {
    // follow logic
    setLoading(true);
    const profile = await followUser(followID);
    setRender(!render);
    setLoading(false);
  };

  const unfollowHandler = async (followID) => {
    // unfollow logic
    setLoading(true);
    await unfollowUser(followID);
    setRender(!render);
    setLoading(false);
  };

  const profileDetails = async () => {
    const profile = await getProfileByID(userID);
    setFollowers(profile.followers);
    setFollowing(profile.following);
    setName(profile.name);
    setBio(profile.bio);
    setPhoto(profile.picture);
  };
  const userPosts = async () => {
    const posts = await getPostsByID(userID);
    setPosts(posts);
    console.log(posts.length);
  };

  useEffect(() => {
    getCurrentUser();
    profileDetails();
    userPosts();
    return console.log("OthersProfile cleanup done");
  }, [render]);

  return (
    <>
      <Navbar />
      <div className={`${styles.profile} ${styles.container}`}>
        <div className={styles.profileInfo}>
          <Avatar
            src={
              isAuth.current &&
              (photo
                ? photo
                : `https://avatars.dicebear.com/api/initials/${name}.svg`)
            }
            className="avatar"
            style={{
              height: "200px",
              width: "200px",
              marginRight: "1rem",
              position: "static",
            }}
          />
          <div className={styles.profileBio}>
            <p className={styles.userName}>{name}</p>
            <p className={styles.userBio}>{bio}</p>
            <div className={styles.profileConnections}>
              <p>
                Posts <span>{posts.length}</span>
              </p>
              <p>
                followers <span>{followers && followers.length}</span>
              </p>
              <p>
                following <span>{following && following.length}</span>
              </p>
            </div>
            <div className={styles.profileActions}>
              {followers.filter((id) => id === loggedinUser.current._id)
                .length !== 0 ? (
                <button
                  className="edit"
                  disabled={loading}
                  onClick={() => {
                    unfollowHandler(userID);
                  }}
                >
                  {loading ? "loading..." : "Unfollow"}
                </button>
              ) : (
                <button
                  className="edit"
                  disabled={loading}
                  onClick={() => {
                    followHandler(userID);
                  }}
                >
                  {loading ? "loading..." : "follow"}
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
                      <img
                        src={post.picture}
                        alt="post"
                        onClick={() => history.push(`/ViewPost/${post._id}`)}
                      />
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OthersProfile;
