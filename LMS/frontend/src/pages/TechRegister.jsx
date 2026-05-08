import { useState } from "react";
import { FiUser, FiMail, FiLock, FiHash } from "react-icons/fi";
import "./TechRegister.css";

export default function TechRegister() {

    // =========================
    // FORM STATE
    // =========================
    const [form, setForm] = useState({
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    // MESSAGE STATE
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // Used to style success/error alerts

    // =========================
    // HANDLE INPUT CHANGES
    // =========================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // =========================
    // SUBMIT FORM
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

        try {
            // =========================
            // SEND REQUEST TO BACKEND
            // =========================
            const res = await fetch(
                "http://localhost:8080/admin/users/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // SEND JWT TOKEN
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        userId: form.userId,
                        username: form.username,
                        email: form.email,
                        password: form.password,
                        // IMPORTANT
                        role: "ROLE_TECHNICAL_OFFICER"
                    })
                }
            );

            const data = await res.text();
            setMessage(data);

            if (res.ok) {
                setMessageType("success");
            } else {
                setMessageType("error");
            }

        } catch (error) {
            console.log(error);
            setMessage("Technical Officer registration failed");
            setMessageType("error");
        }
    };

    return (
        <div className="register-container">

            <div className="page-header">
                <h1>Technical Officer Registration</h1>
                <p>Register a new system administrator or technical support member.</p>
            </div>

            <div className="form-card">
                <h2>Account Details</h2>

                <form onSubmit={handleSubmit}>

                    {/* USER ID */}
                    <div className="form-group">
                        <label>Officer ID</label>
                        <div className="input-container">
                            <FiHash className="input-icon" />
                            <input
                                name="userId"
                                placeholder="Enter officer ID number"
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
                                placeholder="tech@example.com"
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

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="submit-btn green-btn">
                        Create Tech User
                    </button>

                </form>

                {/* MESSAGE */}
                {message && (
                    <div className={`message-box ${messageType}`}>
                        {message}
                    </div>
                )}

            </div>
        </div>
    );
}