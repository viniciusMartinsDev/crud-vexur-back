const express = require("express");

const CompanyController = require("../controller/CompanyController");

const router = express.Router();

router.get("/companies", CompanyController.index);
router.post("/companies", CompanyController.create);
router.put("/companies/:id", CompanyController.update);
router.delete("/companies/:id", CompanyController.delete);

module.exports = router;
