import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Award,
  ClipboardList,
  Download,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard({ studentId }) {
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Student Profile Data
        const profileRes = await axios.get(
          `http://localhost:8080/api/student/${studentId}`,
        );
        setStudent(profileRes.data);

        // Recent Marks Data (Top 3)
        const marksRes = await axios.get(
          `http://localhost:8080/api/student/${studentId}/marks`,
        );
        setMarks(marksRes.data.slice(0, 3)); // Anthima marks 3 witharak gannawa
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchData();
  }, [studentId]);

  if (loading)
    return (
      <div className="loader-container">
        <Loader2 className="spin-icon" size={40} />
        <style>{`
        .loader-container { display: flex; height: 80vh; align-items: center; justify-content: center; }
        .spin-icon { animation: spin 1s linear infinite; color: #2563eb; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      </div>
    );

  return (
    <div className="dashboard-wrapper">
      <style>{`
        .dashboard-wrapper { padding: 0; font-family: 'Inter', sans-serif; animation: fadeIn 0.5s ease; }
        .college-header { color: #64748b; font-style: italic; font-size: 0.95rem; margin-bottom: 1.5rem; display: block; }

        /* Banner */
        .welcome-banner { 
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); 
          color: white; padding: 2.5rem; border-radius: 1rem; 
          display: flex; align-items: center; gap: 1.5rem; 
          box-shadow: 0 10px 20px rgba(30, 58, 138, 0.15); margin-bottom: 2.5rem;
        }
        .banner-icon-bg { background: rgba(255,255,255,0.2); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }

        /* Grid Layouts */
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; }

        /* Action Cards */
        .action-card { background: #fff; padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; text-decoration: none; transition: 0.3s; }
        .action-card:hover { transform: translateY(-5px); border-color: #2563eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .icon-box { width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; color: white; }

        /* Prototype Sections */
        .section-card { background: #fff; padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; }
        .section-title { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 1.25rem; }
        
        .list-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 10px; margin-bottom: 10px; }
        .item-label { font-weight: 500; color: #1e293b; }
        .item-value { font-weight: 700; color: #2563eb; }

        .event-item { padding: 12px; background: #f8fafc; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid #2563eb; }
        .event-name { font-weight: 600; color: #1e293b; display: block; }
        .event-date { font-size: 0.8rem; color: #64748b; margin-top: 4px; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* <span className="college-header">Rajasinghe Central College</span> */}

      {/* Banner Section */}
      <div className="welcome-banner">
        <div className="banner-icon-bg">
          <Award size={35} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.75rem" }}>
            Welcome Back, {student?.fullName || "John"}!
          </h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.9 }}>
            {student?.classEntity?.className || "Grade 10-A"} | Student ID:{" "}
            {student?.studentId || "2024/001"}
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid-3">
        <Link to="/student/marks" className="action-card">
          <div className="icon-box" style={{ background: "#2563eb" }}>
            <ClipboardList size={22} />
          </div>
          <h3 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>
            View My Marks
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>
            Check your exam results.
          </p>
        </Link>
        <div
          className="action-card"
          onClick={() =>
            window.open(
              `http://localhost:8080/api/student/${studentId}/report/pdf`,
            )
          }
        >
          <div className="icon-box" style={{ background: "#fbbf24" }}>
            <Download size={22} />
          </div>
          <h3 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>
            Download Report
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>
            Get your progress report PDF.
          </p>
        </div>
        <Link to="/student/materials" className="action-card">
          <div className="icon-box" style={{ background: "#10b981" }}>
            <BookOpen size={22} />
          </div>
          <h3 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>
            Study Materials
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>
            Access lesson resources.
          </p>
        </Link>
      </div>

      {/* Bottom Grid: Performance & Events */}
      <div className="grid-2">
        {/* Recent Performance Section */}
        <div className="section-card">
          <h2 className="section-title">Recent Performance</h2>
          <div className="list-container">
            {marks.length > 0 ? (
              marks.map((m) => (
                <div key={m.markId} className="list-item">
                  <span className="item-label">{m.subjectName}</span>
                  <span className="item-value">{m.assignmentMark}%</span>
                </div>
              ))
            ) : (
              <p style={{ color: "#64748b", textAlign: "center" }}>
                No recent marks found.
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="section-card">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="list-container">
            <div className="event-item">
              <span className="event-name">Term 2 Exams Begin</span>
              <span className="event-date">May 15, 2026</span>
            </div>
            <div className="event-item">
              <span className="event-name">Science Project Submission</span>
              <span className="event-date">May 20, 2026</span>
            </div>
            <div className="event-item">
              <span className="event-name">Parent-Teacher Meeting</span>
              <span className="event-date">May 25, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
