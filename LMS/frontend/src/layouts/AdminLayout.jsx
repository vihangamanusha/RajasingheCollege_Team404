import { useNavigate, Outlet } from "react-router-dom";

export default function AdminLayout() {

    const navigate = useNavigate();

    // =========================
    // LOGOUT FUNCTION
    // =========================
    const handleLogout = () => {
        // remove token from browser
        localStorage.removeItem("token");

        // redirect to login page
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* =========================
                SIDEBAR
            ========================= */}
            <div
                style={{
                    width: "220px",
                    backgroundColor: "#1e293b",
                    color: "white",
                    padding: "20px"
                }}
            >
                <h2>LMS Admin</h2>

                <hr />

                <p>Dashboard</p>
                <p>Users</p>
                <p>Courses</p>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    style={{ marginTop: "20px", padding: "8px" }}
                >
                    Logout
                </button>
            </div>

            {/* =========================
                MAIN CONTENT AREA
            ========================= */}
            <div
                style={{
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "#f1f5f9"
                }}
            >
                {/* IMPORTANT: This renders child pages */}
                <Outlet />
            </div>

        </div>
    );
}