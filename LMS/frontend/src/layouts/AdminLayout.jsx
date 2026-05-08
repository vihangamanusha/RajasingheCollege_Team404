import { useNavigate, Outlet } from "react-router-dom";

export default function AdminLayout() {

    const navigate = useNavigate();

    // =========================
    // LOGOUT FUNCTION
    // =========================
    const handleLogout = () => {
        // remove JWT token from browser storage
        localStorage.removeItem("token");

        // redirect to login page
        navigate("/login");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* =========================
                SIDEBAR MENU
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

                {/* =========================
                    NAVIGATION LINKS
                ========================= */}

                {/* Dashboard */}
                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/admin")}
                >
                    Dashboard
                </p>

                {/* Users (STEP 5) */}
                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/admin/users")}
                >
                    Users
                </p>

                {/* Courses (future step) */}
                <p>Courses</p>

                <hr />

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "20px",
                        padding: "8px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>

            {/* =========================
                MAIN CONTENT AREA
                (renders child routes)
            ========================= */}
            <div
                style={{
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "#f1f5f9"
                }}
            >
                {/* This is where Dashboard / Users page will load */}
                <Outlet />
            </div>

        </div>
    );
}