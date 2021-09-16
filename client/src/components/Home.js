import { useState, useEffect } from "react";
import { ChromePicker } from "react-color";

import "./styles.scss";

const Home = () => {
  const [userColor, setUserColor] = useState("#A8A8A8");
  const [users, setUsers] = useState([]);

  const handleColorChange = (e) => {
    setUserColor(e.hex);
  };

  const fetchUsers = async () => {
    const payload = await fetch("/api/users")
      .then((res) => {
        console.log(res);
        if (!res.ok) throw Error(res.error);

        return res.json();
      })
      .catch((err) => console.error(err));

    return payload;
  };

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
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
      </div>
    </section>
  );
};

export default Home;
