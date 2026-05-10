import { useState } from "react";
import { FiUser, FiMail, FiLock, FiHash, FiBriefcase, FiMapPin, FiPhone, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import "./StudentRegister.css"; // Reusing the exact same CSS for a perfect match!

export default function TechRegister() {

    // =========================
    // STATE VARIABLES
    // =========================
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        // Step 1: Professional Profile (Tech table)
        fullName: "",
        position: "",      // e.g., System Admin, Lab Assistant
        assignedArea: "",  // e.g., Main IT Lab, Network Room
        contactNumber: "",

        // Step 2: System Login Details (Users table)
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
    const isStep1Valid =
        form.fullName.trim() !== "" &&
        form.position.trim() !== "" &&
        form.assignedArea.trim() !== "" &&
        form.contactNumber.trim() !== "";

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
        setMessage("");
    };

    const handleNext = () => {
        if (isStep1Valid) {
            setStep(2);
            setMessage("");
        }
    };

    const handleBack = () => {
        setStep(1);
        setMessage("");
    };

    // =========================
    // SUBMIT FORM
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

        try {
            // HITTING THE NEW TECH OFFICER ENDPOINT!
            const res = await fetch("http://localhost:8080/admin/users/tech/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    ...form,
                    role: "ROLE_TECHNICAL_OFFICER" // This sets their specific access level
                })
            });

            const data = await res.text();

            if (res.ok) {
                setMessage("Technical Officer successfully registered! ✅");
                setMessageType("success");
            } else {
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
                <h1>Technical Officer Registration</h1>
                <p>Follow the steps to create a complete technical staff profile and system account.</p>
            </div>

            <div className="form-card">

                {/* STEP INDICATOR */}
                <div className="step-indicator">
                    {step === 1 ? "Step 1 of 2: Professional Profile" : "Step 2 of 2: System Login Details"}
                </div>

                <form onSubmit={handleSubmit}>

                    {/* ==========================================
                        STEP 1: PROFESSIONAL PROFILE
                    ========================================== */}
                    {step === 1 && (
                        <div className="wizard-step">

                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-container">
                                    <FiUser className="input-icon" />
                                    <input
                                        name="fullName"
                                        placeholder="Enter officer's full name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Job Position</label>
                                <div className="input-container">
                                    <FiBriefcase className="input-icon" />
                                    <input
                                        name="position"
                                        placeholder="e.g. System Administrator, Lab Technician"
                                        value={form.position}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Assigned Area</label>
                                <div className="input-container">
                                    <FiMapPin className="input-icon" />
                                    <input
                                        name="assignedArea"
                                        placeholder="e.g. Main Computer Lab, Server Room"
                                        value={form.assignedArea}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
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

                            <div className="form-group">
                                <label>Officer ID (Must be Unique)</label>
                                <div className="input-container">
                                    <FiHash className="input-icon" />
                                    <input
                                        name="userId"
                                        placeholder="e.g. TECH-001"
                                        value={form.userId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

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

                            <div className="form-group">
                                <label>Email Address (Must be Unique)</label>
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

                            <div className="button-group">
                                <button type="button" className="back-btn" onClick={handleBack}>
                                    <FiArrowLeft style={{ marginRight: '5px', verticalAlign: 'middle' }} /> Back
                                </button>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={!isStep2Valid}
                                >
                                    Register Technical Officer
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