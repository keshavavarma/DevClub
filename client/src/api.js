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
      throw new Error(response.statusText + ", Invalid username or Password");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
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
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
