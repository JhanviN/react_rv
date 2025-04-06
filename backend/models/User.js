const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }], // User's playlists
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
