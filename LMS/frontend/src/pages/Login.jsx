import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {

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
            // call backend
            const res = await loginUser({ username, password });

            // save token
            localStorage.setItem("token", res.data.token);

            setMessage("Login Successful ✅");

            // redirect to admin panel
            navigate("/admin");

        } catch (error) {

            // handle backend error response
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

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

            <p>{message}</p>

        </div>
    );
}