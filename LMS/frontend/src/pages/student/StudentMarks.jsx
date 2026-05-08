import React, { useState, useEffect } from "react";
import axios from "axios";
import { Award, Loader2 } from "lucide-react";

export default function StudentMarks({ studentId }) {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/student/${studentId}/marks`,
        );
        setMarks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchMarks();
  }, [studentId]);

  if (loading)
    return (
      <div className="loading-state">
        <Loader2 className="spin" />
      </div>
    );

  return (
    <div className="marks-wrapper">
      <style>{`
        .marks-wrapper { padding: 2rem; font-family: 'Inter', sans-serif; background: #f8f9fc; min-height: 100vh; }
        .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.75rem; color: #1e293b; margin: 0; }
        
        .table-card { 
          background: #ffffff; border-radius: 1rem; border: 1px solid #e2e8f0; 
          padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow-x: auto; 
        }
        .marks-table { width: 100%; border-collapse: collapse; }
        .marks-table th { text-align: left; padding: 1rem; color: #64748b; border-bottom: 2px solid #f1f5f9; font-size: 0.85rem; text-transform: uppercase; }
        .marks-table td { padding: 1.25rem 1rem; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
        .marks-table tr:hover { background: #f8fafc; }
        
        .score-text { color: #2563eb; font-weight: 700; }
        .summary-box { 
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); 
          color: white; padding: 2rem; border-radius: 1rem; display: flex; gap: 4rem; margin-top: 2rem; 
        }
        .summary-item p { margin: 0; opacity: 0.8; font-size: 0.875rem; }
        .summary-item h2 { margin: 5px 0 0 0; font-size: 2.25rem; }
        .loading-state { display: flex; height: 300px; align-items: center; justify-content: center; }
        .spin { animation: spin 1s linear infinite; color: #2563eb; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div className="page-header">
        <Award size={32} color="#2563eb" />
        <h1>My Academic Marks</h1>
      </div>

      <div className="table-card">
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Term</th>
              <th style={{ textAlign: "right" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {marks.length > 0 ? (
              marks.map((m) => (
                <tr key={m.markId}>
                  <td style={{ fontWeight: 600 }}>{m.subjectName}</td>
                  <td>{m.term}</td>
                  <td style={{ textAlign: "right" }} className="score-text">
                    {m.assignmentMark}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#64748b",
                  }}
                >
                  No marks recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="summary-box">
        <div className="summary-item">
          <p>Overall Average</p>
          <h2></h2>
        </div>
        <div className="summary-item">
          <p>Overall Grade</p>
          <h2></h2>
        </div>
      </div>
    </div>
  );
}
