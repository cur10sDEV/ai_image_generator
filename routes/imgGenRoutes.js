const router = require("express").Router();
const generateImage = require("../controllers/imgGenControllers");

router.post("/generateImage", generateImage);

module.exports = router;
