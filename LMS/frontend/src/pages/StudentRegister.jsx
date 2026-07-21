import { useState } from "react";
import { FiUser, FiMail, FiLock, FiHash, FiCalendar, FiMapPin, FiBookOpen, FiPhone, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import "./StudentRegister.css";

export default function StudentRegister() {
    // =========================
    // STATE MANAGEMENT
    // =========================
    const [step, setStep] = useState(1);//Controls which page is shown
    const [form, setForm] = useState({//Stores all user input
        fullName: "", dateOfBirth: "", address: "", contactNumber: "", medium: "",
        fatherName: "", motherName: "", fatherContact: "", motherContact: "", emergencyContact: "",
        userId: "", username: "", email: "", password: ""
    });

    const [message, setMessage] = useState("");//show messge
    const [messageType, setMessageType] = useState("");

    // =========================
    // REGEX VALIDATION LOGIC
    // =========================
    const validateStep = () => {//checks if user input is correct BEFORE moving or submitting
        // Step 1: Personal Profile Validation
        if (step === 1) {
            // Requirement: Letters and spaces only
            if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
                setMessage("Full Name can only contain letters and spaces.");
                setMessageType("error");
                return false;
            }
            // Requirement: Letters, numbers, and commas only
            if (!/^[a-zA-Z0-9\s,]+$/.test(form.address)) {
                setMessage("Address can only contain letters, numbers, and commas.");
                setMessageType("error");
                return false;
            }
            // Requirement: Exactly 10 digits (Standard Sri Lankan format)
            if (!/^\d{10}$/.test(form.contactNumber)) {
                setMessage("Contact Number must be exactly 10 digits.");
                setMessageType("error");
                return false;
            }
            // Father's Name Validation
            if (!/^[a-zA-Z\s]+$/.test(form.fatherName)) {
                setMessage("Father's Name can only contain letters and spaces.");
                setMessageType("error");
                return false;
            }
            // Mother's Name Validation
            if (!/^[a-zA-Z\s]+$/.test(form.motherName)) {
                setMessage("Mother's Name can only contain letters and spaces.");
                setMessageType("error");
                return false;
            }
            // Father's Contact Validation
            if (!/^\d{10}$/.test(form.fatherContact)) {
                setMessage("Father's Contact Number must be exactly 10 digits.");
                setMessageType("error");
                return false;
            }
            // Mother's Contact Validation
            if (!/^\d{10}$/.test(form.motherContact)) {
                setMessage("Mother's Contact Number must be exactly 10 digits.");
                setMessageType("error");
                return false;
            }
            // Emergency Contact Validation
            if (!form.emergencyContact) {
                setMessage("Please select an Emergency Contact.");
                setMessageType("error");
                return false;
            }
        }

        // Step 2: System Login Validation
        if (step === 2) {
            const alphaNum = /^[a-zA-Z0-9]+$/;
            // Requirement: Alphanumeric only (No symbols)
            if (!alphaNum.test(form.userId)) {
                setMessage("Student ID cannot contain symbols or spaces.");
                setMessageType("error");
                return false;
            }
            if (!alphaNum.test(form.username)) {
                setMessage("Username cannot contain symbols or spaces.");
                setMessageType("error");
                return false;
            }
            // Requirement: Valid Email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                setMessage("Please enter a valid email address.");
                setMessageType("error");
                return false;
            }
            // Requirement: Minimum 8 characters
            if (form.password.length < 8) {
                setMessage("Password must be at least 8 characters long.");
                setMessageType("error");
                return false;
            }
        }
        return true; // All checks passed
    };

    const handleChange = (e) => {//updates form data
        setForm({ ...form, [e.target.name]: e.target.value });//Update only the field that changed
        setMessage(""); // Clear error when typing
    };

    const handleNext = async () => {
        if (validateStep()) {
            setMessage("");
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/generate-id?role=ROLE_STUDENT`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                if (res.ok) {
                    const generatedId = await res.text();
                    setForm(prev => ({ ...prev, userId: generatedId, username: generatedId.toLowerCase() }));
                }
            } catch (err) {
                console.error("Failed to generate Student ID automatically", err);
            }
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();//Stop page reload

        // Final validation check before API call
        if (!validateStep()) return;

        setMessage("");
        setMessageType("");

        try {//Send data to backend,,res-This stores the response from backend
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/admin/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ ...form, role: "ROLE_STUDENT" })//Add role
            });

            const data = await res.text();//take respond and convert to the text

            if (res.ok) {
                setMessage("Student successfully registered! ");
                setMessageType("success");
                setForm({
                    fullName: "", dateOfBirth: "", address: "", contactNumber: "", medium: "",
                    fatherName: "", motherName: "", fatherContact: "", motherContact: "", emergencyContact: "",
                    userId: "", username: "", email: "", password: ""
                });
                setStep(1);
            } else {
                // Backend uniqueness errors (e.g. "Username already exists") will show here
                setMessage(data);
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
                <p>Ensure all details are accurate before creating the account.</p>
            </div>

            <div className="form-card">
                <div className="progress-bar-container">
                    <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
                        <div className="step-number">1</div>
                        <div className="step-label">Personal & Parent Info</div>
                    </div>
                    <div className="progress-line">
                        <div className="progress-line-fill" style={{ width: step === 2 ? "100%" : "0%" }}></div>
                    </div>
                    <div className={`progress-step ${step === 2 ? "active" : ""}`}>
                        <div className="step-number">2</div>
                        <div className="step-label">Account Security</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="wizard-step">
                            <h3 className="section-subtitle">Personal Details</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name (Letters Only)</label>
                                    <div className="input-container">
                                        <FiUser className="input-icon" />
                                        <input name="fullName" value={form.fullName} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <div className="input-container">
                                        <FiCalendar className="input-icon" />
                                        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Home Address (Letters, Numbers, Commas)</label>
                                    <div className="input-container">
                                        <FiMapPin className="input-icon" />
                                        <input name="address" value={form.address} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Guardian Contact (10 Digits)</label>
                                    <div className="input-container">
                                        <FiPhone className="input-icon" />
                                        <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <h3 className="section-subtitle">Parents' Details</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Father's Name (Letters Only)</label>
                                    <div className="input-container">
                                        <FiUser className="input-icon" />
                                        <input name="fatherName" value={form.fatherName} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Father's Contact (10 Digits)</label>
                                    <div className="input-container">
                                        <FiPhone className="input-icon" />
                                        <input name="fatherContact" value={form.fatherContact} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Mother's Name (Letters Only)</label>
                                    <div className="input-container">
                                        <FiUser className="input-icon" />
                                        <input name="motherName" value={form.motherName} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Mother's Contact (10 Digits)</label>
                                    <div className="input-container">
                                        <FiPhone className="input-icon" />
                                        <input name="motherContact" value={form.motherContact} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Emergency Contact Selector</label>
                                    <div className="input-container">
                                        <FiUser className="input-icon" />
                                        <select name="emergencyContact" value={form.emergencyContact} onChange={handleChange} required>
                                            <option value="" disabled>Select Emergency Contact</option>
                                            <option value="FATHER">Father</option>
                                            <option value="MOTHER">Mother</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Learning Medium</label>
                                    <div className="input-container">
                                        <FiBookOpen className="input-icon" />
                                        <select name="medium" value={form.medium} onChange={handleChange} required>
                                            <option value="" disabled>Select Medium</option>
                                            <option value="Sinhala">Sinhala</option>
                                            <option value="English">English</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="button" className="submit-btn" onClick={handleNext}>
                                Next Step <FiArrowRight style={{ marginLeft: '5px' }} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="wizard-step">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Student ID (Automatically Generated)</label>
                                    <div className="input-container">
                                        <FiHash className="input-icon" />
                                        <input name="userId" value={form.userId} readOnly style={{ backgroundColor: "#e2e8f0", cursor: "not-allowed" }} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>System Username (Alphanumeric)</label>
                                    <div className="input-container">
                                        <FiUser className="input-icon" />
                                        <input name="username" value={form.username} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-container">
                                        <FiMail className="input-icon" />
                                        <input name="email" type="email" value={form.email} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Account Password (Min 8 Characters)</label>
                                    <div className="input-container">
                                        <FiLock className="input-icon" />
                                        <input name="password" type="password" value={form.password} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="button-group">
                                <button type="button" className="back-btn" onClick={() => setStep(1)}><FiArrowLeft /> Back</button>
                                <button type="submit" className="submit-btn">Complete Registration</button>
                            </div>
                        </div>
                    )}
                </form>

                {message && <div className={`message-box ${messageType}`}>{message}</div>}
            </div>
        </div>
    );
}