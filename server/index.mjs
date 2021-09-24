import express from "express";
import cors from "cors";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

// CORS
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json()); // middleware for reqs
app.use(cors(corsOptions));

// Non persistent users data
// Example User: { id: 0, username: "John Doe", password: "hashed", color: "ffffff"}
const users = [
  {
    id: 204012,
    username: "bot",
    password: "password",
    color: "4D1D9B",
  },
];

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

  if (!user) res.status(404).json(`User ${id} was not found.`);

  res.json({ id: user.id, username: user.username, color: user.color });
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
    return res.status(400).json(validation.error.details[0].message);

  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = { id: uuidv4(), username, password: hash, color: "000000" };

  if (users.find((user) => user.username === username))
    return res.status(400).json(`Username is already taken`);

  users.push(newUser);
  res.json({ id: newUser.id });
});

// login
app.post("/api/users/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  if (!user) return res.status(400).json(`User does not exist`);

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ id: user.id });
    } else {
      res.status(401).json("Incorrect password");
    }
  } catch {
    res.status(500).json("Internal Server Error");
  }
});

app.put("/api/users/:id", (req, res) => {
  const schema = Joi.object({
    color: Joi.string().alphanum().min(3).max(6).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);

  const { id } = req.params;
  const { color } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json(`User ${id} was not found.`);

  user.color = color;
  res.json(color);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json(`User ${id} was not found.`);

  users.splice(users.indexOf(user), 1);
  res.json(`User ${id} was deleted.`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
