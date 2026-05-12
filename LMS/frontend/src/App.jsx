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
// Importing the new Academic Analytics page
import AdminAcademicAnalytics from "./pages/AdminAcademicAnalytics";

// --> MANAGEMENT TABLES <--
import AdminStudentManagement from "./pages/AdminStudentManagement";
import AdminTeacherManagement from "./pages/AdminTeacherManagement";
import AdminTechOfficerManagement from "./pages/AdminTechOfficerManagement";

// =========================
// STUDENT ROLE PAGES
// =========================
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMarks from "./pages/student/StudentMarks";
import StudentMaterials from "./pages/student/StudentMaterials";
import StudentReport from "./pages/student/StudentReport";

// =========================
// LAYOUT & SECURITY
// =========================
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./Component/student/StudentLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (
        <Routes>
            {/* DEFAULT ROUTE: Send users to login */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* LOGIN PAGE */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* =========================
                ADMIN PANEL (PROTECTED)
            ========================= */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                {/* Default view is the Main Dashboard */}
                <Route index element={<Dashboard />} />

                {/* Main Menu for choosing user types */}
                <Route path="users" element={<AdminUsers />} />

                {/* Management Data Tables */}
                <Route path="students" element={<AdminStudentManagement />} />
                <Route path="teachers" element={<AdminTeacherManagement />} />
                <Route path="tech-officers" element={<AdminTechOfficerManagement />} />

                {/* New: Academic Reports & Performance Intelligence */}
                <Route path="analytics" element={<AdminAcademicAnalytics />} />

                {/* Registration Forms */}
                <Route path="users/student" element={<StudentRegister />} />
                <Route path="users/teacher" element={<TeacherRegister />} />
                <Route path="users/tech" element={<TechRegister />} />
            </Route>

            {/* =========================
                STUDENT PANEL (PROTECTED)
            ========================= */}
            <Route
                path="/student"
                element={
                    <ProtectedRoute>
                        <StudentLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard studentId="STU001" />} />
                <Route path="marks" element={<StudentMarks studentId="STU001" />} />
                <Route path="materials" element={<StudentMaterials />} />
                <Route path="report" element={<StudentReport studentId="STU001" />} />
            </Route>
        </Routes>
    );
}

export default App;