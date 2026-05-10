import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import NewsList from "./pages/NewsList";
import AddNews from "./pages/AddNews";
import FeedbackList from "./pages/FeedbackList";
import StudentRegister from "./pages/StudentRegister"; 
import Event from "./pages/Event";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          
          <Route index element={<Dashboard />} />
          <Route path="news" element={<NewsList />} />
          <Route path="add" element={<AddNews />} />
          <Route path="feedback" element={<FeedbackList />} />

      
          <Route path="student-register" element={<StudentRegister />} />
          <Route path="events" element={<Event />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}