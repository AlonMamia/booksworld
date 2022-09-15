const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 4,
  },
  email: {
    type: String,
    match: /^[w-.]+@([w-]+.)+[w-]{2,4}$/,
  },
  password: {
    type: String,
  },
  profile_picture: {
    type: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", UserSchema);

const validate_user = (name, email, password) => {
  const schema = new Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().regex("^[w-.]+@([w-]+.)+[w-]{2,4}$"),
    password: Joi.string().min(3).max(15).required(),
    profile_picture: Joi.binary(),
  });
  return schema.validate({
    name: name,
    email: email,
    password: password,
    profile_picture: profile_picture,
  });
};

module.exports = { User, validate_user };
