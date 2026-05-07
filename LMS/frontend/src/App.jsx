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

// =========================
// OTHER ROLE DASHBOARDS
// (Created by your friend)
// =========================
// import TeacherDashboard from "./pages/TeacherDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TechDashboard from "./pages/TechDashboard";

// =========================
// LAYOUT
// =========================
import AdminLayout from "./layouts/AdminLayout";

// =========================
// PROTECTED ROUTE
// =========================
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (

        <Routes>

            {/* =========================
                DEFAULT ROUTE
            ========================= */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* =========================
                LOGIN PAGE
            ========================= */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* =========================
                ADMIN PANEL
            ========================= */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

                {/* ADMIN DASHBOARD */}
                <Route
                    index
                    element={<Dashboard />}
                />

                {/* USER MANAGEMENT */}
                <Route
                    path="users"
                    element={<AdminUsers />}
                />

                {/* REGISTER STUDENT */}
                <Route
                    path="users/student"
                    element={<StudentRegister />}
                />

                {/* REGISTER TEACHER */}
                <Route
                    path="users/teacher"
                    element={<TeacherRegister />}
                />

                {/* REGISTER TECHNICAL OFFICER */}
                <Route
                    path="users/tech"
                    element={<TechRegister />}
                />

            </Route>

            {/*/!* =========================*/}
            {/*    TEACHER DASHBOARD*/}
            {/*========================= *!/*/}
            {/*<Route*/}
            {/*    path="/teacher"*/}
            {/*    element={*/}
            {/*        <ProtectedRoute>*/}
            {/*            <TeacherDashboard />*/}
            {/*        </ProtectedRoute>*/}
            {/*    }*/}
            {/*/>*/}

            {/*/!* =========================*/}
            {/*    STUDENT DASHBOARD*/}
            {/*========================= *!/*/}
            {/*<Route*/}
            {/*    path="/student"*/}
            {/*    element={*/}
            {/*        <ProtectedRoute>*/}
            {/*            <StudentDashboard />*/}
            {/*        </ProtectedRoute>*/}
            {/*    }*/}
            {/*/>*/}

            {/*/!* =========================*/}
            {/*    TECHNICAL OFFICER DASHBOARD*/}
            {/*========================= *!/*/}
            {/*<Route*/}
            {/*    path="/tech"*/}
            {/*    element={*/}
            {/*        <ProtectedRoute>*/}
            {/*            <TechDashboard />*/}
            {/*        </ProtectedRoute>*/}
            {/*    }*/}
            {/*/>*/}

        </Routes>
    );
}

export default App;