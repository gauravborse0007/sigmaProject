const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const userController = require("../controllers/users.js")

router.get("/signup", userController.renderSignUpForm);//done

router.post("/signup", wrapAsync(userController.SignUp));

router.get("/login", userController.renderLoginForm);//done

router.post("/login",passport.authenticate("local", {  //this always comes as a middleware directly copied form npm passport >> register
    failureRedirect: "/login",
    failureFlash: true//it will flash the error message
}),
    wrapAsync(userController.login)
),

router.get("/logout", userController.logout);

module.exports = router;