const { PROJECT_URL } = process.env;
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/auth");

const app = express();
require("dotenv").config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const corsConfig = {
  // origin: [PROJECT_URL],
  origin: "*",
  methods: ["GET", "PUT", "POST", "HEAD", "PATCH", "PUT", "DELETE"],
};

app.use(logger(formatsLogger));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/user", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
