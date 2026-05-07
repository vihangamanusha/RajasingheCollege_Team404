import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import NewsList from "./pages/NewsList";
import AddNews from "./pages/AddNews";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="news" element={<NewsList />} />
          <Route path="add" element={<AddNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}