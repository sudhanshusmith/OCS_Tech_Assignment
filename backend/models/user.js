const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid : { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, required: true },  
});

module.exports = mongoose.model("User", userSchema);
