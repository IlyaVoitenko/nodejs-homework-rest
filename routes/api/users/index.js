const { usersJoiSchema } = require("../../../schemas");
const { validateRequire } = require("../../../decorators");

const {
  createUserController,
} = require("../../../controllers/users-controller");

const express = require("express");
const router = express.Router();

router.post("/register", validateRequire(usersJoiSchema), createUserController);

module.exports = router;
