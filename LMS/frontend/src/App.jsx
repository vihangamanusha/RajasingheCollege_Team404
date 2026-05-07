import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>

            {/* DEFAULT ROUTE → go to login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* ADMIN (PROTECTED) */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
            </Route>

        </Routes>
    );
}

export default App;