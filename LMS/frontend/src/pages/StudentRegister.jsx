import { useState } from "react";
import { FiUser, FiMail, FiLock, FiHash } from "react-icons/fi";
import "./StudentRegister.css";

export default function StudentRegister() {

    const [form, setForm] = useState({
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // Used to color the message box

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

        try {
            const res = await fetch("http://localhost:8080/admin/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    ...form,
                    role: "STUDENT"
                })
            });

            const data = await res.text();
            setMessage(data);

            // Basic check to determine if it was successful based on status
            if (res.ok) {
                setMessageType("success");
                // Optional: Clear form after success
                // setForm({ userId: "", username: "", email: "", password: "" });
            } else {
                setMessageType("error");
            }

        } catch (error) {
            setMessage("Failed to connect to the server.");
            setMessageType("error");
        }
    };

    return (
        <div className="register-container">

            <div className="page-header">
                <h1>Student Registration</h1>
                <p>Enter the details below to create a new student account in the system.</p>
            </div>

            <div className="form-card">
                <h2>Account Details</h2>

                <form onSubmit={handleSubmit}>

                    {/* USER ID */}
                    <div className="form-group">
                        <label>Student ID</label>
                        <div className="input-container">
                            <FiHash className="input-icon" />
                            <input
                                name="userId"
                                placeholder="Enter student ID number"
                                value={form.userId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* USERNAME */}
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-container">
                            <FiUser className="input-icon" />
                            <input
                                name="username"
                                placeholder="Enter unique username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-container">
                            <FiMail className="input-icon" />
                            <input
                                name="email"
                                type="email"
                                placeholder="student@example.com"
                                value={form.email}
                                onChange={handleChange}
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
                                name="password"
                                type="password"
                                placeholder="Enter secure password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Student Account
                    </button>
                </form>

                {/* STATUS MESSAGE */}
                {message && (
                    <div className={`message-box ${messageType}`}>
                        {message}
                    </div>
                )}

            </div>
        </div>
    );
}