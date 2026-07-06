import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import { usePageTitle } from "../hooks/usePageTitle";

export function RootLayout() {
  useScrollRestoration();
  usePageTitle();

  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
