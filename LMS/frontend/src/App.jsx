import { Routes, Route, Navigate } from "react-router-dom";

// =========================
// PAGES
// =========================
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/AdminUsers";

// 👉 NEW PAGES (we will create next step)
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import TechRegister from "./pages/TechRegister";

// =========================
// LAYOUT
// =========================
import AdminLayout from "./layouts/AdminLayout";

// =========================
// ROUTE PROTECTION
// =========================
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>

            {/* =========================
                DEFAULT ROUTE
            ========================= */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* =========================
                LOGIN PAGE
            ========================= */}
            <Route path="/login" element={<Login />} />

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

                {/* Dashboard */}
                <Route index element={<Dashboard />} />

                {/* =========================
                    USER MANAGEMENT MENU
                ========================= */}
                <Route path="users" element={<AdminUsers />} />

                {/* =========================
                    USER REGISTRATION PAGES
                ========================= */}
                <Route path="users/student" element={<StudentRegister />} />
                <Route path="users/teacher" element={<TeacherRegister />} />
                <Route path="users/tech" element={<TechRegister />} />

            </Route>

        </Routes>
    );
}

export default App;