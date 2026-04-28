import React from "react";
import logo from "../assets/rcc.png";

function Header() {
  return (
    <header style={styles.header}>
      
      {/* LEFT SIDE (Logo + Name) */}
      <div style={styles.left}>
        <img src={logo} alt="School Logo" style={styles.image} />
        <h1 style={styles.logo}>
          Rajasinhge Central College <br />
          Ruwanwella
        </h1>
      </div>

      {/* RIGHT SIDE (Navigation) */}
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Home</li>
          <li style={styles.navItem}>About</li>
          <li style={styles.navItem}>News</li>
          <li style={styles.navItem}>Sports</li>
          <li style={styles.navItem}>Live Stream</li>
          <li style={styles.navItem}>Contact</li>
        </ul>
      </nav>

    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#002147",
    color: "white",
    padding: "10px 30px"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  logo: {
    margin: 0,
    fontSize: "18px",   // ✅ fixed
    lineHeight: "1.2",
    fontFamily: "Arial, sans-serif"
  },

  navList: {
    listStyle: "none",
    display: "flex",
    gap: "25px",        // ✅ better spacing
    margin: 0,
    padding: 0,
    alignItems: "center"
  },

  navItem: {
    cursor: "pointer",
    fontSize: "16px"
  },

  image: {
    width: "60px",      // ✅ reduced size
    height: "60px",
    objectFit: "cover"
  }
};

export default Header;