import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>

            {/* Login Page (no layout) */}
            <Route path="/login" element={<Login />} />

            {/* Admin pages (with sidebar layout) */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
            </Route>

        </Routes>
    );
}

export default App;