const { usersJoiSchema, loginJoiSchema } = require("../../../schemas");
const { validateRequire } = require("../../../decorators");
const { authenticate, upload } = require("../../../helpers");
const {
  createUserController,
  loginUserController,
  logoutUserController,
  getCurrentUser,
} = require("../../../controllers/auth-controller");

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  upload.single("avatar"),
  validateRequire(usersJoiSchema),
  createUserController
);
router.post("/login", validateRequire(loginJoiSchema), loginUserController);
router.post("/logout", authenticate, logoutUserController);
router.get("/current", authenticate, getCurrentUser);

module.exports = router;
