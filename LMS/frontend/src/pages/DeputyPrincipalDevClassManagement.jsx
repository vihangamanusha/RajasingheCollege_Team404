import React, { useState, useEffect, useCallback } from "react";
import { 
  BookOpen, 
  UserPlus, 
  Trash2, 
  UserCheck, 
  Search, 
  Plus, 
  X,
  ChevronDown,
  UserX
} from "lucide-react";

const API = "http://localhost:8080";

export default function DeputyPrincipalDevClassManagement() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classSubjects, setClassSubjects] = useState([]);
  const [curriculumSubjects, setCurriculumSubjects] = useState([]);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  
  // Teacher selection states for a specific subject
  const [activeSubjectForTeacher, setActiveSubjectForTeacher] = useState(null); // subject object
  const [subjectTeachers, setSubjectTeachers] = useState([]);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");
  const [showTeacherDropdownId, setShowTeacherDropdownId] = useState(null); // subjectId
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  // 1. Load classes enabled for development
  const loadClasses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/classes`, { headers: authHeaders() });
      if (res.ok) {
        const all = await res.json();
        // Only display classes that are enabled for development
        setClasses(all.filter(c => c.devEnabled));
      }
    } catch {
      showNotification("Failed to load classes", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Load curriculum subjects
  const loadCurriculumSubjects = async () => {
    try {
      const res = await fetch(`${API}/api/curriculum-subjects`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setCurriculumSubjects(data);
      }
    } catch {
      console.error("Failed to load curriculum subjects");
    }
  };

  // 3. Load subjects assigned to selected class
  const loadClassSubjects = async (classId) => {
    try {
      const res = await fetch(`${API}/api/classes/${classId}/subjects`, { headers: authHeaders() });
      if (res.ok) {
        setClassSubjects(await res.json());
      }
    } catch {
      showNotification("Failed to load subjects for this class", "error");
    }
  };

  useEffect(() => {
    loadClasses();
    loadCurriculumSubjects();
  }, [loadClasses]);

  // Handle class selection
  const handleSelectClass = async (cls) => {
    setSelectedClass(cls);
    setShowTeacherDropdownId(null);
    setActiveSubjectForTeacher(null);
    await loadClassSubjects(cls.classId);
  };

  // Add multiple subjects to class
  const handleAddSubject = async () => {
    if (!selectedClass || selectedSubjects.length === 0) return;
    try {
      const promises = selectedSubjects.map(subjectName => 
        fetch(`${API}/api/classes/${selectedClass.classId}/subjects`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ subjectName })
        })
      );
      const responses = await Promise.all(promises);
      
      let successCount = 0;
      let errorMessages = [];
      for (const res of responses) {
        const data = await res.json();
        if (res.ok) {
          successCount++;
        } else {
          errorMessages.push(data.error || "Failed to add subject");
        }
      }
      
      if (successCount > 0) {
        showNotification(`Successfully added ${successCount} subjects!`);
      }
      if (errorMessages.length > 0) {
        showNotification(`Errors: ${[...new Set(errorMessages)].join(", ")}`, "error");
      }
      
      setShowAddSubjectModal(false);
      setSelectedSubjects([]);
      await loadClassSubjects(selectedClass.classId);
    } catch {
      showNotification("Error adding subjects", "error");
    }
  };

  // Remove subject from class
  const handleRemoveSubject = async (subjectId, subjectName) => {
    if (!selectedClass) return;
    if (!window.confirm(`Are you sure you want to remove "${subjectName}" from this class?`)) return;
    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/subjects/${subjectId}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      const data = await res.json();
      if (res.ok) {
        showNotification("Subject removed successfully");
        if (showTeacherDropdownId === subjectId) {
          setShowTeacherDropdownId(null);
          setActiveSubjectForTeacher(null);
        }
        await loadClassSubjects(selectedClass.classId);
      } else {
        showNotification(data.error || "Failed to remove subject", "error");
      }
    } catch {
      showNotification("Error removing subject", "error");
    }
  };

  // Open teacher assignment dropdown for subject
  const handleOpenTeacherAllocation = async (subj) => {
    if (showTeacherDropdownId === subj.subjectId) {
      setShowTeacherDropdownId(null);
      setActiveSubjectForTeacher(null);
      return;
    }
    
    setShowTeacherDropdownId(subj.subjectId);
    setActiveSubjectForTeacher(subj);
    setTeacherSearchQuery("");
    
    // Fetch teachers specializing in this subject
    try {
      const res = await fetch(`${API}/api/classes/subject-teachers?subjectName=${encodeURIComponent(subj.subjectName)}`, {
        headers: authHeaders()
      });
      if (res.ok) {
        setSubjectTeachers(await res.json());
      }
    } catch {
      showNotification("Failed to load teachers specializing in this subject", "error");
    }
  };

  // Assign teacher to subject
  const handleAssignTeacher = async (teacherId) => {
    if (!selectedClass || !activeSubjectForTeacher) return;
    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/subjects/${activeSubjectForTeacher.subjectId}/assign-teacher/${teacherId}`, {
        method: "PUT",
        headers: authHeaders()
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || "Teacher assigned successfully!");
        setShowTeacherDropdownId(null);
        setActiveSubjectForTeacher(null);
        await loadClassSubjects(selectedClass.classId);
      } else {
        showNotification(data.error || "Failed to assign teacher", "error");
      }
    } catch {
      showNotification("Error assigning teacher", "error");
    }
  };

  // Unassign teacher from subject
  const handleUnassignTeacher = async (subj) => {
    if (!selectedClass) return;
    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/subjects/${subj.subjectId}/unassign-teacher`, {
        method: "PUT",
        headers: authHeaders()
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || "Teacher unassigned successfully!");
        if (showTeacherDropdownId === subj.subjectId) {
          setShowTeacherDropdownId(null);
          setActiveSubjectForTeacher(null);
        }
        await loadClassSubjects(selectedClass.classId);
      } else {
        showNotification(data.error || "Failed to unassign teacher", "error");
      }
    } catch {
      showNotification("Error unassigning teacher", "error");
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Toast notifications */}
      {successMsg && (
        <div style={{ position: "fixed", top: "20px", right: "20px", padding: "12px 24px", backgroundColor: "#10b981", color: "white", borderRadius: "8px", boxShadow: "0 4px 12px rgba(16,185,129,0.3)", zIndex: 9999, fontWeight: "600" }}>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ position: "fixed", top: "20px", right: "20px", padding: "12px 24px", backgroundColor: "#ef4444", color: "white", borderRadius: "8px", boxShadow: "0 4px 12px rgba(239,68,68,0.3)", zIndex: 9999, fontWeight: "600" }}>
          {errorMsg}
        </div>
      )}

      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <div style={{ textAlign: "left" }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>Subjects & Teachers Allocation</h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>Allocate curriculum subjects and specialize teachers to active classes.</p>
        </div>
        <button
          onClick={loadClasses}
          style={{ padding: "8px 16px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", color: "#334155" }}
        >
          Refresh Classes
        </button>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "30px", alignItems: "start" }}>
        
        {/* CLASSES PANEL */}
        <div className="content-card" style={{ padding: "24px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "17px", fontWeight: "700", color: "#0f172a", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
            Development Enabled Classes ({classes.length})
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "500px", overflowY: "auto" }}>
            {classes.length === 0 ? (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0", fontStyle: "italic" }}>
                No classes enabled for development. Enable classes on the administrative side first.
              </div>
            ) : (
              classes.map((cls) => {
                const isSelected = selectedClass?.classId === cls.classId;
                return (
                  <div
                    key={cls.classId}
                    style={{
                      padding: "16px",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                      backgroundColor: isSelected ? "#f8fafc" : "white",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onClick={() => handleSelectClass(cls)}
                  >
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>{cls.className}</h4>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      Grade: {cls.grade} &nbsp;·&nbsp; Year: {cls.year}
                    </div>
                    <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
                      Class Teacher: <span style={{ fontWeight: "600", color: cls.teacherName ? "#3b82f6" : "#94a3b8" }}>{cls.teacherName || "Not assigned"}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* DETAIL & SUBJECTS ALLOCATION PANEL */}
        {selectedClass ? (
          <div className="content-card" style={{ padding: "24px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
                Class Subjects: {selectedClass.className}
              </h3>
              <button
                onClick={() => setShowAddSubjectModal(true)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <Plus size={16} /> Add Subject
              </button>
            </div>

            {/* List of class subjects */}
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {classSubjects.length === 0 ? (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0", fontStyle: "italic" }}>
                  No subjects assigned to this class yet. Click "Add Subject" to begin.
                </div>
              ) : (
                classSubjects.map((subj) => (
                  <div 
                    key={subj.subjectId}
                    style={{
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#f8fafc"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>{subj.subjectName}</span>
                      <button
                        onClick={() => handleRemoveSubject(subj.subjectId, subj.subjectName)}
                        style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                        title="Remove subject"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: "13px", color: "#475569" }}>
                        Teacher: {subj.teacherName ? (
                          <span style={{ fontWeight: "600", color: "#10b981" }}>{subj.teacherName} ({subj.teacherId})</span>
                        ) : (
                          <span style={{ color: "#94a3b8", fontStyle: "italic" }}>No subject teacher assigned</span>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        {subj.teacherName && (
                          <button
                            onClick={() => handleUnassignTeacher(subj)}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#f1f5f9",
                              border: "1px solid #cbd5e1",
                              borderRadius: "4px",
                              fontSize: "11px",
                              color: "#64748b",
                              fontWeight: "600",
                              cursor: "pointer"
                            }}
                          >
                            Remove Teacher
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenTeacherAllocation(subj)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "2px"
                          }}
                        >
                          <UserPlus size={12} /> {subj.teacherName ? "Change" : "Assign"}
                        </button>
                      </div>
                    </div>

                    {/* Teacher Dropdown Selector Table (Specific to this subject) */}
                    {showTeacherDropdownId === subj.subjectId && (
                      <div style={{
                        marginTop: "12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        padding: "12px",
                        backgroundColor: "white",
                        boxSizing: "border-box"
                      }}>
                        <h4 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "600", color: "#475569" }}>
                          Select {subj.subjectName} Teacher
                        </h4>
                        
                        <div style={{ marginBottom: "8px" }}>
                          <input
                            type="text"
                            placeholder="Search teacher by name or ID..."
                            value={teacherSearchQuery}
                            onChange={(e) => setTeacherSearchQuery(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #cbd5e1",
                              borderRadius: "6px",
                              fontSize: "12px",
                              outline: "none",
                              boxSizing: "border-box"
                            }}
                          />
                        </div>

                        <div style={{ 
                          maxHeight: "150px", 
                          overflowY: "auto", 
                          border: "1px solid #cbd5e1", 
                          borderRadius: "6px", 
                          backgroundColor: "#f8fafc"
                        }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
                            <thead>
                              <tr style={{ backgroundColor: "#e2e8f0", color: "#334155", fontWeight: "600", borderBottom: "1px solid #cbd5e1" }}>
                                <th style={{ padding: "6px 8px" }}>ID</th>
                                <th style={{ padding: "6px 8px" }}>Name</th>
                                <th style={{ padding: "6px 8px" }}>Specialization</th>
                                <th style={{ padding: "6px 8px", textAlign: "center" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subjectTeachers
                                .filter(t => {
                                  const query = teacherSearchQuery.toLowerCase();
                                  const matchesName = t.fullName && t.fullName.toLowerCase().includes(query);
                                  const matchesId = t.teacherId && String(t.teacherId).toLowerCase().includes(query);
                                  return matchesName || matchesId;
                                })
                                .map((t) => {
                                  const isCurrent = subj.teacherId === t.teacherId;
                                  return (
                                    <tr 
                                      key={t.teacherId} 
                                      style={{ 
                                        borderBottom: "1px solid #cbd5e1", 
                                        backgroundColor: isCurrent ? "#eff6ff" : "white"
                                      }}
                                    >
                                      <td style={{ padding: "6px 8px", fontWeight: "600", color: "#334155" }}>{t.teacherId}</td>
                                      <td style={{ padding: "6px 8px", color: "#475569" }}>{t.fullName}</td>
                                      <td style={{ padding: "6px 8px", color: "#64748b" }}>{t.subjectSpecialization}</td>
                                      <td style={{ padding: "6px 8px", textAlign: "center" }}>
                                        <button
                                          type="button"
                                          onClick={() => handleAssignTeacher(t.teacherId)}
                                          style={{
                                            padding: "3px 6px",
                                            backgroundColor: isCurrent ? "#ef4444" : "#10b981",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            fontSize: "10px",
                                            fontWeight: "600",
                                            cursor: "pointer"
                                          }}
                                          disabled={isCurrent}
                                        >
                                          {isCurrent ? "Assigned" : "Assign"}
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              }
                              {subjectTeachers.filter(t => {
                                const query = teacherSearchQuery.toLowerCase();
                                const matchesName = t.fullName && t.fullName.toLowerCase().includes(query);
                                const matchesId = t.teacherId && String(t.teacherId).toLowerCase().includes(query);
                                return matchesName || matchesId;
                              }).length === 0 && (
                                <tr>
                                  <td colSpan="4" style={{ padding: "15px 8px", textAlign: "center", color: "#94a3b8", fontStyle: "italic" }}>
                                    No specializing subject teachers found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="content-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", color: "#64748b", minHeight: "350px", backgroundColor: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <BookOpen size={40} style={{ color: "#94a3b8", marginBottom: "12px" }} />
            <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", textAlign: "center" }}>
              Select a class from the list to manage subjects and assign teachers.
            </p>
          </div>
        )}

      </div>

      {/* ADD SUBJECT MODAL */}
      {showAddSubjectModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", width: "400px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Add Subjects to Class</h3>
              <button 
                onClick={() => {
                  setShowAddSubjectModal(false);
                  setSelectedSubjects([]);
                }}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>
                Select Subjects from Curriculum
              </label>
              <div style={{ 
                maxHeight: "200px", 
                overflowY: "auto", 
                border: "1px solid #cbd5e1", 
                borderRadius: "8px", 
                padding: "10px",
                backgroundColor: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch"
              }}>
                {curriculumSubjects.map(s => {
                  const isAssigned = classSubjects.some(cs => cs.subjectName.toLowerCase() === s.toLowerCase());
                  const isChecked = selectedSubjects.includes(s);
                  
                  return (
                    <label 
                      key={s} 
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "flex-start",
                        textAlign: "left",
                        gap: "12px", 
                        padding: "8px 12px", 
                        margin: "4px 0",
                        borderRadius: "6px",
                        backgroundColor: isAssigned ? "#f1f5f9" : "transparent",
                        cursor: isAssigned ? "not-allowed" : "pointer",
                        opacity: isAssigned ? 0.7 : 1,
                        fontSize: "14px",
                        color: "#1e293b",
                        width: "100%",
                        boxSizing: "border-box"
                      }}
                    >
                      <input
                        type="checkbox"
                        disabled={isAssigned}
                        checked={isAssigned || isChecked}
                        style={{ 
                          width: "16px", 
                          height: "16px", 
                          margin: 0, 
                          padding: 0, 
                          cursor: isAssigned ? "not-allowed" : "pointer" 
                        }}
                        onChange={(e) => {
                          if (isAssigned) return;
                          if (e.target.checked) {
                            setSelectedSubjects(prev => [...prev, s]);
                          } else {
                            setSelectedSubjects(prev => prev.filter(name => name !== s));
                          }
                        }}
                      />
                      <span style={{ margin: 0, padding: 0, lineHeight: "1.2", textAlign: "left" }}>
                        {s} {isAssigned && <span style={{ fontSize: "11px", color: "#64748b", fontStyle: "italic", marginLeft: "4px" }}>(Already added)</span>}
                      </span>
                    </label>
                  );
                })}
                {curriculumSubjects.length === 0 && (
                  <div style={{ color: "#94a3b8", textAlign: "center", padding: "10px", fontSize: "13px" }}>
                    No active curriculum subjects found.
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setShowAddSubjectModal(false);
                  setSelectedSubjects([]);
                }}
                style={{ flex: 1, padding: "10px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "8px", fontWeight: "600", fontSize: "13px", cursor: "pointer", color: "#475569" }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                disabled={selectedSubjects.length === 0}
                style={{ flex: 1, padding: "10px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}
              >
                Add Subjects
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
