import { useState } from "react";
import {
    FiUser,
    FiMail,
    FiLock,
    FiHash,
    FiBriefcase,
    FiMapPin,
    FiPhone,
    FiArrowRight,
    FiArrowLeft
} from "react-icons/fi";

import "./StudentRegister.css";

export default function TechRegister() {

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        fullName: "",
        position: "",
        assignedArea: "",
        contactNumber: "",
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // =========================
    // DROPDOWN OPTIONS
    // =========================
    const positionList = ["Lab Assistant 01", "Lab Assistant 02"];
    const areaList = ["Computer Lab"];

    // =========================
    // VALIDATION (LIKE STUDENT FORM STYLE)
    // =========================
    const validateStep = () => {

        // STEP 1 VALIDATION
        if (step === 1) {

            if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
                setMessage("Full Name can only contain letters and spaces.");
                setMessageType("error");
                return false;
            }

            if (!form.position) {
                setMessage("Please select a Job Position.");
                setMessageType("error");
                return false;
            }

            if (!form.assignedArea) {
                setMessage("Please select Assigned Area.");
                setMessageType("error");
                return false;
            }

            if (!/^\d{10}$/.test(form.contactNumber)) {
                setMessage("Contact Number must be exactly 10 digits.");
                setMessageType("error");
                return false;
            }
        }

        // STEP 2 VALIDATION
        if (step === 2) {

            const alphaNum = /^[a-zA-Z0-9]+$/;

            if (!alphaNum.test(form.userId)) {
                setMessage("User ID must be alphanumeric only.");
                setMessageType("error");
                return false;
            }

            if (!alphaNum.test(form.username)) {
                setMessage("Username must be alphanumeric only.");
                setMessageType("error");
                return false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                setMessage("Invalid email format.");
                setMessageType("error");
                return false;
            }

            if (form.password.length < 8) {
                setMessage("Password must be at least 8 characters.");
                setMessageType("error");
                return false;
            }
        }

        return true;
    };

    // =========================
    // HANDLE CHANGE
    // =========================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMessage("");
    };

    // =========================
    // NEXT STEP
    // =========================
    const handleNext = () => {
        if (validateStep()) {
            setStep(2);
            setMessage("");
        }
    };

    // =========================
    // BACK STEP
    // =========================
    const handleBack = () => {
        setStep(1);
        setMessage("");
    };

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) return;

        try {
            const res = await fetch("http://localhost:8080/admin/users/tech/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    ...form,
                    role: "ROLE_TECHNICAL_OFFICER"
                })
            });

            const data = await res.text();

            if (res.ok) {
                setMessage("Technical Officer registered successfully! ✅");
                setMessageType("success");

                setForm({
                    fullName: "",
                    position: "",
                    assignedArea: "",
                    contactNumber: "",
                    userId: "",
                    username: "",
                    email: "",
                    password: ""
                });

                setStep(1);
            } else {
                setMessage(data);
                setMessageType("error");
            }

        } catch (err) {
            setMessage("Server connection failed.");
            setMessageType("error");
        }
    };

    return (
        <div className="register-container">

            <div className="page-header">
                <h1>Technical Officer Registration</h1>
                <p>Create system account for technical staff</p>
            </div>

            <div className="form-card">

                <div className="step-indicator">
                    {step === 1 ? "Step 1: Professional Info" : "Step 2: Account Setup"}
                </div>

                <form onSubmit={handleSubmit}>

                    {/* ================= STEP 1 ================= */}
                    {step === 1 && (
                        <div className="wizard-step">

                            {/* FULL NAME */}
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-container">
                                    <FiUser className="input-icon" />
                                    <input
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* POSITION */}
                            <div className="form-group">
                                <label>Job Position</label>
                                <div className="input-container">
                                    <FiBriefcase className="input-icon" />
                                    <select
                                        name="position"
                                        value={form.position}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Position</option>
                                        {positionList.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* AREA */}
                            <div className="form-group">
                                <label>Assigned Area</label>
                                <div className="input-container">
                                    <FiMapPin className="input-icon" />
                                    <select
                                        name="assignedArea"
                                        value={form.assignedArea}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Area</option>
                                        {areaList.map((a) => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* CONTACT */}
                            <div className="form-group">
                                <label>Contact Number</label>
                                <div className="input-container">
                                    <FiPhone className="input-icon" />
                                    <input
                                        name="contactNumber"
                                        value={form.contactNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button type="button" className="submit-btn" onClick={handleNext}>
                                Next <FiArrowRight />
                            </button>

                        </div>
                    )}

                    {/* ================= STEP 2 ================= */}
                    {step === 2 && (
                        <div className="wizard-step">

                            <div className="form-group">
                                <label>User ID</label>
                                <div className="input-container">
                                    <FiHash className="input-icon" />
                                    <input name="userId" value={form.userId} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <div className="input-container">
                                    <FiUser className="input-icon" />
                                    <input name="username" value={form.username} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <div className="input-container">
                                    <FiMail className="input-icon" />
                                    <input name="email" value={form.email} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-container">
                                    <FiLock className="input-icon" />
                                    <input type="password" name="password" value={form.password} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="button-group">
                                <button type="button" className="back-btn" onClick={handleBack}>
                                    <FiArrowLeft /> Back
                                </button>

                                <button type="submit" className="submit-btn">
                                    Register
                                </button>
                            </div>

                        </div>
                    )}

                </form>

                {message && (
                    <div className={`message-box ${messageType}`}>
                        {message}
                    </div>
                )}

            </div>
        </div>
    );
}