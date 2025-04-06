const express = require("express");
const { createPlaylist, getMyPlaylists, getPublicPlaylists, updatePlaylist, deletePlaylist, } = require("../controllers/playlistController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect , createPlaylist);
router.get("/my", protect, getMyPlaylists);
router.get("/public", protect,getPublicPlaylists);
router.put("/:id", protect, updatePlaylist);
router.delete("/:id", protect, deletePlaylist);

module.exports = router;

