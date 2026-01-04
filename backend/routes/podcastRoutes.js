const express = require("express");
const router = express.Router();
const podcastController = require("../controllers/podcastController");

router.get("/", podcastController.getAllPodcast);
router.post("/", podcastController.createPodcast);

module.exports = router;
