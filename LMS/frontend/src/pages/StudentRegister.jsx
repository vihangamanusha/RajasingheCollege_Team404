import { useState } from "react";

export default function StudentRegister() {

    const [message, setMessage] = useState("");

    const testAPI = async () => {
        try {

            const res = await fetch("http://localhost:8080/admin/users/all", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            const data = await res.json();

            console.log("RESPONSE:", data);

            setMessage("Backend connected successfully ✅");

        } catch (error) {
            console.log(error);
            setMessage("Backend connection failed ❌");
        }
    };

    return (
        <div>

            <h1>Test Backend Connection</h1>

            <button onClick={testAPI}>
                Click to Test
            </button>

            <p>{message}</p>

        </div>
    );
}