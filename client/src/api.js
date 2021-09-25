export const signin = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth", {
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
