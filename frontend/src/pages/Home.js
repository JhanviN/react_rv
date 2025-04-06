import React from "react";
import { Link } from "react-router-dom";
// import "./Home.css"; // optional: for external styling

const Home = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <div className="home-container" style={styles.container}>
      <h1 style={styles.title}>🎶 Rhythmic Vibes</h1>
      <h2 style={styles.tagline}>Feel the Beat. Curate Your Vibe.</h2>

      {token && <h3 style={styles.welcome}>Welcome, {username}!</h3>}

      <p style={styles.description}>
        Create, manage, and explore music playlists tailored to your mood.
      </p>

      <nav style={styles.nav}>
        {token ? (
          <>
            <Link to="/my" style={styles.link}>🎧 My Playlists</Link>
            <Link to="/create-playlist" style={styles.link}>➕ Create Playlist</Link>
            <Link to="/public-playlists" style={styles.link}>🌐 Explore Public Playlists</Link>
          </>
        ) : (
          <>
            <Link to="/register" style={styles.link}>🔐 Register</Link>
            <Link to="/login" style={styles.link}>🔓 Login</Link>
          </>
        )}
      </nav>

      
      <footer style={styles.footer}>
        <p>&copy; 2025 Rhythmic Vibes. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    color: "#7b2cbf",
    marginBottom: "0.3rem",
  },
  tagline: {
    fontSize: "1.5rem",
    color: "#5a189a",
  },
  welcome: {
    color: "#3c096c",
    marginTop: "1rem",
  },
  description: {
    margin: "1.5rem 0",
    fontSize: "1.1rem",
    color: "#333",
  },
  nav: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
    backgroundColor: "#9d4edd",
    padding: "0.8rem 1.2rem",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
  },
  features: {
    textAlign: "left",
    maxWidth: "600px",
    margin: "2rem auto",
  },
  footer: {
    marginTop: "3rem",
    fontSize: "0.9rem",
    color: "#aaa",
  },
};

export default Home;
