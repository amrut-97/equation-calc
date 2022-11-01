const router = require("express").Router();

router.get("/", function (req, res, next) {
  res.send("Welcome to Home Page");
});

module.exports = router;
