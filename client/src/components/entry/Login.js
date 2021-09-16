import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "./styles.scss";

const Login = () => {
  return (
    <section className="container">
      <div className="background-square-blue"></div>
      <div className="background-triangle-red"></div>
      <form className="form">
        <h1>Welcome Back</h1>
        <IconContext.Provider value={{ className: "input-placeholder-img" }}>
          <div className="input-container">
            <FaUserAlt />
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-container">
            <FaLock />
            <input type="password" placeholder="Password" />
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
