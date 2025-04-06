const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

exports.addSongToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { title, artist, url } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    // Create the new song
    const song = new Song({ title, artist, url, playlists: [playlistId] });
    await song.save();

    // Update linked list
    const songs = playlist.songs;
    const lastSongNode = songs[songs.length - 1];

    const newSongNode = {
      song: song._id,
      prev: lastSongNode ? lastSongNode.song : null,
      next: null,
    };

    if (lastSongNode) {
      lastSongNode.next = song._id;
    }

    songs.push(newSongNode);

    await playlist.save();

    res.status(201).json({ message: "Song added to playlist", song });
  } catch (error) {
    console.error("Add Song Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
