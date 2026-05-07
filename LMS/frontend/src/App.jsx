import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>

            {/* default route */}
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
            </Route>

        </Routes>
    );
}

export default App;