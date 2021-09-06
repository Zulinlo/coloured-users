import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="users">
      <h1>Users</h1>
      <ul>
        {users.map((user) => {
          return <li key={user["id"]}>{user["name"]}</li>;
        })}
      </ul>
    </section>
  );
};

export default App;
