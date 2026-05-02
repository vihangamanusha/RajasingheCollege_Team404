import React from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Academic } from "./pages/Academic";
import { News } from "./pages/News";
import { Sports } from "./pages/Sports";
import { LiveStream } from "./pages/LiveStream";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "academic", element: <Academic /> },
      { path: "news", element: <News /> },
      { path: "sports", element: <Sports /> },
      { path: "live-stream", element: <LiveStream /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
