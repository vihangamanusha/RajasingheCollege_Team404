import { useState } from "react";
import { FiUser, FiMail, FiLock, FiHash, FiBook, FiPhone, FiBriefcase, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import "./StudentRegister.css"; // We can reuse the same CSS file for a consistent UI!

export default function TeacherRegister() {

    // =========================
    // STATE VARIABLES
    // =========================
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        // Step 1: Professional Profile
        fullName: "",
        subjectSpecialization: "",
        contactNumber: "",
        subRole: "", // Added from your old code!

        // Step 2: System Login Details
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
        form.subjectSpecialization.trim() !== "" &&
        form.contactNumber.trim() !== "" &&
        form.subRole.trim() !== "";

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
            // HITTING THE NEW TEACHER ENDPOINT
            const res = await fetch("http://localhost:8080/admin/users/teacher/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    ...form,
                    role: "ROLE_TEACHER"
                })
            });

            const data = await res.text();

            if (res.ok) {
                setMessage("Teacher successfully registered! ✅");
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
                <h1>Teacher Registration</h1>
                <p>Follow the steps to create a complete teaching profile and system account.</p>
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
                                        placeholder="Enter teacher's full name"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Subject Specialization</label>
                                <div className="input-container">
                                    <FiBook className="input-icon" />
                                    <input
                                        name="subjectSpecialization"
                                        placeholder="e.g. Mathematics, Science"
                                        value={form.subjectSpecialization}
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

                            {/* SUB ROLE DROPDOWN (From your old code!) */}
                            <div className="form-group">
                                <label>Teaching Role</label>
                                <div className="input-container">
                                    <FiBriefcase className="input-icon" />
                                    <select
                                        name="subRole"
                                        value={form.subRole}
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
                                <label>Teacher ID (Must be Unique)</label>
                                <div className="input-container">
                                    <FiHash className="input-icon" />
                                    <input
                                        name="userId"
                                        placeholder="e.g. T-2024-001"
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
                                        placeholder="teacher@example.com"
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
                                    Register Teacher
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