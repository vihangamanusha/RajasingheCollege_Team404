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

    const [step, setStep] = useState(1);//Controls which page is shown

    const [form, setForm] = useState({//Stores all user input
        fullName: "",
        subjectSpecialization: [],
        contactNumber: "",
        subRole: "Subject Teacher",
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");//show messge
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


    // =========================
    // VALIDATION
    // =========================

    const validateStep = () => {//checks if user input is correct BEFORE moving or submitting

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

            if (form.password.length < 8) {////must be at least 8 characters
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

    const handleChange = (e) => {//updates form data
        setForm({
            ...form,
            [e.target.name]: e.target.value//Update only the field that changed
        });

        setMessage("");
    };

    // =========================
    // SUBJECT TOGGLE
    // =========================

    const handleSubjectToggle = (subject) => {//subject selection

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

        if (validateStep()) {//validate and go to next step.
            setStep(2);
            setMessage("");
        }
    };

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {//sends data to backend

        e.preventDefault();//Stop page reload

        if (!validateStep()) return;

        try {

            const payload = {
                ...form,
                subjectSpecialization:
                    form.subjectSpecialization.join(", "),//Converts array → string
                role: "ROLE_TEACHER"
            };

            const res = await fetch(//Send data to backend,res-This stores the response from backend
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

            const data = await res.text();//take respond and convert to the text

            if (res.ok) {

                setMessage("Teacher successfully registered! ");
                setMessageType("success");

                setForm({
                    fullName: "",
                    subjectSpecialization: [],
                    contactNumber: "",
                    subRole: "Subject Teacher",
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
                                                    ? "picked"//If subject is selected
                                                    : ""//not picked
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
                                        <option value="Subject Teacher">Subject Teacher</option>
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