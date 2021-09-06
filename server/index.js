const Joi = require("joi");

const express = require("express");
const app = express();

app.use(express.json()); // middleware for reqs

// Non persistent users data
// Example User: { id: 0, username: "John Doe", password: "hashed", color: "ffffff"}
const users = [{ id: 0, username: "Sam", password: "aasdo", color: "ffffff" }];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) res.status(404).send(`User ${id} was not found.`);

  res.send({ id: user.id, username: user.username, color: user.color });
});

app.post("/api/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const { username, password } = req.body;

  const newUser = { id: users.length, username, password, color: "ffffff" };

  users.push(newUser);
  res.json(newUser.id);
});

app.put("/api/users/:id", (req, res) => {
  const schema = Joi.object({
    color: Joi.string().min(4).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const { id } = req.params;
  const { color } = req.body;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) return res.status(404).send(`User ${id} was not found.`);

  user.color = color;
  res.send(color);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) return res.status(404).send(`User ${id} was not found.`);

  users.splice(users.indexOf(user), 1);
  res.send(`User ${id} was deleted.`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
