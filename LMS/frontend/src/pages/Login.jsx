import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {

    // =========================
    // STATE VARIABLES
    // =========================
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // =========================
    // LOGIN FUNCTION
    // =========================
    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

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
            // SAVE TOKEN
            // =========================
            localStorage.setItem("token", res.data.token);

            // =========================
            // SAVE ROLE
            // =========================
            localStorage.setItem("role", res.data.role);

            setMessage("Login Successful ✅");

            // =========================
            // GET USER ROLE
            // =========================
            const role = res.data.role?.toUpperCase();

            console.log("USER ROLE:", role);

            // =========================
            // ROLE BASED REDIRECT
            // =========================
            if (
                role === "ADMIN" ||
                role === "ROLE_ADMIN"
            ) {

                navigate("/admin");

            }

            else if (
                role === "TEACHER" ||
                role === "ROLE_TEACHER"
            ) {

                navigate("/teacher");

            }

            else if (
                role === "STUDENT" ||
                role === "ROLE_STUDENT"
            ) {

                navigate("/student");

            }

            else if (
                role === "TECHNICAL_OFFICER" ||
                role === "ROLE_TECHNICAL_OFFICER"
            ) {

                navigate("/tech");

            }

            else {

                setMessage("Unknown role: " + role);
            }

        } catch (error) {

            console.log(error);

            // =========================
            // ERROR HANDLING
            // =========================
            if (error.response?.status === 401) {

                setMessage("Invalid username or password ❌");

            } else {

                setMessage("Server error ❌");
            }

        } finally {

            setLoading(false);
        }
    };

    return (

        <div style={{ maxWidth: "300px", margin: "100px auto" }}>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                {/* USERNAME */}
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                {/* LOGIN BUTTON */}
                <button disabled={loading}>

                    {loading ? "Logging in..." : "Login"}

                </button>

            </form>

            {/* MESSAGE */}
            <p>{message}</p>

        </div>
    );
}