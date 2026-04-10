import React from "react";

function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>Ruwanwella Rajasinhge Central College</h2>

      <nav>
        <ul style={styles.navList}>
          <li>Home</li>
          <li>About</li>
          <li>News</li>
          <li>Events</li>
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
  }
};

export default Header;