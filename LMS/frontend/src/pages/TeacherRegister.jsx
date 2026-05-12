import { useState, useRef, useEffect } from "react";
import {
    FiUser, FiMail, FiLock, FiHash, FiBook, FiPhone,
    FiBriefcase, FiArrowRight, FiArrowLeft, FiCheckSquare,
    FiSquare, FiChevronDown, FiChevronUp, FiAlertCircle
} from "react-icons/fi";
import "./TeacherRegister.css";

export default function TeacherRegister() {
    const [step, setStep] = useState(1);
    const [showSubjectPicker, setShowSubjectPicker] = useState(false);
    const [errors, setErrors] = useState({});
    const pickerRef = useRef(null);

    const availableSubjects = ["Mathematics", "Science", "English", "Sinhala", "History", "ICT", "Geography", "Commerce", "Art", "Music"];
    const roles = [
        "Vice Principal (Development)", "Vice Principal (Administrative)",
        "Deputy Principal (Grade 6-11)", "Deputy Principal (Administrative)",
        "Section Head Grade 6", "Section Head Grade 7", "Section Head Grade 8",
        "Section Head Grade 9", "Section Head Grade 10", "Section Head Grade 11",
        "Subject Teacher", "Class Teacher"
    ];

    const [form, setForm] = useState({
        fullName: "", subjectSpecialization: [], contactNumber: "", subRole: "",
        userId: "", username: "", email: "", password: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) setShowSubjectPicker(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Validation Logic
    const validateStep1 = () => {
        let errs = {};
        if (!form.fullName.trim()) errs.fullName = "Full Name is required";
        if (form.subjectSpecialization.length === 0) errs.subjects = "Select at least one subject";
        if (!form.subRole) errs.subRole = "Select a designation";
        if (!/^\d{10}$/.test(form.contactNumber)) errs.contactNumber = "Enter a valid 10-digit number";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep2 = () => {
        let errs = {};
        if (!form.userId.trim()) errs.userId = "System ID is required";
        if (!form.username.trim()) errs.username = "Username is required";
        if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email format is invalid";
        if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => { if (validateStep1()) setStep(2); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        const payload = {
            ...form,
            subjectSpecialization: form.subjectSpecialization.join(", "),
            role: "ROLE_TEACHER"
        };

        try {
            const res = await fetch("http://localhost:8080/admin/users/teacher/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setMessage("Teacher successfully registered! ✅");
                setMessageType("success");
            } else {
                const data = await res.text();
                setMessage("Registration Failed: " + data);
                setMessageType("error");
            }
        } catch {
            setMessage("Server connection failed");
            setMessageType("error");
        }
    };

    return (
        <div className="register-container">
            <div className="page-header">
                <h1>Teacher Registration</h1>
                <p>Build a professional profile and system account.</p>
            </div>

            <div className="form-card">
                <div className="step-indicator">
                    {step === 1 ? "Step 1: Professional Profile" : "Step 2: Account Details"}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="wizard-step">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-container">
                                    <FiUser className="input-icon" />
                                    <input
                                        name="fullName"
                                        placeholder="Teacher's Full Name"
                                        value={form.fullName}
                                        onChange={(e) => setForm({...form, fullName: e.target.value})}
                                    />
                                </div>
                                {errors.fullName && <p className="err-msg"><FiAlertCircle /> {errors.fullName}</p>}
                            </div>

                            <div className="form-group" ref={pickerRef}>
                                <label>Subject Specialization</label>
                                <div
                                    className={`custom-picker ${showSubjectPicker ? 'active' : ''}`}
                                    onClick={() => setShowSubjectPicker(!showSubjectPicker)}
                                >
                                    <FiBook className="input-icon" />
                                    <span className="picker-text">
                                        {form.subjectSpecialization.length > 0
                                            ? form.subjectSpecialization.join(", ")
                                            : "Click to select subjects..."}
                                    </span>
                                    {showSubjectPicker ? <FiChevronUp /> : <FiChevronDown />}
                                </div>
                                {showSubjectPicker && (
                                    <div className="picker-dropdown">
                                        {availableSubjects.map(sub => (
                                            <div
                                                key={sub}
                                                className={`opt ${form.subjectSpecialization.includes(sub) ? "sel" : ""}`}
                                                onClick={() => {
                                                    const list = form.subjectSpecialization.includes(sub)
                                                        ? form.subjectSpecialization.filter(s => s !== sub)
                                                        : [...form.subjectSpecialization, sub];
                                                    setForm({...form, subjectSpecialization: list});
                                                }}
                                            >
                                                {form.subjectSpecialization.includes(sub) ? <FiCheckSquare /> : <FiSquare />} {sub}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.subjects && <p className="err-msg"><FiAlertCircle /> {errors.subjects}</p>}
                            </div>

                            <div className="form-group">
                                <label>Designation</label>
                                <div className="input-container">
                                    <FiBriefcase className="input-icon" />
                                    <select value={form.subRole} onChange={(e) => setForm({...form, subRole: e.target.value})}>
                                        <option value="" disabled>Select Designation</option>
                                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                {errors.subRole && <p className="err-msg"><FiAlertCircle /> {errors.subRole}</p>}
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <div className="input-container">
                                    <FiPhone className="input-icon" />
                                    <input
                                        value={form.contactNumber}
                                        onChange={(e) => setForm({...form, contactNumber: e.target.value})}
                                        placeholder="07XXXXXXXX"
                                    />
                                </div>
                                {errors.contactNumber && <p className="err-msg"><FiAlertCircle /> {errors.contactNumber}</p>}
                            </div>

                            <button type="button" className="submit-btn" onClick={handleNext}>
                                Next Step <FiArrowRight style={{marginLeft: '8px'}} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="wizard-step">
                            <div className="form-group">
                                <label>Teacher ID</label>
                                <div className="input-container">
                                    <FiHash className="input-icon" />
                                    <input name="userId" placeholder="T-101" value={form.userId} onChange={(e) => setForm({...form, userId: e.target.value})} />
                                </div>
                                {errors.userId && <p className="err-msg"><FiAlertCircle /> {errors.userId}</p>}
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <div className="input-container">
                                    <FiUser className="input-icon" />
                                    <input name="username" placeholder="Unique Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
                                </div>
                                {errors.username && <p className="err-msg"><FiAlertCircle /> {errors.username}</p>}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <div className="input-container">
                                    <FiMail className="input-icon" />
                                    <input name="email" placeholder="email@school.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                                </div>
                                {errors.email && <p className="err-msg"><FiAlertCircle /> {errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-container">
                                    <FiLock className="input-icon" />
                                    <input type="password" name="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                                </div>
                                {errors.password && <p className="err-msg"><FiAlertCircle /> {errors.password}</p>}
                            </div>

                            <div className="button-group">
                                <button type="button" className="back-btn" onClick={() => setStep(1)}><FiArrowLeft /> Back</button>
                                <button type="submit" className="submit-btn">Register Teacher</button>
                            </div>
                        </div>
                    )}
                </form>
                {message && <div className={`message-box ${messageType}`}>{message}</div>}
            </div>
        </div>
    );
}