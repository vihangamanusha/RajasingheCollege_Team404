import { theme } from "../../styles/theme";

function Topbar() {
  return (
    <div style={{
      height: "60px",
      background: theme.colors.secondary,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      fontWeight: "bold"
    }}>
      Rajasinghe Central College LMS
    </div>
  );
}

export default Topbar;