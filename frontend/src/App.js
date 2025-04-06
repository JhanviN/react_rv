import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlaylist from "./pages/Playlist";
import MyPlaylists from "./pages/MyPlaylists";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewPublicPlaylists from "./pages/ViewPublicPlaylists";
import JamendoPlayer from "./pages/JamendoPlayer"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my" element={<MyPlaylists />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/public-playlists" element={<ViewPublicPlaylists />} />
        <Route path="/jamendo" element={<JamendoPlayer />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
