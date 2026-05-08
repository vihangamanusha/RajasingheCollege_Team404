import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import AddMarks from "./Component/TeacherAddMarks";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
            <Route path="/TeacherAddMarks" element={<AddMarks />} />
        </Routes>
    );
}

export default App;