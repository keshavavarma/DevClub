export const setToken = (token) => {
  sessionStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : {};
  return token;
};

export const clearToken = () => {
  sessionStorage.removeItem("token");
};

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
