import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {

    // ---------------------------
    // State variables
    // ---------------------------
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // ---------------------------
    // STEP 2: AUTO LOGIN CHECK
    // If token exists → go admin page directly
    // ---------------------------
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/admin");
        }
    }, []);

    // ---------------------------
    // LOGIN FUNCTION
    // ---------------------------
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            // Call backend login API
            const res = await loginUser({ username, password });

            // Save JWT token in browser storage
            localStorage.setItem("token", res.data.token);

            setMessage("Login Successful ✅");

            // Redirect to admin dashboard
            navigate("/admin");

        } catch (error) {
            console.log("LOGIN ERROR:", error);

            setMessage("Login Failed ❌");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------
    // UI SECTION
    // ---------------------------
    return (
        <div style={{ maxWidth: "300px", margin: "auto", marginTop: "100px" }}>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                {/* Username input */}
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />

                {/* Password input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                {/* Submit button */}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

            {/* Status message */}
            <p>{message}</p>

        </div>
    );
}