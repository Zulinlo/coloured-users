import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "./styles.scss";

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };

    fetch("/api/users/login", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.json().then((err) => {
          throw err;
        });
      })
      .then((data) => {
        localStorage.setItem("user", data.id);
        history.push("/home");

        return localStorage.getItem("user");
      })
      .catch((err) => alert(err));
  };

  return (
    <section className="container">
      <div className="background-square-blue"></div>
      <div className="background-triangle-red"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <IconContext.Provider value={{ className: "input-placeholder-img" }}>
          <div className="input-container">
            <FaUserAlt />
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FaLock />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </IconContext.Provider>
        <button type="submit">Sign in</button>
        <div className="link">
          or{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
