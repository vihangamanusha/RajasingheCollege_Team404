import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import "./AdminUsers.css";

export default function AdminUsers() {

    const navigate = useNavigate();

    return (
        <div className="users-container">

            <div className="page-header">
                <h1>User Management</h1>
                <p>Select a user type below to start the registration process.</p>
            </div>

            {/* =========================
                SELECTION CARDS
            ========================= */}
            <div className="user-type-grid">

                {/* ADD STUDENT CARD */}
                <div
                    className="user-type-card"
                    onClick={() => navigate("/admin/users/student")}
                >
                    <FaUserGraduate className="user-type-icon icon-blue" />
                    <h3>Add Student</h3>
                    <p>Register a new student and configure their class details.</p>
                </div>

                {/* ADD TEACHER CARD */}
                <div
                    className="user-type-card"
                    onClick={() => navigate("/admin/users/teacher")}
                >
                    <FaChalkboardTeacher className="user-type-icon icon-yellow" />
                    <h3>Add Teacher</h3>
                    <p>Register a new teacher and assign their subjects.</p>
                </div>

                {/* ADD TECH OFFICER CARD */}
                <div
                    className="user-type-card"
                    onClick={() => navigate("/admin/users/tech")}
                >
                    <FiSettings className="user-type-icon icon-green" />
                    <h3>Add Technical Officer</h3>
                    <p>Register a new system administrator or technical staff member.</p>
                </div>

            </div>

        </div>
    );
}