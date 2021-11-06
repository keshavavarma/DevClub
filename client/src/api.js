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
    const response = await fetch("/api/posts/", {
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

export const getAuthUser = async () => {
  const token = getToken();
  try {
    const response = await fetch("/api/auth", {
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

export const followUser = async (followID) => {
  const token = getToken();
  try {
    const response = await fetch("/api/users/follow", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        followID,
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

export const unfollowUser = async (followID) => {
  const token = getToken();
  try {
    const response = await fetch("/api/users/unfollow", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        followID,
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

export const getProfileByID = async (userID) => {
  try {
    const response = await fetch(`/api/profile/user/${userID}`, {
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

export const getPost = async (postID) => {
  try {
    const response = await fetch(`/api/posts/post/${postID}`, {
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

export const getPostsByID = async (userID) => {
  try {
    const response = await fetch(`/api/posts/${userID}`, {
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

export const likePost = async (postID) => {
  const token = getToken();
  try {
    const response = await fetch("/api/posts/like", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        postID,
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

export const unlikePost = async (postID) => {
  const token = getToken();
  try {
    const response = await fetch("/api/posts/unlike", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        postID,
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

export const comment = async (text, postID, picture) => {
  const token = getToken();
  try {
    const response = await fetch("/api/posts/comment", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        text,
        postID,
        picture,
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

// delete Comment

export const deleteComment = async (commentId, postID) => {
  const token = getToken();
  try {
    const response = await fetch("/api/posts/comment/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      body: JSON.stringify({
        commentId,
        postID,
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
