import { useState } from "react";
import API from "../services/api";
import { FiUser, FiMail, FiLock, FiHash, FiBriefcase } from "react-icons/fi";
import "./TeacherRegister.css";

export default function TeacherRegister() {

    // =========================
    // FORM STATE
    // =========================
    const [formData, setFormData] = useState({
        userId: "",
        username: "",
        password: "",
        email: "",
        subRole: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // For colored alerts

    // =========================
    // HANDLE INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        setFormData({
            ...formData,
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
            // SEND DATA TO BACKEND
            // =========================
            const res = await API.post("/admin/users/create", {
                userId: formData.userId,
                username: formData.username,
                password: formData.password,
                email: formData.email,
                role: "ROLE_TEACHER",
                subRole: formData.subRole
            });

            // If successful
            setMessage(res.data || "Teacher registered successfully!");
            setMessageType("success");

        } catch (error) {
            console.log(error);
            setMessage("Teacher registration failed.");
            setMessageType("error");
        }
    };

    return (
        <div className="register-container">

            <div className="page-header">
                <h1>Teacher Registration</h1>
                <p>Enter the details below to register a new teaching staff member.</p>
            </div>

            <div className="form-card">
                <h2>Account Details</h2>

                <form onSubmit={handleSubmit}>

                    {/* USER ID */}
                    <div className="form-group">
                        <label>Teacher ID</label>
                        <div className="input-container">
                            <FiHash className="input-icon" />
                            <input
                                type="text"
                                name="userId"
                                placeholder="Enter teacher ID number"
                                value={formData.userId}
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
                                type="text"
                                name="username"
                                placeholder="Enter unique username"
                                value={formData.username}
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
                                type="email"
                                name="email"
                                placeholder="teacher@example.com"
                                value={formData.email}
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
                                type="password"
                                name="password"
                                placeholder="Enter secure password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* SUB ROLE */}
                    <div className="form-group">
                        <label>Teaching Role</label>
                        <div className="input-container">
                            <FiBriefcase className="input-icon" />
                            <select
                                name="subRole"
                                value={formData.subRole}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Sub Role</option>
                                <option value="SECTION_HEAD">Section Head</option>
                                <option value="SUBJECT_TEACHER">Subject Teacher</option>
                                <option value="CLASS_TEACHER">Class Teacher</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Register Teacher
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