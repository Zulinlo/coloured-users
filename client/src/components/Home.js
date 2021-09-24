import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChromePicker } from "react-color";
import { FaUserAlt } from "react-icons/fa";

import "./styles.scss";

const Home = () => {
  const history = useHistory();
  const [userColor, setUserColor] = useState("");
  const [users, setUsers] = useState([]);

  const handleColorChange = (e) => {
    setUserColor(e.hex);

    fetch(`/api/users/${localStorage.getItem("user")}`, {
      method: "put",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color: e.hex.slice(1) }),
    })
      .then((res) => {
        if (!res.ok)
          res.json().then((err) => {
            throw err;
          });
      })
      .catch((err) => alert(err));
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const fetchUsers = () => {
    const payload = fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw Error(res.error);

        return res.json();
      })
      .catch((err) => console.error(err));

    return payload;
  };

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data.filter((user) => user.id !== localStorage.getItem("user")));
    });

    fetch(`/api/users/${localStorage.getItem("user")}`, {
      method: "get",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok)
          res.json().then((err) => {
            throw err;
          });

        return res.json();
      })
      .then((data) => setUserColor(`#${data.color}`))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="main-container">
      <div className="picker-container">
        <div
          className="picker-background-triangle"
          style={{ borderBottom: `100px solid ${userColor}` }}
        ></div>
        <div
          className="picker-background-square"
          style={{ backgroundColor: `${userColor}` }}
        ></div>
        <div className="picker">
          <ChromePicker
            width=""
            color={userColor}
            onChange={handleColorChange}
          />
        </div>
      </div>
      <div className="sidebar" style={{ backgroundColor: `${userColor}` }}>
        <h1>All Users</h1>
        <div className="sidebar-users">
          {users.map((user) => (
            <article
              key={user.id}
              style={{ backgroundColor: `#${user.color}` }}
            >
              <FaUserAlt style={{ marginRight: "1rem" }} />
              {user.username.length > 11
                ? user.username.substring(0, 11) + "..."
                : user.username}
            </article>
          ))}
        </div>
        <button onClick={handleLogout}>Log Out </button>
      </div>
    </section>
  );
};

export default Home;
