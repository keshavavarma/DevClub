import { getToken } from "./util";
export const signin = async ({ email, password }) => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

export const createPost = async ({ picture, caption }) => {
  const token = getToken();
  try {
    const response = await fetch("http://localhost:5000/api/posts/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        picture,
        caption,
      }),
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

// Profile

export const getMyProfile = async () => {
  const token = getToken();
  try {
    const response = await fetch("/api/profile/me", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

export const updateProfile = async ({ name, password, bio, picture }) => {
  const token = getToken();
  try {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        picture,
        name,
        password,
        bio,
      }),
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

// Posts

export const getAllPosts = async () => {
  try {
    const response = await fetch("/api/posts/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

export const getMyPosts = async () => {
  const token = getToken();
  try {
    const response = await fetch("/api/posts/me", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};

// Delete User

export const deleteProfile = async () => {
  const token = getToken();
  try {
    const response = await fetch("/api/profile", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
    });
    if (!response || !response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err };
  }
};
