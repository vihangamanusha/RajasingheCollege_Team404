import { useState } from "react";
import {
    FiUser,
    FiMail,
    FiLock,
    FiHash,
    FiBookOpen,
    FiPhone,
    FiArrowRight,
    FiArrowLeft,
    FiBriefcase,
    FiCheckSquare,
    FiSquare
} from "react-icons/fi";

import "./TeacherRegister.css";

export default function TeacherRegister() {

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        fullName: "",
        subjectSpecialization: [],
        contactNumber: "",
        subRole: "",
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const availableSubjects = [
        "Mathematics",
        "Science",
        "English",
        "Sinhala",
        "History",
        "ICT",
        "Geography",
        "Commerce",
        "Art",
        "Music"
    ];

    const roles = [
        "Vice Principal (Development)",
        "Vice Principal (Administrative)",
        "Deputy Principal (Grade 6-11)",
        "Deputy Principal (Administrative)",
        "Section Head Grade 6",
        "Section Head Grade 7",
        "Section Head Grade 8",
        "Section Head Grade 9",
        "Section Head Grade 10",
        "Section Head Grade 11",
        "Subject Teacher",
        "Class Teacher"
    ];

    // =========================
    // VALIDATION
    // =========================

    const validateStep = () => {

        if (step === 1) {

            if (!/^[a-zA-Z\s.]+$/.test(form.fullName)) {
                setMessage("Full Name can only contain letters.");
                setMessageType("error");
                return false;
            }

            if (form.subjectSpecialization.length === 0) {
                setMessage("Please select at least one subject.");
                setMessageType("error");
                return false;
            }

            if (!form.subRole) {
                setMessage("Please select a designation.");
                setMessageType("error");
                return false;
            }

            if (!/^\d{10}$/.test(form.contactNumber)) {
                setMessage("Contact Number must be exactly 10 digits.");
                setMessageType("error");
                return false;
            }
        }

        if (step === 2) {

            const alphaNum = /^[a-zA-Z0-9]+$/;

            if (!alphaNum.test(form.userId)) {
                setMessage("Teacher ID cannot contain symbols.");
                setMessageType("error");
                return false;
            }

            if (!alphaNum.test(form.username)) {
                setMessage("Username cannot contain symbols.");
                setMessageType("error");
                return false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                setMessage("Please enter a valid email address.");
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
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setMessage("");
    };

    // =========================
    // SUBJECT TOGGLE
    // =========================

    const handleSubjectToggle = (subject) => {

        const exists = form.subjectSpecialization.includes(subject);

        if (exists) {
            setForm({
                ...form,
                subjectSpecialization:
                    form.subjectSpecialization.filter(s => s !== subject)
            });
        } else {
            setForm({
                ...form,
                subjectSpecialization: [
                    ...form.subjectSpecialization,
                    subject
                ]
            });
        }
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
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateStep()) return;

        try {

            const payload = {
                ...form,
                subjectSpecialization:
                    form.subjectSpecialization.join(", "),
                role: "ROLE_TEACHER"
            };

            const res = await fetch(
                "http://localhost:8080/admin/users/teacher/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await res.text();

            if (res.ok) {

                setMessage("Teacher successfully registered! ✅");
                setMessageType("success");

                setForm({
                    fullName: "",
                    subjectSpecialization: [],
                    contactNumber: "",
                    subRole: "",
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

        } catch {

            setMessage("Failed to connect to server.");
            setMessageType("error");
        }
    };

    return (

        <div className="register-container">

            <div className="page-header">
                <h1>Teacher Registration</h1>
                <p>Create professional teacher accounts securely.</p>
            </div>

            <div className="form-card">

                <div className="step-indicator">
                    {step === 1
                        ? "Step 1: Teacher Information"
                        : "Step 2: Account Security"}
                </div>

                <form onSubmit={handleSubmit}>

                    {/* STEP 1 */}

                    {step === 1 && (

                        <div className="wizard-step">

                            <div className="form-group">
                                <label>Full Name</label>

                                <div className="input-container">
                                    <FiUser className="input-icon" />

                                    <input
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Subject Specialization</label>

                                <div className="subject-list">

                                    {availableSubjects.map(subject => (

                                        <div
                                            key={subject}
                                            className={`subject-option ${
                                                form.subjectSpecialization.includes(subject)
                                                    ? "picked"
                                                    : ""
                                            }`}
                                            onClick={() => handleSubjectToggle(subject)}
                                        >

                                            {form.subjectSpecialization.includes(subject)
                                                ? <FiCheckSquare />
                                                : <FiSquare />
                                            }

                                            {subject}

                                        </div>

                                    ))}

                                </div>
                            </div>

                            <div className="form-group">
                                <label>Designation</label>

                                <div className="input-container">

                                    <FiBriefcase className="input-icon" />

                                    <select
                                        name="subRole"
                                        value={form.subRole}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Designation
                                        </option>

                                        {roles.map(role => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}

                                    </select>

                                </div>
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>

                                <div className="input-container">

                                    <FiPhone className="input-icon" />

                                    <input
                                        name="contactNumber"
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
                            >
                                Next Step
                                <FiArrowRight style={{ marginLeft: "5px" }} />
                            </button>

                        </div>
                    )}

                    {/* STEP 2 */}

                    {step === 2 && (

                        <div className="wizard-step">

                            <div className="form-group">
                                <label>Teacher ID</label>

                                <div className="input-container">

                                    <FiHash className="input-icon" />

                                    <input
                                        name="userId"
                                        value={form.userId}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                            </div>

                            <div className="form-group">
                                <label>Username</label>

                                <div className="input-container">

                                    <FiUser className="input-icon" />

                                    <input
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>

                                <div className="input-container">

                                    <FiMail className="input-icon" />

                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>

                                <div className="input-container">

                                    <FiLock className="input-icon" />

                                    <input
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                            </div>

                            <div className="button-group">

                                <button
                                    type="button"
                                    className="back-btn"
                                    onClick={() => setStep(1)}
                                >
                                    <FiArrowLeft /> Back
                                </button>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                >
                                    Complete Registration
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