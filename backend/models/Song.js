const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String },
    url: String,
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
});

module.exports = mongoose.model("Song", SongSchema);
