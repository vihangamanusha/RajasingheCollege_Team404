import { useState } from "react";
// Added Arrow icons for the Next and Back buttons
import { FiUser, FiMail, FiLock, FiHash, FiCalendar, FiMapPin, FiBookOpen, FiPhone, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import "./StudentRegister.css";

export default function StudentRegister() {

    // =========================
    // STATE VARIABLES
    // =========================
    // Track which step of the form we are currently on
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        // Profile Fields (Step 1)
        fullName: "",
        dateOfBirth: "",
        address: "",
        contactNumber: "",
        medium: "",

        // Auth Fields (Step 2)
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // =========================
    // VALIDATION LOGIC
    // =========================
    // Ensure no field is empty before allowing the user to click Next
    const isStep1Valid =
        form.fullName.trim() !== "" &&
        form.dateOfBirth.trim() !== "" &&
        form.address.trim() !== "" &&
        form.contactNumber.trim() !== "" &&
        form.medium.trim() !== "";

    // Ensure no auth field is empty before allowing the user to Register
    const isStep2Valid =
        form.userId.trim() !== "" &&
        form.username.trim() !== "" &&
        form.email.trim() !== "" &&
        form.password.trim() !== "";

    // =========================
    // HANDLERS
    // =========================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMessage(""); // Clear error messages when user starts typing again
    };

    // Move to Step 2
    const handleNext = () => {
        if (isStep1Valid) {
            setStep(2);
            setMessage("");
        }
    };

    // Move back to Step 1
    const handleBack = () => {
        setStep(1);
        setMessage("");
    };

    // Submit everything to the backend
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
                    role: "ROLE_STUDENT"
                })
            });

            const data = await res.text();

            if (res.ok) {
                setMessage("Student successfully registered! ✅");
                setMessageType("success");

                // Optional: Reset form for the next student
                /*
                setForm({
                    userId: "", username: "", email: "", password: "",
                    fullName: "", dateOfBirth: "", address: "", contactNumber: "", medium: ""
                });
                setStep(1); // Send back to step 1
                */
            } else {
                // If there is a duplicate entry (like same email or ID), the backend error will show here
                setMessage("Registration Failed: " + data);
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
                <p>Follow the steps to create a complete student profile and system account.</p>
            </div>

            <div className="form-card">

                {/* ==========================================
                    STEP INDICATOR
                ========================================== */}
                <div className="step-indicator">
                    {step === 1 ? "Step 1 of 2: Personal Profile Details" : "Step 2 of 2: System Login Details"}
                </div>

                <form onSubmit={handleSubmit}>

                    {/* ==========================================
                        STEP 1: PERSONAL PROFILE DETAILS
                    ========================================== */}
                    {step === 1 && (
                        <div className="wizard-step">

                            {/* FULL NAME */}
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-container">
                                    <FiUser className="input-icon" />
                                    <input
                                        name="fullName"
                                        placeholder="Enter student's full name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* DATE OF BIRTH */}
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <div className="input-container">
                                    <FiCalendar className="input-icon" />
                                    <input
                                        name="dateOfBirth"
                                        type="date"
                                        value={form.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="form-group">
                                <label>Home Address</label>
                                <div className="input-container">
                                    <FiMapPin className="input-icon" />
                                    <input
                                        name="address"
                                        placeholder="Enter home address"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* CONTACT NUMBER */}
                            <div className="form-group">
                                <label>Contact Number (Guardian)</label>
                                <div className="input-container">
                                    <FiPhone className="input-icon" />
                                    <input
                                        name="contactNumber"
                                        placeholder="e.g. 0712345678"
                                        value={form.contactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* MEDIUM */}
                            <div className="form-group">
                                <label>Learning Medium</label>
                                <div className="input-container">
                                    <FiBookOpen className="input-icon" />
                                    <select
                                        name="medium"
                                        value={form.medium}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select Medium</option>
                                        <option value="Sinhala">Sinhala</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                            </div>

                            {/* NEXT BUTTON */}
                            <button
                                type="button"
                                className="submit-btn"
                                onClick={handleNext}
                                disabled={!isStep1Valid}
                                style={{ marginTop: '20px' }}
                            >
                                Next Step <FiArrowRight style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
                            </button>
                        </div>
                    )}

                    {/* ==========================================
                        STEP 2: SYSTEM LOGIN DETAILS
                    ========================================== */}
                    {step === 2 && (
                        <div className="wizard-step">

                            {/* USER ID */}
                            <div className="form-group">
                                <label>Student ID (Must be Unique)</label>
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
                                <label>System Username (Must be Unique)</label>
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
                                <label>Email Address (Must be Unique)</label>
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
                                <label>Account Password</label>
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

                            {/* BUTTON GROUP (BACK & REGISTER) */}
                            <div className="button-group">
                                <button type="button" className="back-btn" onClick={handleBack}>
                                    <FiArrowLeft style={{ marginRight: '5px', verticalAlign: 'middle' }} /> Back
                                </button>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={!isStep2Valid}
                                >
                                    Register Student
                                </button>
                            </div>
                        </div>
                    )}

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