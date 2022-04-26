export const addUser = async (username, email, password, setUser) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (username, password, setUser) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_REST_API}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const tokenCheck = async (setUser) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "GET",
      headers: { Authorization: `Bearer: ${localStorage.getItem("myToken")}` },
    });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(error);
  }
};
