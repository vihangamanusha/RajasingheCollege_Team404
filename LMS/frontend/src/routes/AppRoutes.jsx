import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentMarks from "../pages/student/StudentMarks";
import StudentReport from "../pages/student/StudentReport";
import StudentMaterials from "../pages/student/StudentMaterials";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/marks" element={<StudentMarks />} />
        <Route path="/report" element={<StudentReport />} />
        <Route path="/materials" element={<StudentMaterials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
