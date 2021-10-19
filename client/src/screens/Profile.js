import styles from "./Profile.module.css";
import { clearToken } from "../util";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getMyPosts, getMyProfile } from "../api";

import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { isAuth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const history = useHistory();
  const logoutHandler = () => {
    clearToken();
    isAuth.current = false;
    history.push("/Login");
  };

  const editHandler = () => {
    history.push("/EditProfile");
  };
  const profileDetails = async () => {
    const profile = await getMyProfile();
    setFollowers(profile.followers);
    setFollowing(profile.following);
    console.log("profile", profile);
    setName(profile.name);
    setBio(profile.bio);
    setPhoto(profile.picture);
  };
  const myPosts = async () => {
    const posts = await getMyPosts();
    setPosts(posts);
    console.log(posts.length);
  };
  useEffect(() => {
    profileDetails();
    myPosts();
    return console.log("Profile cleanup done");
  }, []);

  return (
    <>
      <Navbar />
      <div className={`${styles.profile} ${styles.container}`}>
        <div className={styles.profileInfo}>
          {/* <div className={styles.imgContainerProfile}>
            <img src={photo} alt="profile " />
          </div> */}
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
              <button className="edit" onClick={editHandler}>
                Edit
              </button>
              <button className="logout" onClick={logoutHandler}>
                Logout
              </button>
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
                        onClick={(e) => {
                          history.push(`ViewPost/${post._id}`);
                        }}
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

export default Profile;
