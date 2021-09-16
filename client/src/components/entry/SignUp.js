import { useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "./styles.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password, repeat_password: confirmPassword };

    const response = await fetch("/api/users", {
      method: "post",
      data: JSON.stringify(newUser),
    });

    const body = await response.json();
    console.error(body);
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
