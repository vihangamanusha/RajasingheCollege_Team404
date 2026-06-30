import TeacherSidebar from "../components/TeacherSidebar";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

function TeacherDashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            {/* Main Content */}
            <main className="dashboard-main-content">
                <header className="dashboard-header">
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>
                        Welcome, Nimal Silva
                    </h3>
                </header>

                <div className="dashboard-body">
                    <h2 className="dashboard-title">
                        Teacher Dashboard
                    </h2>

                    {/* TOP GRID */}
                    <div className="dashboard-top-grid">
                        {/* Subjects */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                📘 <b>My Subjects</b>
                            </div>

                            <div className="list-item-blue">
                                <div style={{ fontWeight: "bold" }}>Mathematics</div>
                                <div className="sub-text-dark">Grade 10 • 3 Classes</div>
                            </div>

                            <div className="list-item-blue">
                                <div style={{ fontWeight: "bold" }}>English</div>
                                <div className="sub-text-dark">Grade 11 • 2 Classes</div>
                            </div>
                        </div>

                        {/* Classes */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                🎓 <b>My Classes</b>
                            </div>

                            <div className="list-item-yellow">
                                <div style={{ fontWeight: "bold" }}>Grade 10A</div>
                                <div className="sub-text-dark">42 Students • English</div>
                            </div>

                            <div className="list-item-yellow">
                                <div style={{ fontWeight: "bold" }}>Grade 10B</div>
                                <div className="sub-text-dark">38 Students • Sinhala</div>
                            </div>

                            <div className="list-item-yellow">
                                <div style={{ fontWeight: "bold" }}>Grade 11A</div>
                                <div className="sub-text-dark">40 Students • English</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                ⚡ <b>Quick Actions</b>
                            </div>

                            <button
                                className="action-btn-blue"
                                onClick={() => navigate("/AddMarks")}
                            >
                                Upload Marks
                            </button>

                            <button
                                className="action-btn-yellow"
                                onClick={() => navigate("/materials")}
                            >
                                Upload Materials
                            </button>

                            <button
                                className="action-btn-grey"
                                onClick={() => navigate("/reports")}
                            >
                                View Reports
                            </button>
                        </div>
                    </div>

                    {/* OVERVIEW */}
                    <div className="dashboard-card" style={{ marginTop: "20px" }}>
                        <div className="card-header">
                            <b>Overview</b>
                        </div>

                        <div className="overview-grid">
                            <div className="stat-box-blue">
                                <h1 className="stat-number-blue">5</h1>
                                <p className="sub-text-dark">Total Classes</p>
                            </div>

                            <div className="stat-box-yellow">
                                <h1 className="stat-number-yellow">120</h1>
                                <p className="sub-text-dark">Total Students</p>
                            </div>

                            <div className="stat-box-green">
                                <h1 className="stat-number-green">24</h1>
                                <p className="sub-text-dark">Materials Uploaded</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TeacherDashboard;