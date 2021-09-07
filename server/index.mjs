import { uuid, fromString } from "uuidv4";
import Joi from "joi";
import express from "express";
const app = express();

app.use(express.json()); // middleware for reqs

// Non persistent users data
// Example User: { id: 0, username: "John Doe", password: "hashed", color: "ffffff"}
const users = [{ id: 0, username: "Sam", password: "aasdo", color: "ffffff" }];

app.get("/api/users", (req, res) => {
  res.json(
    users.map((user) => ({
      id: user.id,
      username: user.username,
      color: user.color,
    }))
  );
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) res.status(404).send(`User ${id} was not found.`);

  res.send({ id: user.id, username: user.username, color: user.color });
});

// create a user, requires username, password, repeat_password
app.post("/api/users", (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(8).max(30).required(),
    repeat_password: Joi.any().equal(Joi.ref("password")).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const { username, password } = req.body;

  const newUser = { id: uuid(), username, password, color: "000000" };

  if (users.find((user) => user.username === username))
    res.status(400).send(`Username is already taken`);

  users.push(newUser);
  res.json(newUser.id);
});

app.put("/api/users/:id", (req, res) => {
  const schema = Joi.object({
    color: Joi.string().alphanum().min(3).max(6).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const { id } = req.params;
  const { color } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).send(`User ${id} was not found.`);

  user.color = color;
  res.send(color);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).send(`User ${id} was not found.`);

  users.splice(users.indexOf(user), 1);
  res.send(`User ${id} was deleted.`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
