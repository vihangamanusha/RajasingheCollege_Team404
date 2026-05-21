import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import NewsList from "./pages/NewsList";
import AddNews from "./pages/AddNews";
import FeedbackList from "./pages/FeedbackList";
import StudentRegister from "./pages/StudentRegister"; 
import Event from "./pages/Event";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import LiveStreamAdmin from "./pages/LiveStreamAdmin";
import { SportAchievements } from "./pages/SportAchievements";
import SportsList from "./pages/SportsList";


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
          <Route path="/admin/announcements"element={<AdminAnnouncements />}/>
          <Route path="livestream-admin" element={<LiveStreamAdmin />} />
          <Route path="sport-achievements/:sportName" element={<SportAchievements />} />
          <Route path="/SportsList" element={<SportsList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}