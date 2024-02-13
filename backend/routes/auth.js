const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { login } = require("../controllers/auth");


router.post(
  "/login",
  [
    check("userid").not().isEmpty(),
    check("password_hash").not().isEmpty(),
  ],
  login
);

module.exports = router;
