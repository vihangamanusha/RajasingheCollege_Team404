import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherMaterialList.css";

function TeacherMaterialList() {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/material/all");
            if (!response.ok) {
                throw new Error("Failed to fetch materials");
            }
            const data = await response.json();
            setMaterials(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching materials:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const handleDelete = async (documentId) => {
        if (!window.confirm("Are you sure you want to delete this material?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/material/delete/${documentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update local state to remove the deleted item
                setMaterials(materials.filter(material => material.documentId !== documentId));
            } else {
                const errorData = await response.text();
                alert(`Failed to delete material: ${errorData}`);
            }
        } catch (err) {
            console.error("Error deleting material:", err);
            alert("An error occurred while deleting the material.");
        }
    };

    return (
        <div className="material-list-container">
            <div className="material-list-header">
                <h2 className="material-list-title">Study Materials</h2>
                <button
                    className="upload-button"
                    onClick={() => navigate("/upload-material")}
                >
                    <span>📤</span> Upload New Material
                </button>
            </div>

            <div className="material-list-content">
                {loading ? (
                    <p className="loading-state">Loading materials...</p>
                ) : error ? (
                    <p className="error-state">{error}</p>
                ) : materials.length === 0 ? (
                    <p className="empty-state">No materials found. Click "Upload New Material" to add one.</p>
                ) : (
                    <div className="materials-grid">
                        {materials.map((material) => (
                            <div key={material.documentId} className="material-card">
                                <div className="material-icon">📄</div>
                                <div className="material-details">
                                    <h3 className="material-title">{material.title}</h3>
                                    <p className="material-description">{material.description}</p>
                                    <div className="material-meta">
                                        <span className="material-date">Date: {material.uploadDate}</span>
                                        <span className="material-subject">Subject: {material.subjectId}</span>
                                    </div>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(material.documentId)}
                                    title="Delete Material"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherMaterialList;
