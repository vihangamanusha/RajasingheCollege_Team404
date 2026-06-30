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
import AdminAcademicAnalytics from "./pages/AdminAcademicAnalytics"; // NEW: Reporting & Analytics Import

// --> MANAGEMENT TABLES <--
import AdminStudentManagement from "./pages/AdminStudentManagement";
import AdminTeacherManagement from "./pages/AdminTeacherManagement";
import AdminTechOfficerManagement from "./pages/AdminTechOfficerManagement";

// =========================
// STUDENT ROLE DASHBOARDS
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
            {/* DEFAULT ROUTE: Redirect to Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* PUBLIC LOGIN PAGE */}
            <Route path="/login" element={<Login />} />

            {/* ============================================================
                ADMIN PANEL (PROTECTED)
            ============================================================ */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                {/* Default view when navigating to /admin */}
                <Route index element={<Dashboard />} />

                {/* USER MANAGEMENT MAIN MENU */}
                <Route path="users" element={<AdminUsers />} />

                {/* --> MANAGEMENT TABLES <-- */}
                <Route path="students" element={<AdminStudentManagement />} />
                <Route path="teachers" element={<AdminTeacherManagement />} />
                <Route path="tech-officers" element={<AdminTechOfficerManagement />} />

                {/* --> NEW: ACADEMIC ANALYTICS & REPORTS <-- */}
                <Route path="analytics" element={<AdminAcademicAnalytics />} />

                {/* --> REGISTRATION FORMS <-- */}
                <Route path="users/student" element={<StudentRegister />} />
                <Route path="users/teacher" element={<TeacherRegister />} />
                <Route path="users/tech" element={<TechRegister />} />
            </Route>

            {/* ============================================================
                STUDENT PANEL (PROTECTED)
            ============================================================ */}
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


            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<TeacherDashboard />} />
                <Route path="/TeacherAddMarks" element={<TeacherAddMarks />} />
                <Route path="/subjects" element={<TeacherSubject />} />
                <Route path="/classes" element={<TeacherClass />} />
                <Route path="/materials" element={<TeacherMaterialList />} />
                <Route path="/upload-material" element={<TeacherUploadMaterial />} />
                <Route path="/myclasses" element={<TeacherMyClasses />} />
                <Route path="/marks/:classId" element={<TeacherMarksPage />} />
                <Route path="/add-student" element={<TeacherAddStudentToClass />} />
                <Route path="/Assignment" element={<TeacherAssignmentList />} />
                <Route path="/create-assignment" element={<TeacherCreateAssignment />} />
            </Routes>
        </Routes>

    );
}

export default App;