import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import './styles/StudentTable.css';

const StudentMarks = ({ studentId }) => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/student/${studentId}/marks`)
      .then(res => setMarks(res.data))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <div className="data-card">
      <h2>My Academic Marks</h2>
      <table className="student-table">
        <thead>
          <tr><th>Subject</th><th>Term</th><th className="text-right">Marks</th></tr>
        </thead>
        <tbody>
          {marks.map(m => (
            <tr key={m.markId}>
              <td>{m.subjectName}</td>
              <td>{m.term}</td>
              <td className="text-right font-bold">{m.assignmentMark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMarks;