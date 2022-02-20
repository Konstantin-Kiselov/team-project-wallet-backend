const express = require("express");

const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.currentUser);

router.get("/google", ctrl.googleAuth);

router.get("/google-redirect", ctrl.googleRedirect);

module.exports = router;
