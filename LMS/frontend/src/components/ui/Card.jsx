import { theme } from "../../styles/theme";

function Card({ children }) {
  return (
    <div style={{
      background: theme.colors.card,
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    }}>
      {children}
    </div>
  );
}

export default Card;