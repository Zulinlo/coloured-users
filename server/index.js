const Joi = require("joi");

const express = require("express");
const app = express();

app.use(express.json()); // middleware

app.get("/api", (req, res) => {
  res.status(202).send("Welcome");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
