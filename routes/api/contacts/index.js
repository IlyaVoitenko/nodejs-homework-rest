const express = require("express");
const {
  updateContactByIdController,
  getListContactsController,
  getContactByIdController,
  removeContactController,
  getContactsFavoriteFieldController,
  createContactController,
} = require("../../../controllers/contacts-controller");
const router = express.Router();
const { isValidId, authenticate } = require("../../../helpers");
const { contactAddSchema } = require("../../../schemas");
const { validateRequire } = require("../../../decorators");

router.use(authenticate);

router.get("/", getListContactsController);

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
