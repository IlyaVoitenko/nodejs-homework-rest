const express = require("express");
const cors = require("cors");
const {
  updateContactByIdController,
  getListContactsController,
  getContactByIdController,
  removeContactController,
  getContactsFavoriteFieldController,
  createContactController,
} = require("../../../controllers/contacts-controller");
const router = express.Router();
const { PROJECT_URL } = process.env;
const { isValidId, authenticate } = require("../../../helpers");
const { contactAddSchema } = require("../../../schemas");
const { validateRequire } = require("../../../decorators");
const corsConfig = { origin: [PROJECT_URL] };

router.use(authenticate);
router.use(cors(corsConfig));

router.get("/", cors(), getListContactsController);

router.get("/:contactId", isValidId, getContactByIdController);

router.post("/", validateRequire(contactAddSchema), createContactController);

router.delete("/:contactId", isValidId, removeContactController);

router.put(
  "/:contactId",
  isValidId,
  validateRequire(contactAddSchema),
  updateContactByIdController
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateRequire(contactAddSchema),
  getContactsFavoriteFieldController
);

module.exports = router;
