import styles from "./Navbar.module.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getMyProfile } from "../../api";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Navbar = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const { isAuth } = useContext(AuthContext);
  const history = useHistory();
  const homepageHandler = () => {
    history.push("/");
  };
  const profileDetails = async () => {
    const profile = await getMyProfile();
    setName(profile.name);
    setPhoto(profile.picture);
  };
  useState(() => {
    profileDetails();
    console.log("In Navbar", isAuth);
  }, [isAuth.current]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h2 className={styles.brand} onClick={homepageHandler}>
          Pixtagram
        </h2>
        <div className={styles.navigationlinks}>
          {/* <Link to="/Login">Login</Link> */}
          <Link to="/Profile">
            <Avatar
              src={
                isAuth.current &&
                (photo
                  ? photo
                  : `https://avatars.dicebear.com/api/initials/${name}.svg`)
              }
              className="avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
