const express = require("express");

const PersonController = require("../controller/PersonController");

const router = express.Router();

router.get("/people", PersonController.index);
router.post("/people", PersonController.create);
router.put("/people/:id", PersonController.update);
router.delete("/people/:id", PersonController.delete);

module.exports = router;
