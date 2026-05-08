import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Download,
  User,
  GraduationCap,
  Calendar,
  Award,
  Loader2,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function StudentReport({ studentId }) {
  const [report, setReport] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const studentRes = await axios.get(
          `http://localhost:8080/api/student/${studentId}`,
        );
        setStudent(studentRes.data);

        const reportRes = await axios.get(
          `http://localhost:8080/api/student/${studentId}/report`,
        );
        if (reportRes.data.length > 0) {
          setReport(reportRes.data[reportRes.data.length - 1]);
        }
      } catch (err) {
        console.error("Error fetching report data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchReportData();
  }, [studentId]);

  const handleDownload = () => {
    window.open(
      `http://localhost:8080/api/student/${studentId}/report/pdf`,
      "_blank",
    );
    setShowDownloadModal(true);
  };

  if (loading)
    return (
      <div className="loader-box">
        <Loader2 className="spinner" size={40} />
        <style>{`
        .loader-box { display: flex; height: 400px; align-items: center; justify-content: center; }
        .spinner { animation: spin 1s linear infinite; color: #2563eb; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      </div>
    );

  return (
    <div className="report-wrapper">
      <style>{`
        .report-wrapper { animation: fadeIn 0.5s ease; font-family: 'Inter', sans-serif; }
        
        .report-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 2rem; 
        }
        
        .report-header h1 { font-size: 1.75rem; font-weight: 700; color: #1e293b; margin: 0; }
        .report-header p { color: #64748b; margin: 4px 0 0 0; font-size: 0.95rem; }

        .btn-download { 
          background-color: #2563eb; color: white; border: none; padding: 12px 24px; 
          border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 10px; 
          font-weight: 600; transition: 0.3s; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }
        .btn-download:hover { background-color: #1e40af; transform: translateY(-2px); }

        /* Report Paper Style Card */
        .paper-card { 
          background: #ffffff; 
          border-radius: 1rem; 
          padding: 3rem; 
          border: 1px solid #e2e8f0; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.02);
          position: relative;
        }

        .school-branding { text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 2rem; margin-bottom: 2.5rem; }
        .school-branding h2 { color: #2563eb; font-size: 1.5rem; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px; }
        .school-branding h3 { font-size: 1.1rem; color: #1e293b; margin: 0; font-weight: 600; }
        .school-branding p { color: #64748b; font-size: 0.9rem; margin-top: 8px; }

        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
        .info-cell { display: flex; align-items: center; gap: 15px; }
        .icon-circle { 
          background: #eff6ff; width: 48px; height: 48px; 
          border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #2563eb;
        }
        .cell-label { color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }
        .cell-value { color: #1e293b; font-weight: 700; font-size: 1rem; margin: 2px 0 0 0; }

        .stats-section { margin-bottom: 3rem; }
        .section-heading { 
          font-size: 1.1rem; font-weight: 700; color: #1e293b; 
          margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;
        }
        
        .stat-row { 
          display: flex; justify-content: space-between; padding: 1.25rem; 
          background: #f8fafc; border-radius: 12px; margin-bottom: 10px; 
          border: 1px solid #f1f5f9;
        }
        .stat-label { font-weight: 500; color: #475569; }
        .stat-value { font-weight: 800; color: #2563eb; font-size: 1.1rem; }
        .grade-highlight { color: #16a34a !important; }

        .remarks-area { background: #fffbeb; border: 1px solid #fef3c7; padding: 1.5rem; border-radius: 12px; }
        .remarks-title { font-weight: 700; color: #92400e; font-size: 0.9rem; margin-bottom: 8px; display: block; }
        .remarks-content { font-size: 0.95rem; line-height: 1.6; color: #78350f; margin: 0; }

        /* Modal */
        .modal-bg { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
        .modal-box { background: white; padding: 2.5rem; border-radius: 1.5rem; width: 380px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .check-icon { background: #dcfce7; color: #15803d; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .info-grid { grid-template-columns: 1fr; } .paper-card { padding: 1.5rem; } }
      `}</style>

      <div className="report-header">
        <div>
          <h1>Academic Report</h1>
          <p>Official performance summary for the semester</p>
        </div>
        <button onClick={handleDownload} className="btn-download">
          <Download size={20} /> Download PDF
        </button>
      </div>

      <div className="paper-card">
        <div className="school-branding">
          <h2>Rajasinghe Central College</h2>
          <h3>Student Progress Report</h3>
          <p>Academic Session: {report?.term || "2024/2025 Term I"}</p>
        </div>

        <div className="info-grid">
          <div className="info-cell">
            <div className="icon-circle">
              <User size={22} />
            </div>
            <div>
              <p className="cell-label">Student Name</p>
              <p className="cell-value">{student?.fullName || "N/A"}</p>
            </div>
          </div>
          <div className="info-cell">
            <div className="icon-circle">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="cell-label">Grade & Class</p>
              <p className="cell-value">
                {student?.classEntity?.className || "N/A"}
              </p>
            </div>
          </div>
          <div className="info-cell">
            <div className="icon-circle">
              <Calendar size={22} />
            </div>
            <div>
              <p className="cell-label">Student ID</p>
              <p className="cell-value">{student?.studentId || "N/A"}</p>
            </div>
          </div>
          <div className="info-cell">
            <div className="icon-circle">
              <Award size={22} />
            </div>
            <div>
              <p className="cell-label">Status</p>
              <p className="cell-value" style={{ color: "#16a34a" }}>
                Active Student
              </p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3 className="section-heading">
            <FileText size={20} color="#2563eb" /> Performance Summary
          </h3>
          <div className="stat-row">
            <span className="stat-label">Attendance Rate</span>
            <span className="stat-value">
              {report?.attendancePercentage || 0}%
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Marks Average</span>
            <span className="stat-value">84.5%</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Overall Grade</span>
            <span className="stat-value grade-highlight">
              {report?.overallGrade || "A"}
            </span>
          </div>
        </div>

        <div className="remarks-section">
          <h3 className="section-heading">Teacher's Observations</h3>
          <div className="remarks-area">
            <span className="remarks-title">Comments:</span>
            <p className="remarks-content">
              {report?.teacherComments ||
                "The student has shown exceptional progress this term. Continued focus on mathematics will yield even better results."}
            </p>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <div className="modal-bg">
          <div className="modal-box">
            <div className="check-icon">
              <CheckCircle size={32} />
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Request Successful!
            </h2>
            <p style={{ color: "#64748b", marginBottom: "2rem" }}>
              Your report PDF is being generated and will start downloading
              automatically.
            </p>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="btn-download"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
