const jwt = require("jsonwebtoken");
const { ErrorHttp } = require("./ErrorHttp");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { getUserById } = require("../models/users");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(ErrorHttp(401));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await getUserById(id);

    if (!user) next(ErrorHttp(401, "Not authorized"));
    req.user = user;

    next();
  } catch (error) {
    next(ErrorHttp(401));
  }
};

module.exports = authenticate;
