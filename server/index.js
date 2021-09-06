const Joi = require("joi");

const express = require("express");
const app = express();

app.use(express.json()); // middleware for reqs

// Non persistent users data
const users = [{ id: 0, name: "Sam", password: "aasdo", age: 9 }];

app.get("/api/users", (req, res) => {
  res.status(202).json(users);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
