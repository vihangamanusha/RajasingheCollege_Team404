import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { FiUser, FiLock } from "react-icons/fi"; // Importing the icons
import "./Login.css"; // Importing your new styles
import schoolLogo from "../assets/school-logo.jpeg"; // Importing school logo

export default function Login() {

    // =========================
    // STATE VARIABLES
    // =========================
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // Added to handle CSS colors without emojis

    const navigate = useNavigate();

    // =========================
    // LOGIN FUNCTION
    // =========================
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            // =========================
            // CALL LOGIN API
            // =========================
            const res = await loginUser({
                username,
                password
            });

            console.log("LOGIN RESPONSE:", res.data);

            // =========================
            // SAVE TOKEN, ROLE & SUBROLE
            // =========================
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);
            if (res.data.subRole) {
                localStorage.setItem("subRole", res.data.subRole);
            } else {
                localStorage.removeItem("subRole");
            }

            setMessage("Login Successful");
            setMessageType("success");

            // =========================
            // GET USER ROLE & SUBROLE
            // =========================
            const role = res.data.role?.toUpperCase();
            const subRole = res.data.subRole;
            console.log("USER ROLE:", role, "SUBROLE:", subRole);

            // =========================
            // ROLE BASED REDIRECT
            // =========================
            if (role === "ADMIN" || role === "ROLE_ADMIN") {
                navigate("/admin");
            } else if (role === "TEACHER" || role === "ROLE_TEACHER") {
                if (subRole && subRole.startsWith("Section Head")) {
                    navigate("/section-head");
                } else if (subRole && subRole === "Deputy Principal (Development)") {
                    navigate("/deputy-principal-dev");
                } else if (subRole && (subRole.startsWith("Deputy Principal") || subRole.startsWith("Vice Principal"))) {
                    navigate("/deputy-principal");
                } else {
                    navigate("/teacher");
                }
            } else if (role === "STUDENT" || role === "ROLE_STUDENT") {
                navigate("/student");
            } else if (role === "TECHNICAL_OFFICER" || role === "ROLE_TECHNICAL_OFFICER") {
                navigate("/");
            } else {
                setMessage("Unknown role: " + role);
                setMessageType("error");
            }

        } catch (error) {
            console.log(error);

            // =========================
            // ERROR HANDLING
            // =========================
            setMessageType("error");

            if (error.response?.status === 401) {
                setMessage("Invalid username or password");
            } else {
                setMessage("Server error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">

                {/* HEADER & LOGO */}
                <div className="login-header">
                    <img
                        src={schoolLogo}
                        alt="Rajasinghe Central College"
                        className="login-logo"
                    />
                    <h2>Rajasinghe LMS</h2>
                    <p>Learning Management System</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleLogin}>

                    {/* USERNAME */}
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-container">
                            <FiUser className="input-icon" />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-container">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* MESSAGE */}
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                {/* FOOTER */}
                <div className="login-footer">
                    <a href="#forgot">Forgot password? Contact your administrator</a>
                </div>

            </div>
        </div>
    );
}