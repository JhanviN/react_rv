const mongoose = require("mongoose");

  
const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the playlist
    songs: [
        {
          song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
          next: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
          prev: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
        },
      ],
    createdAt: { type: Date, default: Date.now },
    username: {type: String,  required: true},
    isPublic: { type: Boolean, default: false},
    
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
