import React, { useState, useEffect, useCallback } from "react";
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  Search, 
  Calendar, 
  ArrowRight, 
  Trash2, 
  UserPlus,
  AlertCircle
} from "lucide-react";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}`;

export default function SectionHeadClassManagement() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classSubjects, setClassSubjects] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  
  // DOB range for loading student pool
  const [dobFrom, setDobFrom] = useState("");
  const [dobTo, setDobTo] = useState("");
  const [studentPool, setStudentPool] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [poolLoading, setPoolLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const subRole = localStorage.getItem("subRole") || "Section Head Grade 6";
  
  // Extract grade number (e.g. "Section Head Grade 6" -> "6")
  const getSectionGrade = () => {
    const match = subRole.match(/Grade\s+(\d+)/i);
    return match ? match[1] : null;
  };
  
  const sectionGrade = getSectionGrade();

  const authHeaders = () => ({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  const showNotification = (msg, type = "success") => {
    if (type === "success") {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // 1. Load classes for the Section Head's grade that are enabled
  const loadClasses = useCallback(async () => {
    if (!sectionGrade) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/classes`, { headers: authHeaders() });
      if (res.ok) {
        const all = await res.json();
        // Filter: enabled for Section Head AND matching the section head's grade
        const filtered = all.filter(c => c.secEnabled && c.grade === sectionGrade);
        setClasses(filtered);
      }
    } catch {
      showNotification("Failed to load classes", "error");
    } finally {
      setLoading(false);
    }
  }, [sectionGrade]);

  // 2. Load subjects assigned to the class
  const loadClassSubjects = async (classId) => {
    try {
      const res = await fetch(`${API}/api/classes/${classId}/subjects`, { headers: authHeaders() });
      if (res.ok) {
        setClassSubjects(await res.json());
      }
    } catch {
      console.error("Failed to load class subjects");
    }
  };

  // 3. Load students currently assigned to this class
  const loadClassRoster = async (classId) => {
    try {
      const res = await fetch(`${API}/api/classes/${classId}/students`, { headers: authHeaders() });
      if (res.ok) {
        setAssignedStudents(await res.json());
      }
    } catch {
      console.error("Failed to load class roster");
    }
  };

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  // Handle Class Selection
  const handleSelectClass = async (cls) => {
    setSelectedClass(cls);
    await Promise.all([
      loadClassSubjects(cls.classId),
      loadClassRoster(cls.classId)
    ]);
  };

  // Load student pool by DOB range
  const handleLoadPool = async (e) => {
    e.preventDefault();
    if (!dobFrom || !dobTo) {
      showNotification("Please select both Date of Birth From and To", "error");
      return;
    }
    setPoolLoading(true);
    try {
      const res = await fetch(`${API}/api/classes/pool?dobFrom=${dobFrom}&dobTo=${dobTo}`, {
        headers: authHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setStudentPool(data);
        showNotification(`Loaded ${data.length} students into the pool!`);
      } else {
        showNotification("Failed to load student pool", "error");
      }
    } catch {
      showNotification("Error connecting to server", "error");
    } finally {
      setPoolLoading(false);
    }
  };

  // Assign Student to Class
  const handleAssignStudent = async (studentId) => {
    if (!selectedClass) return;
    if (assignedStudents.length >= 50) {
      showNotification("Cannot assign. Class limit of 50 students reached!", "error");
      return;
    }

    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/assign/${studentId}`, {
        method: "PUT",
        headers: authHeaders()
      });
      const data = await res.json();
      if (res.ok) {
        showNotification("Student assigned successfully!");
        // Remove from pool list in UI
        setStudentPool(prev => prev.filter(s => s.studentId !== studentId));
        // Refresh class roster
        await loadClassRoster(selectedClass.classId);
      } else {
        showNotification(data.error || "Failed to assign student", "error");
      }
    } catch {
      showNotification("Error assigning student", "error");
    }
  };

  // Remove Student from Class
  const handleRemoveStudent = async (studentId) => {
    if (!selectedClass) return;
    if (!window.confirm("Are you sure you want to remove this student from the class?")) return;

    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/remove/${studentId}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      const data = await res.json();
      if (res.ok) {
        showNotification("Student removed from class successfully!");
        // Refresh class roster
        await loadClassRoster(selectedClass.classId);
      } else {
        showNotification(data.error || "Failed to remove student", "error");
      }
    } catch {
      showNotification("Error removing student", "error");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Messages */}
      {successMsg && (
        <div style={{ position: "fixed", top: "20px", right: "20px", backgroundColor: "#10b981", color: "white", padding: "12px 24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", zIndex: 9999, fontWeight: "600" }}>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ position: "fixed", top: "20px", right: "20px", backgroundColor: "#ef4444", color: "white", padding: "12px 24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", zIndex: 9999, fontWeight: "600" }}>
          {errorMsg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Class Division & Roster Management</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" }}>
            Section Grade: <strong>Grade {sectionGrade || "N/A"}</strong>
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "24px" }}>
        
        {/* LEFT COLUMN: CLASSES LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="content-card" style={{ padding: "20px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
              Enabled Classes ({classes.length})
            </h3>
            
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>Loading classes...</div>
            ) : classes.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#94a3b8", fontStyle: "italic", fontSize: "13px" }}>
                No classes have been enabled for Section Head {sectionGrade ? `Grade ${sectionGrade}` : ""} yet.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {classes.map(cls => (
                  <div
                    key={cls.classId}
                    onClick={() => handleSelectClass(cls)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: selectedClass?.classId === cls.classId ? "#3b82f6" : "#e2e8f0",
                      backgroundColor: selectedClass?.classId === cls.classId ? "#eff6ff" : "white",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: "15px", color: selectedClass?.classId === cls.classId ? "#1d4ed8" : "#0f172a" }}>
                        Grade {cls.grade}-{cls.className}
                      </strong>
                      <span style={{ fontSize: "11px", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", color: "#64748b" }}>
                        {cls.year}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                      Teacher: {cls.teacher ? cls.teacher.fullName : "Not Assigned"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL WORKSPACE */}
        <div>
          {selectedClass ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* CLASS SUMMARY CARD */}
              <div className="content-card" style={{ padding: "24px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px", marginBottom: "15px" }}>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                      Class {selectedClass.grade}-{selectedClass.className} ({selectedClass.year})
                    </h2>
                    <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" }}>
                      Class Teacher: <strong>{selectedClass.teacher ? selectedClass.teacher.fullName : "None"}</strong>
                    </p>
                  </div>
                  
                  {/* Capacity Indicator */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: assignedStudents.length >= 50 ? "#ef4444" : "#475569" }}>
                      Capacity: {assignedStudents.length} / 50 Students
                    </div>
                    <div style={{ width: "150px", height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", marginTop: "6px", overflow: "hidden" }}>
                      <div style={{ 
                        width: `${Math.min((assignedStudents.length / 50) * 100, 100)}%`, 
                        height: "100%", 
                        backgroundColor: assignedStudents.length >= 50 ? "#ef4444" : "#10b981", 
                        transition: "width 0.3s" 
                      }} />
                    </div>
                  </div>
                </div>

                {/* Assigned Subjects Summary */}
                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase" }}>
                    Assigned Subjects & Teachers
                  </h4>
                  {classSubjects.length === 0 ? (
                    <div style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic" }}>No subjects assigned to this class yet.</div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {classSubjects.map(sub => (
                        <div 
                          key={sub.subjectId} 
                          style={{ 
                            padding: "6px 12px", 
                            backgroundColor: "#f8fafc", 
                            border: "1px solid #e2e8f0", 
                            borderRadius: "20px", 
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          <span style={{ fontWeight: "600", color: "#334155" }}>{sub.subjectName}</span>
                          <span style={{ color: "#94a3b8" }}>|</span>
                          <span style={{ color: "#64748b" }}>{sub.teacherName || "No Teacher"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* TWO GRID WORKSPACE: ROSTER AND POOL */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }}>
                
                {/* ROSTER TABLE (Currently Assigned) */}
                <div className="content-card" style={{ padding: "20px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "12px", marginBottom: "15px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>
                      Class Roster ({assignedStudents.length})
                    </h3>
                  </div>

                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                          <th style={{ padding: "8px 10px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", textAlign: "left" }}>ID / Name</th>
                          <th style={{ padding: "8px 10px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", textAlign: "center", width: "50px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignedStudents.map(student => (
                          <tr key={student.studentId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px 8px" }}>
                              <div style={{ fontWeight: "600", fontSize: "13px", color: "#1e293b" }}>{student.fullName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>ID: {student.studentId} | DOB: {student.dateOfBirth}</div>
                            </td>
                            <td style={{ padding: "10px 8px", textAlign: "center" }}>
                              <button
                                onClick={() => handleRemoveStudent(student.studentId)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  padding: "4px",
                                  borderRadius: "4px"
                                }}
                                title="Remove from class"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {assignedStudents.length === 0 && (
                          <tr>
                            <td colSpan="2" style={{ padding: "30px 10px", textAlign: "center", color: "#94a3b8", fontStyle: "italic", fontSize: "13px" }}>
                              No students assigned to this class yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* STUDENT POOL (Search & Add) */}
                <div className="content-card" style={{ padding: "20px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "12px", marginBottom: "15px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>
                      Unassigned Students Pool
                    </h3>
                  </div>

                  {/* DOB Range Inputs */}
                  <form onSubmit={handleLoadPool} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>DOB From</label>
                        <input
                          type="date"
                          value={dobFrom}
                          onChange={(e) => setDobFrom(e.target.value)}
                          required
                          style={{ width: "100%", padding: "6px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>DOB To</label>
                        <input
                          type="date"
                          value={dobTo}
                          onChange={(e) => setDobTo(e.target.value)}
                          required
                          style={{ width: "100%", padding: "6px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={poolLoading}
                      style={{
                        padding: "8px",
                        backgroundColor: "#0f172a",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "12px",
                        cursor: "pointer"
                      }}
                    >
                      {poolLoading ? "Loading..." : "Load Students Pool"}
                    </button>
                  </form>

                  {/* Pool Table */}
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                          <th style={{ padding: "8px 10px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", textAlign: "left" }}>Name / DOB</th>
                          <th style={{ padding: "8px 10px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", textAlign: "center", width: "50px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentPool.map(student => (
                          <tr key={student.studentId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px 8px" }}>
                              <div style={{ fontWeight: "600", fontSize: "13px", color: "#1e293b" }}>{student.fullName}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>ID: {student.studentId} | DOB: {student.dateOfBirth}</div>
                            </td>
                            <td style={{ padding: "10px 8px", textAlign: "center" }}>
                              <button
                                onClick={() => handleAssignStudent(student.studentId)}
                                disabled={assignedStudents.length >= 50}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: assignedStudents.length >= 50 ? "#cbd5e1" : "#2563eb",
                                  cursor: assignedStudents.length >= 50 ? "not-allowed" : "pointer",
                                  padding: "4px"
                                }}
                                title={assignedStudents.length >= 50 ? "Class Full" : "Assign to Class"}
                              >
                                <UserPlus size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {studentPool.length === 0 && (
                          <tr>
                            <td colSpan="2" style={{ padding: "30px 10px", textAlign: "center", color: "#94a3b8", fontStyle: "italic", fontSize: "13px" }}>
                              {dobFrom && dobTo ? "No unassigned students found in this range." : "Select DOB range and load pool."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="content-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px", color: "#64748b", minHeight: "450px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <BookOpen size={48} style={{ color: "#94a3b8", marginBottom: "16px" }} />
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>Roster & Student Assignment</h3>
              <p style={{ margin: 0, fontWeight: "500", fontSize: "14px", textAlign: "center", color: "#64748b" }}>
                Select an enabled class from the list on the left to start assigning students and managing the class roster.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
