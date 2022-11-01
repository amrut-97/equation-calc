const varController = require("../controllers/var");
const router = require("express").Router();

router.get("/vars", varController.getAllVars);

module.exports = router;
