import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "./styles.scss";

const SignUp = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password, repeat_password: confirmPassword };

    fetch("/api/users", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((err) => {
          throw err;
        });
      })
      .then((data) => {
        localStorage.setItem("user", data.id);
        history.push("/home");
      })
      .catch((err) => alert(err));
  };

  return (
    <section className="container">
      <div className="background-square-blue"></div>
      <div className="background-triangle-red"></div>
      <form onSubmit={handleSubmit}>
        <h1>Register an Account</h1>
        <IconContext.Provider value={{ className: "input-placeholder-img" }}>
          <div className="input-container">
            <FaUserAlt />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FaLock />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </IconContext.Provider>
        <button type="submit">Sign up</button>
        <div className="link">
          or{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log in
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
