const express = require("express");
const router = express.Router();
const artikelController = require("../controllers/artikelController");

router.get("/", artikelController.getAllArtikel);
router.post("/", artikelController.createArtikel);

module.exports = router;
