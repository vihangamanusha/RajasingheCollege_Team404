import { useEffect, useState } from "react";

export default function Dashboard() {

    const [token, setToken] = useState("");

    // runs when page loads
    useEffect(() => {

        // get token from browser storage
        const savedToken = localStorage.getItem("token");

        console.log("TOKEN FROM STORAGE:", savedToken);

        if (savedToken) {
            setToken(savedToken);
        }

    }, []);

    return (
        <div>

            <h1>Dashboard</h1>
            <p>Welcome to LMS System 🚀</p>

            <hr />

            {/* show JWT token */}
            <h3>Your Token:</h3>

            <p style={{ wordBreak: "break-word" }}>
                {token || "No token found"}
            </p>

        </div>
    );
}