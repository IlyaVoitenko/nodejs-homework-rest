const { usersJoiSchema, loginJoiSchema } = require("../../../schemas");
const { validateRequire } = require("../../../decorators");

const {
  createUserController,
  loginUserController,
} = require("../../../controllers/auth-controller");

const express = require("express");
const router = express.Router();

router.post("/register", validateRequire(usersJoiSchema), createUserController);
router.post("/login", validateRequire(loginJoiSchema), loginUserController);

module.exports = router;
