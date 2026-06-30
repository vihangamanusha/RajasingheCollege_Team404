import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { uploadMaterial } from "../services/MaterialService";
import { getSubjects } from "../services/SubjectService";
import { getClasses } from "../services/ClassService";

import "./TeacherUploadMaterial.css";

function TeacherUploadMaterial() {
    const navigate = useNavigate();

    // FORM STATES
    const [title, setTitle] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [classId, setClassId] = useState("");
    const [description, setDescription] = useState("");
    const [uploadType, setUploadType] = useState("pdf");
    const [file, setFile] = useState(null);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [teacherId] = useState("T001");

    // DATA FROM DB
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    // LOAD DATA
    useEffect(() => {
        loadSubjects();
        loadClasses();
    }, []);

    const loadSubjects = async () => {
        try {
            const res = await getSubjects();
            setSubjects(res.data);
        } catch (error) {
            console.error("Subject load error:", error);
        }
    };

    const loadClasses = async () => {
        try {
            const res = await getClasses();
            setClasses(res.data);
        } catch (error) {
            console.error("Class load error:", error);
        }
    };

    // CONVERT FOR SEARCH DROPDOWN
    const subjectOptions = subjects.map(s => ({
        value: s.subjectId,
        label: `${s.subjectId} - ${s.subjectName}`
    }));

    const classOptions = classes.map(c => ({
        value: c.classId,
        label: `${c.classId} - ${c.className}`
    }));

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !subjectId || !classId) {
            alert("Please fill all required fields");
            return;
        }

        if (uploadType === "pdf" && !file) {
            alert("Please select a PDF file");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("teacherId", teacherId);
        formData.append("subjectId", subjectId);
        formData.append("classId", classId);
        formData.append("description", description);
        formData.append("type", uploadType);

        if (uploadType === "pdf") {
            formData.append("file", file);
        } else {
            formData.append("youtubeUrl", youtubeUrl);
        }

        try {
            await uploadMaterial(formData);
            alert("Material Uploaded Successfully ✔");

            // RESET
            setTitle("");
            setSubjectId("");
            setClassId("");
            setDescription("");
            setFile(null);
            setYoutubeUrl("");
            setUploadType("pdf");

        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload Failed ❌");
        }
    };

    return (
        <div className="upload-page-container">

            <div className="page-header">
                <button className="back-btn" onClick={() => navigate("/materials")}>
                    ⬅ Back to Materials
                </button>
            </div>

            <div className="upload-card">

                <h2 className="form-title">Upload Study Materials</h2>

                <form onSubmit={handleSubmit} className="upload-form">

                    {/* TITLE */}
                    <div className="form-group">
                        <label>Material Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>

                    {/* SUBJECT + CLASS */}
                    <div className="form-row">

                        {/* SUBJECT */}
                        <div className="form-group">
                            <label>Subject</label>
                            <Select
                                options={subjectOptions}
                                value={subjectOptions.find(s => s.value === subjectId)}
                                onChange={(selected) => setSubjectId(selected.value)}
                                placeholder="Search subject..."
                                isSearchable
                            />
                        </div>

                        {/* CLASS */}
                        <div className="form-group">
                            <label>Class</label>
                            <Select
                                options={classOptions}
                                value={classOptions.find(c => c.value === classId)}
                                onChange={(selected) => setClassId(selected.value)}
                                placeholder="Search class..."
                                isSearchable
                            />
                        </div>

                    </div>

                    {/* TYPE BUTTONS */}
                    <div className="form-group">
                        <label>Material Type</label>

                        <div className="type-toggle-buttons">

                            <button
                                type="button"
                                className={uploadType === "pdf" ? "active" : ""}
                                onClick={() => setUploadType("pdf")}
                            >
                                📄 PDF
                            </button>

                            <button
                                type="button"
                                className={uploadType === "youtube" ? "active" : ""}
                                onClick={() => setUploadType("youtube")}
                            >
                                ▶ YouTube
                            </button>

                        </div>
                    </div>

                    {/* FILE OR LINK */}
                    {uploadType === "pdf" ? (
                        <div className="form-group">
                            <label>Upload File</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>YouTube URL</label>
                            <input
                                type="url"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    )}

                    {/* DESCRIPTION */}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional description"
                            rows="4"
                        />
                    </div>

                    {/* SUBMIT */}
                    <button type="submit" className="submit-btn">
                        📤 Upload Material
                    </button>

                </form>

            </div>

        </div>
    );
}

export default TeacherUploadMaterial;