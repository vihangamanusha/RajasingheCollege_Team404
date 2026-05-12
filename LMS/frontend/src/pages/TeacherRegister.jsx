import { useState, useRef, useEffect } from "react";
import {
    FiUser, FiMail, FiLock, FiHash, FiBook, FiPhone,
    FiBriefcase, FiArrowRight, FiArrowLeft, FiCheckSquare,
    FiSquare, FiChevronDown, FiChevronUp, FiAlertCircle, FiX
} from "react-icons/fi";
import "./TeacherRegister.css";

export default function TeacherRegister() {
    const [step, setStep] = useState(1);
    const [showPicker, setShowPicker] = useState(false);
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
        fullName: "",
        subjectSpecialization: [],
        contactNumber: "",
        subRole: "",
        userId: "",
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubjectToggle = (subject) => {
        setForm(prev => {
            const isSelected = prev.subjectSpecialization.includes(subject);
            const updated = isSelected
                ? prev.subjectSpecialization.filter(s => s !== subject)
                : [...prev.subjectSpecialization, subject];
            return { ...prev, subjectSpecialization: updated };
        });
    };

    const validateStep1 = () => {
        let errs = {};
        if (!form.fullName.trim()) errs.fullName = "Full Name is required";
        if (form.subjectSpecialization.length === 0) errs.subjects = "Select at least one subject";
        if (!form.subRole) errs.subRole = "Select a designation";
        if (!/^\d{10}$/.test(form.contactNumber)) errs.contactNumber = "Enter a valid 10-digit number";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => { if (validateStep1()) setStep(2); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

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
                setMessage({ text: "Teacher successfully registered! ✅", type: "success" });
                setForm({ fullName: "", subjectSpecialization: [], contactNumber: "", subRole: "", userId: "", username: "", email: "", password: "" });
                setTimeout(() => setStep(1), 2000);
            } else {
                const data = await res.text();
                setMessage({ text: "Registration Failed: " + data, type: "error" });
            }
        } catch {
            setMessage({ text: "Server connection failed", type: "error" });
        }
    };

    return (
        <div className="register-container">
            <div className="page-header">
                <h1>Teacher Registration</h1>
                <p>Initialize professional staff profiles with hierarchical roles.</p>
            </div>

            <div className="form-card">
                {/* MODERN PROGRESS TRACKER */}
                <div className="progress-bar-container">
                    <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
                    <div className={`progress-line ${step === 2 ? "active" : ""}`}></div>
                    <div className={`progress-step ${step === 2 ? "active" : ""}`}>2</div>
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="wizard-step animate-in">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <FiUser className="input-icon" />
                                    <input
                                        placeholder="e.g. B.K.N.S. Lakmal"
                                        value={form.fullName}
                                        onChange={(e) => setForm({...form, fullName: e.target.value})}
                                    />
                                </div>
                                {errors.fullName && <p className="err-msg"><FiAlertCircle /> {errors.fullName}</p>}
                            </div>

                            {/* PROFESSIONAL MULTI-SELECT CHIP INPUT */}
                            <div className="form-group" ref={pickerRef}>
                                <label>Subject Specialization</label>
                                <div
                                    className={`multi-select-field ${showPicker ? 'focused' : ''}`}
                                    onClick={() => setShowPicker(!showPicker)}
                                >
                                    <FiBook className="input-icon" />
                                    <div className="chips-container">
                                        {form.subjectSpecialization.length > 0 ? (
                                            form.subjectSpecialization.map(sub => (
                                                <span key={sub} className="subject-chip" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSubjectToggle(sub);
                                                }}>
                                                    {sub} <FiX className="chip-remove" />
                                                </span>
                                            ))
                                        ) : (
                                            <span className="placeholder">Select assigned subjects...</span>
                                        )}
                                    </div>
                                    <FiChevronDown className={`chevron ${showPicker ? 'rotated' : ''}`} />
                                </div>

                                {showPicker && (
                                    <div className="subject-dropdown shadow-lg">
                                        {availableSubjects.map(sub => (
                                            <div
                                                key={sub}
                                                className={`dropdown-item ${form.subjectSpecialization.includes(sub) ? "selected" : ""}`}
                                                onClick={() => handleSubjectToggle(sub)}
                                            >
                                                {form.subjectSpecialization.includes(sub) ? <FiCheckSquare className="chk active"/> : <FiSquare className="chk"/>}
                                                <span>{sub}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.subjects && <p className="err-msg"><FiAlertCircle /> {errors.subjects}</p>}
                            </div>

                            <div className="form-group">
                                <label>Designation / Sub-Role</label>
                                <div className="input-wrapper">
                                    <FiBriefcase className="input-icon" />
                                    <select value={form.subRole} onChange={(e) => setForm({...form, subRole: e.target.value})}>
                                        <option value="" disabled>Choose Designation</option>
                                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                {errors.subRole && <p className="err-msg"><FiAlertCircle /> {errors.subRole}</p>}
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <div className="input-wrapper">
                                    <FiPhone className="input-icon" />
                                    <input
                                        value={form.contactNumber}
                                        onChange={(e) => setForm({...form, contactNumber: e.target.value})}
                                        placeholder="07XXXXXXXX"
                                    />
                                </div>
                                {errors.contactNumber && <p className="err-msg"><FiAlertCircle /> {errors.contactNumber}</p>}
                            </div>

                            <button type="button" className="main-action-btn" onClick={handleNext}>
                                Continue to Account <FiArrowRight />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="wizard-step animate-in">
                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Teacher ID</label>
                                    <div className="input-wrapper"><FiHash className="input-icon" /><input value={form.userId} onChange={(e) => setForm({...form, userId: e.target.value})} placeholder="T-101" /></div>
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <div className="input-wrapper"><FiUser className="input-icon" /><input value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} placeholder="Login Username" /></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper"><FiMail className="input-icon" /><input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="email@school.lk" /></div>
                            </div>
                            <div className="form-group">
                                <label>Secure Password</label>
                                <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="••••••••" /></div>
                            </div>
                            <div className="flex-buttons">
                                <button type="button" className="secondary-btn" onClick={() => setStep(1)}><FiArrowLeft /> Back</button>
                                <button type="submit" className="main-action-btn">Finalize Registration</button>
                            </div>
                        </div>
                    )}
                </form>
                {message.text && <div className={`alert-box ${message.type}`}>{message.text}</div>}
            </div>
        </div>
    );
}