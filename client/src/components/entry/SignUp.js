import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "./styles.scss";

const SignUp = () => {
  return (
    <section className="container">
      <div className="background-square-blue"></div>
      <div className="background-triangle-red"></div>
      <div className="form">
        <h1>Register an Account</h1>
        <IconContext.Provider value={{ className: "input-placeholder-img" }}>
          <div className="input-container">
            <FaUserAlt />
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-container">
            <FaLock />
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-container">
            <FaLock />
            <input type="password" placeholder="Confirm Password" />
          </div>
        </IconContext.Provider>
        <button>Sign up</button>
        <div className="link">
          or{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
