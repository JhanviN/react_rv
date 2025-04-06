const express = require("express");
const { addSongToPlaylist } = require("../controllers/songController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:playlistId", protect, addSongToPlaylist);

module.exports = router;
