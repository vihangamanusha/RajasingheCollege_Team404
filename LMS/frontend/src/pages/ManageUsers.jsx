import { useState, useEffect } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiUser, FiMail, FiHash } from "react-icons/fi";
import "./ManageUsers.css"; // We will create this CSS file next

export default function ManageUsers() {
    // =========================
    // STATE MANAGEMENT
    // =========================
    const [activeTab, setActiveTab] = useState("ROLE_STUDENT");
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // =========================
    // DATA FETCHING LOGIC
    // =========================
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            // Calling the new search API we built in Spring Boot
            const response = await fetch(
                `http://localhost:8080/admin/users/search?role=${activeTab}&term=${searchTerm}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setMessage("Failed to load users.");
            }
        } catch (error) {
            setMessage("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch whenever the tab changes or the user types in the search bar
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 300); // 300ms debounce to prevent hitting the server on every single keystroke

        return () => clearTimeout(delayDebounceFn);
    }, [activeTab, searchTerm]);

    return (
        <div className="manage-container">
            <div className="manage-header">
                <h1>User Management</h1>
                <p>Search, update, or remove users from the Rajasinghe LMS system.</p>
            </div>

            {/* TAB NAVIGATION */}
            <div className="tab-group">
                <button
                    className={activeTab === "ROLE_STUDENT" ? "tab active" : "tab"}
                    onClick={() => { setActiveTab("ROLE_STUDENT"); setSearchTerm(""); }}
                >
                    Students
                </button>
                <button
                    className={activeTab === "ROLE_TEACHER" ? "tab active" : "tab"}
                    onClick={() => { setActiveTab("ROLE_TEACHER"); setSearchTerm(""); }}
                >
                    Teachers
                </button>
                <button
                    className={activeTab === "ROLE_TECHNICAL_OFFICER" ? "tab active" : "tab"}
                    onClick={() => { setActiveTab("ROLE_TECHNICAL_OFFICER"); setSearchTerm(""); }}
                >
                    Technical Officers
                </button>
            </div>

            {/* SEARCH BAR */}
            <div className="search-section">
                <div className="search-input-wrapper">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab.replace("ROLE_", "").toLowerCase()}s by name, ID or email...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* DATA TABLE */}
            <div className="table-card">
                {loading ? (
                    <div className="loading-spinner">Loading users...</div>
                ) : users.length > 0 ? (
                    <table className="user-table">
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td><span className="id-badge">{user.userId}</span></td>
                                <td>
                                    <div className="user-info">
                                        <FiUser className="row-icon" />
                                        {user.username}
                                    </div>
                                </td>
                                <td>
                                    <div className="user-info">
                                        <FiMail className="row-icon" />
                                        {user.email}
                                    </div>
                                </td>
                                <td>
                                        <span className={`status-pill ${user.status.toLowerCase()}`}>
                                            {user.status}
                                        </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-edit" title="Edit User">
                                            <FiEdit2 />
                                        </button>
                                        <button className="btn-delete" title="Delete User">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-results">
                        No active {activeTab.replace("ROLE_", "").toLowerCase()}s found matching your search.
                    </div>
                )}
            </div>

            {message && <div className="error-toast">{message}</div>}
        </div>
    );
}