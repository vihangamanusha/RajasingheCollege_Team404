import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import './styles/StudentTable.css';

const StudentMaterials = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/student/documents')
      .then(res => setDocs(res.data))
      .catch(err => console.error("Docs error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader-container"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="data-card">
      <h2 className="page-title">Study Materials</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {docs.length > 0 ? docs.map(doc => (
            <tr key={doc.documentId}>
              <td className="flex-cell"><FileText size={18} className="text-red-500"/> {doc.title}</td>
              <td className="text-gray">{doc.description}</td>
              <td className="text-right">
                <div className="action-buttons">
                  <button className="btn-icon text-blue-500"><Eye size={18} /></button>
                  <a href={`http://localhost:8080/files/download/${doc.filePath}`} download className="btn-icon text-orange-500">
                    <Download size={18} />
                  </a>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="3" className="no-data">No documents found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMaterials;