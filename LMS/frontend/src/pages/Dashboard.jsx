import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {

    const [username, setUsername] = useState("");

    useEffect(() => {

        // get token from localStorage
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // decode JWT token
                const decoded = jwtDecode(token);

                // only extract username (sub = subject in JWT)
                setUsername(decoded.sub);

            } catch (error) {
                console.log("Invalid token");
            }
        }

    }, []);

    return (
        <div>

            <h1>Dashboard</h1>

            <p>Welcome to LMS System 🚀</p>

            <hr />

            {/* ONLY USERNAME */}
            <h3>
                Welcome, {username || "Guest"}
            </h3>

        </div>
    );
}