import { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ username, password });

            console.log(res.data);

            localStorage.setItem("token", res.data.token);

            setMessage("Login Successful ✅");

        } catch (error) {
            console.log(error);
            setMessage("Login Failed ❌");
        }
    };

    return (
        <div>
            <h2>LMS Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Login;