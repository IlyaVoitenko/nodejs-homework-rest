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
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
};
router.use(authenticate);

router.options("/", cors(corsOptions));
router.get("/", cors(corsOptions), getListContactsController);

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
