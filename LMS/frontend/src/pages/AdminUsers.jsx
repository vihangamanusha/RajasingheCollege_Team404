import { useNavigate } from "react-router-dom";

export default function AdminUsers() {

    const navigate = useNavigate();

    return (
        <div>

            <h1>User Management</h1>
            <p>Select user type to register:</p>

            {/* =========================
                BUTTONS MENU
            ========================= */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

                <button
                    onClick={() => navigate("/admin/users/student")}
                    style={{ padding: "15px" }}
                >
                    👨‍🎓 Add Student
                </button>

                <button
                    onClick={() => navigate("/admin/users/teacher")}
                    style={{ padding: "15px" }}
                >
                    👨‍🏫 Add Teacher
                </button>

                <button
                    onClick={() => navigate("/admin/users/tech")}
                    style={{ padding: "15px" }}
                >
                    🛠 Add Technical Officer
                </button>

            </div>

        </div>
    );
}