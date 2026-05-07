import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await loginUser({ username, password });

            console.log("LOGIN RESPONSE:", res.data);

            // save token
            localStorage.setItem("token", res.data.token);

            setMessage("Login Successful ✅");

        } catch (error) {
            console.log("LOGIN ERROR:", error.response?.data || error.message);

            setMessage("Login Failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", marginTop: "100px" }}>
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

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}