import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { LanguageProvider } from "./contexts/LanguageContext";
import { router } from "./routes.jsx";
import AllStaff from "./pages/academic/AllStaff";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <RouterProvider router={router} />
  </LanguageProvider>
);
