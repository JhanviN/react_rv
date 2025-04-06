const Playlist = require("../models/Playlist");

exports.createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = new Playlist({
      name,
      description,
      isPublic,
      user: req.user.id,
      username: req.user.username,
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    console.error("Create Playlist Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });
    res.json(playlists);
  } catch (error) {
    console.error("Get User Playlists Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPublicPlaylists = async (req, res) => {
    try {
      const playlists = await Playlist.find({ isPublic: true }).populate("user", "username");
      res.json(playlists);
    } catch (error) {
      console.error("Get Public Playlists Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.updatePlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    playlist.name = name || playlist.name;
    playlist.description = description !== undefined ? description : playlist.description;
    playlist.isPublic = isPublic !== undefined ? isPublic : playlist.isPublic;

    await playlist.save();
    res.json(playlist);
  } catch (error) {
    console.error("Update Playlist Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await playlist.remove();
    res.json({ message: "Playlist deleted" });
  } catch (error) {
    console.error("Delete Playlist Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
