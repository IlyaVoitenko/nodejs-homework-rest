const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongooseSchemaContacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      reqired: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatar: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongooseSchemaContacts;
