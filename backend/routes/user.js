const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userControllers = require("../controllers/user");

router.get("/dashboard", userControllers.dashboard);
// router.post(
//   "/createUser",
//   [
//     check("userid").not().isEmpty(),
//     check("role").not().isEmpty(),
//     check("password").not().isEmpty(),
//   ],
//   userControllers.createUser
// );

module.exports = router;
