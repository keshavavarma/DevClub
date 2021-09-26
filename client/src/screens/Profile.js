import styles from "./Profile.module.css";
// import profile from "../images/profile.jpeg";
import { clearToken } from "../util";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyPosts, getMyProfile } from "../api";

const Profile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [posts, setPosts] = useState([]);

  const history = useHistory();
  const logoutHandler = () => {
    clearToken();
    history.push("/Login");
  };

  const editHandler = () => {
    history.push("/EditProfile");
  };
  const profileDetails = async () => {
    const profile = await getMyProfile();
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
                    <img src={post.picture} alt="post" />
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
