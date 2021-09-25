import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { useHistory } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const history = useHistory();
  const closeHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    history.push("/");
  };
  const postDetails = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pixtagram");
    data.append("cloud_name", "cr7");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/cr7/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      if (!response || !response.ok) {
        const error = await response.json();
        throw new Error(error);
      }
      const output = await response.json();
      console.log(output.url);
      setUrl(output.url);
    } catch (err) {
      console.log(err.message);
      //return { error: err };
    }
  };

  return (
    <div className={styles.modalContainer} onClick={closeHandler}>
      <div className={`${styles.createPost} ${styles.card} `}>
        <div className={styles.imgContainer}>
          <input
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* <img src="images/homer.jpg" alt="post image" /> */}
        </div>
        <div className={styles.addCaption}>
          <input
            type="text"
            placeholder="Add Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button onClick={postDetails}>
            <SendIcon fontSize="large" sx={{ color: "rgb(0, 119, 255)" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
