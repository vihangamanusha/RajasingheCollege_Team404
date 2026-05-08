import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Video, Download, Loader2, BookOpen } from "lucide-react";

export default function StudentMaterials() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/student/documents",
        );
        setDocs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  if (loading)
    return (
      <div className="loading-state">
        <Loader2 className="spin" />
      </div>
    );

  return (
    <div className="materials-wrapper">
      <style>{`
        .materials-wrapper { padding: 2rem; font-family: 'Inter', sans-serif; background: #f8f9fc; min-height: 100vh; }
        .header-section { margin-bottom: 2rem; }
        .header-section h1 { font-size: 1.75rem; color: #1e293b; margin: 0; }
        .header-section p { color: #64748b; margin-top: 5px; }

        .materials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .material-card { 
          background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; 
          padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; transition: 0.3s;
        }
        .material-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px rgba(0,0,0,0.05); border-color: #2563eb; }
        
        .icon-container { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pdf-icon { background: #fee2e2; color: #dc2626; }
        .video-icon { background: #dbeafe; color: #2563eb; }

        .content-box { flex: 1; }
        .content-box h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }
        .content-box p { margin: 4px 0 0 0; font-size: 0.85rem; color: #64748b; }

        .dl-button { 
          background: #f1f5f9; color: #1e293b; border: none; width: 40px; height: 40px; 
          border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s;
        }
        .dl-button:hover { background: #2563eb; color: #fff; }
      `}</style>

      <div className="header-section">
        <h1>Study Materials</h1>
        <p>Access notes and video tutorials uploaded by your teachers.</p>
      </div>

      <div className="materials-grid">
        {docs.map((doc) => (
          <div key={doc.documentId} className="material-card">
            <div
              className={`icon-container ${doc.filePath.endsWith(".pdf") ? "pdf-icon" : "video-icon"}`}
            >
              {doc.filePath.endsWith(".pdf") ? (
                <FileText size={24} />
              ) : (
                <Video size={24} />
              )}
            </div>
            <div className="content-box">
              <h3>{doc.title}</h3>
              <p>{doc.description || "Educational Resource"}</p>
            </div>
            <button
              className="dl-button"
              onClick={() =>
                window.open(
                  `http://localhost:8080/files/download/${doc.filePath}`,
                )
              }
              title="Download File"
            >
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
