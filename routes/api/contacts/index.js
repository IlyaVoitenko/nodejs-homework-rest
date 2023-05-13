const express = require("express");
const {
  updateContactByIdController,
  getListContactsController,
  getContactByIdController,
  removeContactController,
  createContactController,
} = require("../../../controllers/contacts-controller");
const router = express.Router();
const { contactAddSchema } = require("../../../schemas");
const { validateRequire } = require("../../../decorators");

router.get("/", getListContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validateRequire(contactAddSchema), createContactController);

router.delete("/:contactId", removeContactController);

router.put(
  "/:contactId",
  validateRequire(contactAddSchema),
  updateContactByIdController
);

module.exports = router;
