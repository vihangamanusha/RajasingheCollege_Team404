import { Routes, Route, Navigate } from "react-router-dom";

// =========================
// LOGIN PAGE
// =========================
import Login from "./pages/Login";

// =========================
// ADMIN PAGES
// =========================
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/AdminUsers";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import TechRegister from "./pages/TechRegister";
import AdminStudentManagement from "./pages/AdminStudentManagement";
import AdminTeacherManagement from "./pages/AdminTeacherManagement";
import AdminTechOfficerManagement from "./pages/AdminTechOfficerManagement";
import ManageUsers from "./pages/ManageUsers";
import AdminClassManagement from "./pages/AdminClassManagement";

// =========================
// STUDENT PAGES
// =========================
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMarks from "./pages/student/StudentMarks";
import StudentMaterials from "./pages/student/StudentMaterials";
import StudentReport from "./pages/student/StudentReport";
import MySubjects from "./pages/student/MySubjects";

// =========================
// TEACHER PAGES
// =========================
import TeacherDashboard from "./pages/TeacherDashboard";

// =========================
// LAYOUTS
// =========================
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./Component/student/StudentLayout"; // ✅ Fixed: lowercase 'components'

// =========================
// PROTECTED ROUTE
// =========================
import ProtectedRoute from "./routes/ProtectedRoute";

// ─────────────────────────────────────────────
// Get the logged-in student's ID from storage.
// Replace this with your actual auth context/token decode
// if you have a login system that sets it.
// ─────────────────────────────────────────────
const studentId = localStorage.getItem("studentId") || "";

function App() {
  return (
    <Routes>
      {/* DEFAULT ROUTE */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* ADMIN PANEL */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/student" element={<StudentRegister />} />
        <Route path="users/teacher" element={<TeacherRegister />} />
        <Route path="users/tech" element={<TechRegister />} />
        <Route path="students" element={<AdminStudentManagement />} />
        <Route path="teachers" element={<AdminTeacherManagement />} />
        <Route path="tech-officers" element={<AdminTechOfficerManagement />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="classes" element={<AdminClassManagement />} />
      </Route>

      {/* TEACHER PANEL */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* STUDENT PANEL */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ✅ All routes are relative (no leading /student/) */}
        <Route
          path="dashboard"
          element={<StudentDashboard studentId={studentId} />}
        />
        <Route path="marks" element={<StudentMarks studentId={studentId} />} />
        <Route path="subjects" element={<MySubjects studentId={studentId} />} />
        <Route path="materials" element={<StudentMaterials />} />
        <Route
          path="report"
          element={<StudentReport studentId={studentId} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
