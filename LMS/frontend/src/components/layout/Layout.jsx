import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { theme } from "../../styles/theme";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, background: theme.colors.background }}>
        <Topbar />

        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;