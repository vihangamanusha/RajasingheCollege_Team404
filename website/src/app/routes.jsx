import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academic from "./pages/Academic";
import News from "./pages/News";
import Sport from "./pages/Sport";
import LiveStream from "./pages/LiveStream";
import Contact from "./pages/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "academic", Component: Academic },
      { path: "news", Component: News },
      { path: "sport", Component: Sport },
      { path: "live-stream", Component: LiveStream },
      { path: "contact", Component: Contact }
    ]
  }
]);
export {
  router
};
