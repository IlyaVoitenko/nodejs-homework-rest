const {
  usersJoiSchema,
  loginJoiSchema,
  verifyUserAgain,
} = require("../../../schemas");
const { validateRequire } = require("../../../decorators");
const { authenticate, upload } = require("../../../helpers");
const {
  createUserController,
  loginUserController,
  logoutUserController,
  verifyController,
  updateAvatarUser,
  resendVerifyEmail,
  getCurrentUser,
} = require("../../../controllers/auth-controller");

const express = require("express");
const router = express.Router();

router.post("/register", validateRequire(usersJoiSchema), createUserController);
router.post("/login", validateRequire(loginJoiSchema), loginUserController);
router.post("/logout", authenticate, logoutUserController);
router.get("/current", authenticate, getCurrentUser);
router.post("/verify/:verificationCode", verifyController);
router.post("/verify/", validateRequire(verifyUserAgain), resendVerifyEmail);
router.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  updateAvatarUser
);

module.exports = router;
