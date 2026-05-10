import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import "./AdminTechOfficerManagement.css";

export default function AdminTechOfficerManagement() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data for Tech Officers
    const mockTechOfficers = [
        { id: "TECH-01", name: "Saman Perera", email: "saman.p@lms.com", role: "System Admin" },
        { id: "TECH-02", name: "Ruwan Silva", email: "ruwan.s@lms.com", role: "Network Tech" },
        { id: "TECH-03", name: "Nimali K", email: "nimali.k@lms.com", role: "IT Support" },
    ];

    const filteredTech = mockTechOfficers.filter((tech) =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-tech-management-container">
            <div className="page-header-flex">
                <div className="header-text">
                    <h1>Technical Officer Management</h1>
                    <p>Manage system administrators and technical staff</p>
                </div>
                <button
                    className="add-btn tech-btn"
                    onClick={() => navigate("/admin/users/tech")}
                >
                    <FiUserPlus /> Add Technical Officer
                </button>
            </div>

            <div className="table-card">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name or officer ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Officer ID</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTech.map((tech, index) => (
                        <tr key={index}>
                            <td><strong>{tech.id}</strong></td>
                            <td>{tech.name}</td>
                            <td>{tech.email}</td>
                            <td>{tech.role}</td>
                            <td>
                                <div className="action-icons">
                                    <button className="icon-btn edit-icon"><FiEdit /></button>
                                    <button className="icon-btn delete-icon"><FiTrash2 /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}