import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, ClipboardList, Download, BookOpen, Loader2 } from 'lucide-react';
import './styles/StudentDashboard.css';

const StudentDashboard = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/student/${studentId}`);
        setStudent(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    if(studentId) fetchData();
  }, [studentId]);

  if (loading) return <div className="loader"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="student-dashboard">
      <div className="welcome-banner">
        <Award size={48} className="banner-icon" />
        <div>
          <h1>Welcome, {student?.fullName || 'Student'}!</h1>
          <p>{student?.classEntity?.className} | ID: {student?.studentId}</p>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="action-card" onClick={() => window.location.href='/student/marks'}>
          <ClipboardList className="text-blue-600" />
          <h3>View My Marks</h3>
        </div>
        <div className="action-card" onClick={() => window.open(`http://localhost:8080/api/student/${studentId}/report/pdf`)}>
          <Download className="text-orange-500" />
          <h3>Download Report (PDF)</h3>
        </div>
        <div className="action-card" onClick={() => window.location.href='/student/materials'}>
          <BookOpen className="text-green-600" />
          <h3>Study Materials</h3>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;