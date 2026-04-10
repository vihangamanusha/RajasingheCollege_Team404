import React from "react";
import logo from "../assets/rcc.png";

function Header() {
  return (
    <header style={styles.header}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} alt="School Logo" style={styles.image} />
        <h1 style={styles.logo}>
          Ruwanwella Rajasinhge Central College
        </h1>
      </div>

      <nav>
        <ul style={styles.navList}>
          <li>Home</li>
          <li>About</li>
          <li>News</li>
          <li>Sports</li>
          <li>Live Stream</li>
          <li>Contact</li>
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
    padding: "10px 20px"
  },
  logo: {
    margin: 0,
    fontSize: "18px"
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0
  },
  image: {
    width: "50px",
    height: "50px"
  }
};

export default Header;