export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      token,
      isAdmin,
    })
  );
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};
  return userInfo;
};

export const clearUserInfo = () => {
  localStorage.removeItem("userInfo");
};
