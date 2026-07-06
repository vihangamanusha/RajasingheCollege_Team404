import { useState, useEffect, useCallback } from "react";
import "./AdminClassManagement.css";
import {
  FiBook,
  FiPlus,
  FiSearch,
  FiUsers,
  FiTrash2,
  FiUnlock,
  FiLock,
  FiUserCheck,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}`;

// Helper to get auth headers
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export default function AdminClassManagement() {
  // ── Filter State ──────────────────────────────────────────
  const [dobFrom, setDobFrom] = useState("");
  const [dobTo, setDobTo] = useState("");
  const [batchLoaded, setBatchLoaded] = useState(false);

  // ── Data State ────────────────────────────────────────────
  const [classes, setClasses] = useState([]);
  const [pool, setPool] = useState([]);
  const [roster, setRoster] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // ── UI State ──────────────────────────────────────────────
  const [poolSearch, setPoolSearch] = useState("");
  const [rosterSearch, setRosterSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // ── Create Class Modal ────────────────────────────────────
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClass, setNewClass] = useState({
    grade: "9",
    section: "A",
    year: 2026,
    teacherId: "",
  });
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");
  const [detailsTeacherSearchQuery, setDetailsTeacherSearchQuery] = useState("");
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
  const [showDetailsTeacherDropdown, setShowDetailsTeacherDropdown] = useState(false);

  // Role detection
  const userSubRole = localStorage.getItem("subRole") || "";
  const userRole = localStorage.getItem("role") || "";
  const isAdmin = userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "technical_officer" || userRole.toLowerCase() === "role_technical_officer";
  const isDeputyAdmin = userSubRole.toLowerCase().includes("deputy principal") && !isAdmin;

  // ── LOAD ALL CLASSES FOR DEPUTY ────────────────────────────
  const loadAllClassesForDeputy = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/classes`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
      }
    } catch {
      showToast("Failed to load classes", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── LOAD AVAILABLE SUBJECT TEACHERS ────────────────────────
  const loadAvailableTeachers = async (classId) => {
    try {
      const url = classId
        ? `${API}/api/classes/available-teachers?currentClassId=${classId}`
        : `${API}/api/classes/available-teachers`;
      const res = await fetch(url, {
        headers: authHeaders(),
      });
      if (res.ok) {
        setAvailableTeachers(await res.json());
      }
    } catch (err) {
      console.error("Failed to load available teachers", err);
    }
  };

  // ── ASSIGN TEACHER ────────────────────────────────────────
  const handleAssignTeacher = async (teacherId) => {
    if (!selectedClass) return;
    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/assign-teacher/${teacherId}`, {
        method: "PUT",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Teacher assigned successfully!");
        if (isDeputyAdmin) {
          await loadAllClassesForDeputy();
        } else {
          await loadBatch(true);
        }
        // Sync selectedClass to show new teacher immediately
        const assignedName = availableTeachers.find(t => t.teacherId === teacherId)?.fullName || selectedClass.teacherName;
        setSelectedClass(prev => ({
          ...prev,
          teacherId: teacherId,
          teacherName: assignedName
        }));
        await loadAvailableTeachers(selectedClass.classId);
      } else {
        showToast(data.error || "Failed to assign teacher", "error");
      }
    } catch (err) {
      showToast("Error assigning teacher", "error");
    }
  };

  // ── UNASSIGN TEACHER ──────────────────────────────────────
  const handleUnassignTeacher = async () => {
    if (!selectedClass) return;
    try {
      const res = await fetch(`${API}/api/classes/${selectedClass.classId}/unassign-teacher`, {
        method: "PUT",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Teacher unassigned successfully!");
        if (isDeputyAdmin) {
          await loadAllClassesForDeputy();
        } else {
          await loadBatch(true);
        }
        setSelectedClass(prev => ({
          ...prev,
          teacherId: null,
          teacherName: null
        }));
        await loadAvailableTeachers(selectedClass.classId);
      } else {
        showToast(data.error || "Failed to unassign teacher", "error");
      }
    } catch (err) {
      showToast("Error unassigning teacher", "error");
    }
  };

  // ── DELETE CLASS FOR DEPUTY ───────────────────────────────
  const deleteClassForDeputy = (classId, className) => {
    showConfirm(
      "Delete Class",
      `Are you sure you want to delete class "${className}"?`,
      async () => {
        try {
          const res = await fetch(`${API}/api/classes/${classId}`, {
            method: "DELETE",
            headers: authHeaders(),
          });
          const data = await res.json();
          if (res.ok) {
            showToast(data.message || "Class deleted successfully");
            setSelectedClass(null);
            setRoster([]);
            loadAllClassesForDeputy();
          } else {
            showToast(data.error || "Cannot delete class", "error");
          }
        } catch {
          showToast("Error deleting class", "error");
        }
      }
    );
  };

  // Load classes initially if deputy principal
  useEffect(() => {
    if (isDeputyAdmin) {
      loadAllClassesForDeputy();
    }
  }, [isDeputyAdmin, loadAllClassesForDeputy]);

  // ── Overview Tab State ────────────────────────────────────
  const [activeTab, setActiveTab] = useState("manage");
  const [allClasses, setAllClasses] = useState([]);
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [classStudents, setClassStudents] = useState({});
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewSearch, setOverviewSearch] = useState("");

  // ── Admin Read-Only State ─────────────────────────────────
  const [selectedReadOnlyGrade, setSelectedReadOnlyGrade] = useState("All");
  const [selectedReadOnlyClass, setSelectedReadOnlyClass] = useState(null);
  const [selectedClassSubjects, setSelectedClassSubjects] = useState([]);
  const [selectedClassRoster, setSelectedClassRoster] = useState([]);
  const [detailsTab, setDetailsTab] = useState("subjects");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");

  // ── Confirm Dialog State ───────────────────────────────
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // ── Toast helper ──────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  // ── Confirm dialog helpers ────────────────────────────
  const showConfirm = (title, message, onConfirm) =>
    setConfirmDialog({ show: true, title, message, onConfirm });
  const closeConfirm = () =>
    setConfirmDialog({ show: false, title: "", message: "", onConfirm: null });

  // ── LOAD BATCH ────────────────────────────────────────────
  const loadBatch = useCallback(async (keepSelection = false) => {
    if (!dobFrom || !dobTo) {
      showToast("Please select both DOB dates", "error");
      return;
    }
    setLoading(true);
    try {
      const [classRes, poolRes] = await Promise.all([
        fetch(`${API}/api/classes?dobFrom=${dobFrom}&dobTo=${dobTo}`, {
          headers: authHeaders(),
        }),
        fetch(`${API}/api/classes/pool?dobFrom=${dobFrom}&dobTo=${dobTo}`, {
          headers: authHeaders(),
        }),
      ]);
      if (classRes.ok) {
        const classesData = await classRes.json();
        setClasses(classesData);
        if (keepSelection && selectedClass) {
          const updated = classesData.find(c => c.classId === selectedClass.classId);
          if (updated) setSelectedClass(updated);
        }
      }
      if (poolRes.ok) setPool(await poolRes.json());
      setBatchLoaded(true);
      if (!keepSelection) {
        setSelectedClass(null);
        setRoster([]);
      }
    } catch {
      showToast("Failed to load batch", "error");
    } finally {
      setLoading(false);
    }
  }, [dobFrom, dobTo, selectedClass]);

  // ── SELECT CLASS → load roster ────────────────────────────
  const selectClass = async (cls) => {
    setSelectedClass(cls);
    try {
      const res = await fetch(`${API}/api/classes/${cls.classId}/students`, {
        headers: authHeaders(),
      });
      if (res.ok) setRoster(await res.json());
    } catch {
      showToast("Failed to load roster", "error");
    }
  };

  // ── CREATE CLASS ──────────────────────────────────────────
  const handleCreateClass = async () => {
    if (!isDeputyAdmin && (!dobFrom || !dobTo)) {
      showToast("Load a DOB batch first", "error");
      return;
    }
    try {
      const payload = {
        grade: newClass.grade,
        section: newClass.section,
        year: parseInt(newClass.year) || 2026,
        teacherId: newClass.teacherId || null,
      };
      if (!isDeputyAdmin) {
        payload.dobFrom = dobFrom;
        payload.dobTo = dobTo;
      }
      const res = await fetch(`${API}/api/classes/create`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Class ${data.className} created!`);
        setShowCreateModal(false);
        setNewClass({
          grade: "9",
          section: "A",
          year: 2026,
          teacherId: "",
        });
        setTeacherSearchQuery("");
        if (isDeputyAdmin) {
          loadAllClassesForDeputy();
        } else {
          loadBatch();
        }
      } else {
        showToast(data.error || "Failed to create class", "error");
      }
    } catch {
      showToast("Error creating class", "error");
    }
  };

  // ── ASSIGN STUDENT → CLASS ────────────────────────────────
  const assignStudent = async (studentId) => {
    if (!selectedClass) {
      showToast("Select a class first", "error");
      return;
    }
    try {
      const res = await fetch(
        `${API}/api/classes/${selectedClass.classId}/assign/${studentId}`,
        { method: "PUT", headers: authHeaders() },
      );
      if (res.ok) {
        showToast("Student assigned!");
        refreshAfterChange();
      } else {
        const d = await res.json();
        showToast(d.error || "Failed", "error");
      }
    } catch {
      showToast("Error assigning student", "error");
    }
  };

  // ── REMOVE STUDENT ← CLASS ────────────────────────────────
  const removeStudent = async (studentId) => {
    if (!selectedClass) return;
    try {
      const res = await fetch(
        `${API}/api/classes/${selectedClass.classId}/remove/${studentId}`,
        { method: "DELETE", headers: authHeaders() },
      );
      if (res.ok) {
        showToast("Student returned to pool");
        refreshAfterChange();
      } else {
        const d = await res.json();
        showToast(d.error || "Failed", "error");
      }
    } catch {
      showToast("Error removing student", "error");
    }
  };

  // ── TOGGLE TEACHER EDIT ───────────────────────────────────
  const toggleTeacherEdit = async (classId, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(
        `${API}/api/classes/${classId}/toggle-teacher-edit`,
        { method: "PUT", headers: authHeaders() },
      );
      if (res.ok) {
        const data = await res.json();
        showToast(data.message);
        setClasses((prev) =>
          prev.map((c) =>
            c.classId === classId
              ? { ...c, assignmentOpen: data.assignmentOpen }
              : c,
          ),
        );
        if (selectedClass?.classId === classId) {
          setSelectedClass((prev) => ({
            ...prev,
            assignmentOpen: data.assignmentOpen,
          }));
        }
      }
    } catch {
      showToast("Toggle failed", "error");
    }
  };

  // ── DELETE CLASS ──────────────────────────────────────────
  const deleteClass = async (classId, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this class? It must be empty.")) return;
    try {
      const res = await fetch(`${API}/api/classes/${classId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message);
        if (selectedClass?.classId === classId) {
          setSelectedClass(null);
          setRoster([]);
        }
        loadBatch();
      } else {
        showToast(data.error || "Cannot delete", "error");
      }
    } catch {
      showToast("Error deleting class", "error");
    }
  };

  // ── Refresh pool + roster + class list after change ───────
  const refreshAfterChange = async () => {
    await loadBatch(true);
    if (selectedClass) {
      const res = await fetch(
        `${API}/api/classes/${selectedClass.classId}/students`,
        { headers: authHeaders() },
      );
      if (res.ok) setRoster(await res.json());
    }
  };

  // ── OVERVIEW: Load ALL classes (no DOB filter) ────────────
  const loadAllClasses = useCallback(async () => {
    setOverviewLoading(true);
    try {
      const res = await fetch(`${API}/api/classes`, { headers: authHeaders() });
      if (res.ok) setAllClasses(await res.json());
    } catch {
      showToast("Failed to load classes", "error");
    } finally {
      setOverviewLoading(false);
    }
  }, []);

  // ── ADMIN: Select class in read-only mode and load details ──
  const handleSelectReadOnlyClass = async (cls) => {
    setSelectedReadOnlyClass(cls);
    setDetailsLoading(true);
    try {
      const [subjRes, rosterRes] = await Promise.all([
        fetch(`${API}/api/classes/${cls.classId}/subjects`, { headers: authHeaders() }),
        fetch(`${API}/api/classes/${cls.classId}/students`, { headers: authHeaders() })
      ]);

      let subjects = [];
      let rosterData = [];

      if (subjRes.ok) subjects = await subjRes.json();
      if (rosterRes.ok) rosterData = await rosterRes.json();

      setSelectedClassSubjects(subjects);
      setSelectedClassRoster(rosterData);
    } catch (err) {
      console.error("Error loading class details:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAllClasses();
    }
  }, [isAdmin, loadAllClasses]);

  // ── OVERVIEW: Toggle class expand → load its students ─────
  const toggleClassExpand = async (classId) => {
    if (expandedClassId === classId) { setExpandedClassId(null); return; }
    setExpandedClassId(classId);
    if (!classStudents[classId]) {
      try {
        const res = await fetch(`${API}/api/classes/${classId}/students`, {
          headers: authHeaders(),
        });
        if (res.ok) {
          const students = await res.json();
          setClassStudents((prev) => ({ ...prev, [classId]: students }));
        }
      } catch {
        showToast("Failed to load students", "error");
      }
    }
  };

  // ── OVERVIEW: Remove a student from a class ───────────────
  const removeStudentOverview = (classId, studentId, studentName) => {
    showConfirm(
      "Remove Student",
      `Remove ${studentName ? `"${studentName}"` : "this student"} from the class? They will return to the unassigned pool.`,
      async () => {
        try {
          const res = await fetch(
            `${API}/api/classes/${classId}/remove/${studentId}`,
            { method: "DELETE", headers: authHeaders() },
          );
          if (res.ok) {
            showToast("Student removed from class");
            setClassStudents((prev) => ({
              ...prev,
              [classId]: (prev[classId] || []).filter((s) => s.studentId !== studentId),
            }));
            setAllClasses((prev) =>
              prev.map((c) =>
                c.classId === classId
                  ? { ...c, studentCount: Math.max(0, (c.studentCount || 1) - 1) }
                  : c,
              ),
            );
          } else {
            const d = await res.json();
            showToast(d.error || "Failed to remove student", "error");
          }
        } catch {
          showToast("Error removing student", "error");
        }
      },
    );
  };

  // ── OVERVIEW: Delete an entire class ─────────────────────
  const deleteClassOverview = (classId, className) => {
    showConfirm(
      "Delete Class",
      `Are you sure you want to delete "${className}"? The class must be empty before it can be deleted.`,
      async () => {
        try {
          const res = await fetch(`${API}/api/classes/${classId}`, {
            method: "DELETE",
            headers: authHeaders(),
          });
          const data = await res.json();
          if (res.ok) {
            showToast(data.message);
            setAllClasses((prev) => prev.filter((c) => c.classId !== classId));
            if (expandedClassId === classId) setExpandedClassId(null);
          } else {
            showToast(data.error || "Cannot delete class", "error");
          }
        } catch {
          showToast("Error deleting class", "error");
        }
      },
    );
  };

  // ── Auto-load overview when that tab is selected ──────────
  useEffect(() => {
    if (activeTab === "overview") loadAllClasses();
  }, [activeTab, loadAllClasses]);

  // ── Filtered lists ────────────────────────────────────────
  const filteredPool = pool.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(poolSearch.toLowerCase()) ||
      s.studentId?.toLowerCase().includes(poolSearch.toLowerCase()),
  );
  const filteredRoster = roster.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      s.studentId?.toLowerCase().includes(rosterSearch.toLowerCase()),
  );
  const filteredClasses = classes.filter((c) =>
    c.className?.toLowerCase().includes(classSearch.toLowerCase()),
  );

  const grades = ["6", "7", "8", "9", "10", "11", "12", "13"];
  const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const allowedGrades = ["6", "7", "8", "9", "10", "11"];
  const filteredAllClasses = allClasses.filter(c => {
    const gradeAllowed = allowedGrades.includes(c.grade);
    const matchesGrade = selectedReadOnlyGrade === "All" || c.grade === selectedReadOnlyGrade;
    const matchesSearch = adminSearch === "" ||
      `grade ${c.grade}-${c.className}`.toLowerCase().includes(adminSearch.toLowerCase()) ||
      c.className?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      c.teacherName?.toLowerCase().includes(adminSearch.toLowerCase());
    return gradeAllowed && matchesGrade && matchesSearch;
  });

  if (isAdmin) {
    return (
      <div className="acm-container">
        {/* HEADER */}
        <div className="acm-readonly-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <div>
            <h1 className="acm-title" style={{ textAlign: "left" }}>Classes Overview</h1>
            <p className="acm-subtitle" style={{ textAlign: "left" }}>
              Read-only view of available classes, assigned teachers, subjects, and student rosters.
            </p>
          </div>
          <button
            className="acm-btn acm-btn--ghost"
            onClick={loadAllClasses}
            disabled={overviewLoading}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            ↻ Refresh Classes
          </button>
        </div>

        {/* GRADE TABS SCROLLER */}
        <div className="acm-readonly-grade-tabs" style={{ display: "flex", gap: "10px", marginBottom: "20px", overflowX: "auto", paddingBottom: "10px" }}>
          {["All", "6", "7", "8", "9", "10", "11"].map((g) => (
            <button
              key={g}
              className={`acm-readonly-grade-tab ${selectedReadOnlyGrade === g ? "acm-readonly-grade-tab--active" : ""}`}
              onClick={() => {
                setSelectedReadOnlyGrade(g);
                setSelectedReadOnlyClass(null);
                setSelectedClassSubjects([]);
                setSelectedClassRoster([]);
              }}
            >
              {g === "All" ? "All Grades" : `Grade ${g}`}
            </button>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ position: "relative" }}>
            <FiSearch style={{ position: "absolute", left: "14px", color: "#94a3b8", fontSize: "18px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              placeholder="Search classes by Grade, Name, or Teacher..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#334155",
                boxSizing: "border-box"
              }}
            />
          </div>
        </div>

        {/* SPLIT SCREEN LAYOUT */}
        <div className="acm-readonly-split-layout">
          {/* LEFT: CLASSES GRID */}
          <div className="acm-readonly-classes-section">
            {overviewLoading ? (
              <div className="acm-readonly-loading-placeholder">
                <p>Loading classes...</p>
              </div>
            ) : filteredAllClasses.length === 0 ? (
              <div className="acm-readonly-empty-placeholder">
                <FiBook size={40} />
                <p>No classes found matching the criteria.</p>
              </div>
            ) : (
              <div className="acm-readonly-classes-grid">
                {filteredAllClasses.map((cls) => {
                  const isSelected = selectedReadOnlyClass?.classId === cls.classId;
                  return (
                    <div
                      key={cls.classId}
                      className={`acm-readonly-class-card ${isSelected ? "acm-readonly-class-card--active" : ""}`}
                      onClick={() => handleSelectReadOnlyClass(cls)}
                    >
                      <div className="acm-readonly-card-header">
                        <div className="acm-readonly-class-icon"><FiBook /></div>
                        <div>
                          <h3>Grade {cls.className}</h3>
                          <span className="acm-readonly-class-year">Year {cls.year}</span>
                        </div>
                      </div>
                      <div className="acm-readonly-card-body">
                        <div className="acm-readonly-info-row">
                          <span className="acm-readonly-info-label">Class Teacher:</span>
                          <span className="acm-readonly-info-val">
                            {cls.teacherName || <em style={{ color: "#94a3b8" }}>Not Assigned</em>}
                          </span>
                        </div>
                        <div className="acm-readonly-info-row">
                          <span className="acm-readonly-info-label">Students:</span>
                          <span className="acm-readonly-info-val">
                            {isSelected ? selectedClassRoster.length : (cls.studentCount ?? 0)} enrolled
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS PANEL */}
          <div className="acm-readonly-details-section">
            {!selectedReadOnlyClass ? (
              <div className="acm-readonly-details-placeholder">
                <FiBook size={48} style={{ color: "#cbd5e1", marginBottom: "15px" }} />
                <h3>No Class Selected</h3>
                <p>Select a class from the left list to view subjects, assigned teachers, and student rosters.</p>
              </div>
            ) : (
              <div className="acm-readonly-details-card">
                {/* Details Header */}
                <div className="acm-readonly-details-header">
                  <h2>Grade {selectedReadOnlyClass.className}</h2>
                  <p>Year {selectedReadOnlyClass.year} &nbsp;·&nbsp; Class Teacher: <strong>{selectedReadOnlyClass.teacherName || "Not Assigned"}</strong></p>
                </div>

                {/* Details Tab Buttons */}
                <div className="acm-readonly-details-tabs">
                  <button
                    className={`acm-readonly-details-tab ${detailsTab === "subjects" ? "acm-readonly-details-tab--active" : ""}`}
                    onClick={() => setDetailsTab("subjects")}
                  >
                    Subjects
                  </button>
                  <button
                    className={`acm-readonly-details-tab ${detailsTab === "roster" ? "acm-readonly-details-tab--active" : ""}`}
                    onClick={() => setDetailsTab("roster")}
                  >
                    Student Roster
                  </button>
                </div>

                {/* Details Tab Content */}
                <div className="acm-readonly-details-content">
                  {detailsLoading ? (
                    <div className="acm-readonly-loading-placeholder" style={{ minHeight: "200px" }}>
                      <p>Loading details...</p>
                    </div>
                  ) : detailsTab === "subjects" ? (
                    <div className="acm-readonly-subjects-list">
                      {selectedClassSubjects.length === 0 ? (
                        <div className="acm-readonly-empty-placeholder" style={{ minHeight: "150px" }}>
                          <p>No subjects assigned to this class yet.</p>
                        </div>
                      ) : (
                        <div className="acm-readonly-table-container">
                          <table className="acm-readonly-table">
                            <thead>
                              <tr>
                                <th>Subject Name</th>
                                <th>Assigned Teacher</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedClassSubjects.map((s) => (
                                <tr key={s.subjectId}>
                                  <td><strong>{s.subjectName}</strong></td>
                                  <td>{s.teacherName || <em style={{ color: "#94a3b8" }}>Not Allocated</em>}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="acm-readonly-roster-list">
                      {selectedClassRoster.length === 0 ? (
                        <div className="acm-readonly-empty-placeholder" style={{ minHeight: "150px" }}>
                          <p>No students enrolled in this class.</p>
                        </div>
                      ) : (
                        <div className="acm-readonly-table-container">
                          <table className="acm-readonly-table">
                            <thead>
                              <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Contact</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedClassRoster.map((s) => (
                                <tr key={s.studentId}>
                                  <td><code>{s.studentId}</code></td>
                                  <td><strong>{s.fullName}</strong></td>
                                  <td>{s.contactNumber || "—"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isDeputyAdmin) {
    return (
      <div className="acm-container">
        {/* ── TOAST ── */}
        {toast.show && (
          <div className={`acm-toast acm-toast--${toast.type}`}>{toast.msg}</div>
        )}

        {/* ── HEADER ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <div>
            <h1 className="acm-title" style={{ textAlign: "left" }}>Class Management</h1>
            <p className="acm-subtitle" style={{ textAlign: "left" }}>
              Divide classes by grades 6-11 and allocate subject teachers.
            </p>
          </div>
          <button
            className="acm-btn acm-btn--primary"
            onClick={() => {
              loadAvailableTeachers("");
              setShowCreateModal(true);
              setShowTeacherDropdown(false);
              setTeacherSearchQuery("");
            }}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <FiPlus /> Create Class
          </button>
        </div>

        {/* SEARCH BAR */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ position: "relative" }}>
            <FiSearch style={{ position: "absolute", left: "14px", color: "#94a3b8", fontSize: "18px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              placeholder="Search classes by Grade or Name (e.g. 9 or 9-A)..."
              value={classSearch}
              onChange={(e) => setClassSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#334155",
                boxSizing: "border-box"
              }}
            />
          </div>
        </div>

        {/* MAIN PANEL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "30px", alignItems: "start" }}>
          {/* CLASSES LIST */}
          <div className="acm-panel acm-panel--classes" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>Active Classes</h3>
              <button
                className="acm-btn acm-btn--ghost"
                onClick={() => loadAllClassesForDeputy()}
                style={{ padding: "6px 12px", fontSize: "12px" }}
              >
                Refresh
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "500px", overflowY: "auto" }}>
              {filteredClasses.length === 0 ? (
                <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>No classes found in the system.</div>
              ) : (
                filteredClasses.map((cls) => {
                  const isSelected = selectedClass?.classId === cls.classId;
                  return (
                    <div
                      key={cls.classId}
                      style={{
                        padding: "16px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid #2b55cc" : "1px solid #e2e8f0",
                        backgroundColor: isSelected ? "#f8fafc" : "white",
                        cursor: "pointer",
                        boxShadow: isSelected ? "0 4px 12px rgba(43,85,204,0.1)" : "none",
                        transition: "all 0.2s"
                      }}
                      onClick={async () => {
                        setSelectedClass(cls);
                        loadAvailableTeachers(cls.classId);
                        setDetailsTeacherSearchQuery("");
                        setShowDetailsTeacherDropdown(false);
                        try {
                          const res = await fetch(`${API}/api/classes/${cls.classId}/students`, { headers: authHeaders() });
                          if (res.ok) setRoster(await res.json());
                        } catch {
                          console.error("Failed to load roster");
                        }
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                            {cls.className} ({cls.year})
                          </h4>
                          <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                            Grade: {cls.grade} &nbsp;·&nbsp; {cls.studentCount ?? 0} students assigned
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                const res = await fetch(`${API}/api/classes/${cls.classId}/toggle-dev`, {
                                  method: "PUT",
                                  headers: authHeaders()
                                });
                                const data = await res.json();
                                if (res.ok) {
                                  showToast(data.message);
                                  await loadAllClassesForDeputy();
                                } else {
                                  showToast(data.error || "Failed to toggle", "error");
                                }
                              } catch {
                                showToast("Error toggling dev access", "error");
                              }
                            }}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: cls.devEnabled ? "#ef4444" : "#10b981",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: "600",
                              cursor: "pointer"
                            }}
                          >
                            {cls.devEnabled ? "Disable" : "Enable"}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteClassForDeputy(cls.classId, cls.className);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#ef4444",
                              cursor: "pointer",
                              padding: "4px"
                            }}
                            title="Delete class"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div style={{ fontSize: "13px", color: "#475569" }}>
                        Teacher: {cls.teacherName ? <span style={{ fontWeight: "600", color: "#2b55cc" }}>{cls.teacherName}</span> : <span style={{ color: "#94a3b8" }}>None</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* CLASS ALLOCATION DETAILS CARD */}
          {selectedClass ? (
            <div className="acm-panel acm-panel--allocation" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 15px 0", color: "#0f172a", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                Class Allocation Details: {selectedClass.className}
              </h2>

              <div style={{ marginBottom: "25px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                  Class Teacher
                </label>

                {/* Select Field to Toggle Dropdown */}
                <div className="input-container" style={{ position: "relative", marginBottom: "12px" }}>
                  <div
                    onClick={() => setShowDetailsTeacherDropdown(prev => !prev)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "14px",
                      backgroundColor: "white",
                      color: selectedClass.teacherName ? "#334155" : "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxSizing: "border-box"
                    }}
                  >
                    <span>
                      {selectedClass.teacherName
                        ? `${selectedClass.teacherName} (${selectedClass.teacherId})`
                        : "-- Click to Select Class Teacher --"
                      }
                    </span>
                    <FiChevronDown />
                  </div>
                </div>

                {/* Search Bar & Table (Shown only when dropdown is open) */}
                {showDetailsTeacherDropdown && (
                  <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px", backgroundColor: "#f8fafc", marginBottom: "15px" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <input
                        type="text"
                        placeholder="Search available teacher by name or ID..."
                        value={detailsTeacherSearchQuery}
                        onChange={(e) => setDetailsTeacherSearchQuery(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          fontSize: "13px",
                          boxSizing: "border-box",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div style={{
                      maxHeight: "180px",
                      overflowY: "auto",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      backgroundColor: "white"
                    }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#e2e8f0", color: "#334155", fontWeight: "600", borderBottom: "1px solid #cbd5e1" }}>
                            <th style={{ padding: "8px 12px" }}>ID</th>
                            <th style={{ padding: "8px 12px" }}>Name</th>
                            <th style={{ padding: "8px 12px" }}>Specialization</th>
                            <th style={{ padding: "8px 12px", textAlign: "center" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {availableTeachers
                            .filter(t => {
                              const query = detailsTeacherSearchQuery.toLowerCase();
                              const matchesName = t.fullName && t.fullName.toLowerCase().includes(query);
                              const matchesId = t.teacherId && String(t.teacherId).toLowerCase().includes(query);
                              return matchesName || matchesId;
                            })
                            .map((t) => {
                              const isCurrent = selectedClass.teacherId === t.teacherId;
                              return (
                                <tr
                                  key={t.teacherId}
                                  style={{
                                    borderBottom: "1px solid #cbd5e1",
                                    backgroundColor: isCurrent ? "#eff6ff" : "white"
                                  }}
                                >
                                  <td style={{ padding: "8px 12px", fontWeight: "600", color: "#334155" }}>{t.teacherId}</td>
                                  <td style={{ padding: "8px 12px", color: "#475569" }}>{t.fullName}</td>
                                  <td style={{ padding: "8px 12px", color: "#64748b" }}>{t.subjectSpecialization || "N/A"}</td>
                                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        if (isCurrent) {
                                          await handleUnassignTeacher();
                                        } else {
                                          await handleAssignTeacher(t.teacherId);
                                        }
                                        setShowDetailsTeacherDropdown(false);
                                      }}
                                      style={{
                                        padding: "4px 8px",
                                        backgroundColor: isCurrent ? "#ef4444" : "#2b55cc",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: "11px",
                                        fontWeight: "600",
                                        cursor: "pointer"
                                      }}
                                    >
                                      {isCurrent ? "Remove" : "Assign"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          }
                          {availableTeachers.filter(t => {
                            const query = detailsTeacherSearchQuery.toLowerCase();
                            const matchesName = t.fullName && t.fullName.toLowerCase().includes(query);
                            const matchesId = t.teacherId && String(t.teacherId).toLowerCase().includes(query);
                            return matchesName || matchesId;
                          }).length === 0 && (
                              <tr>
                                <td colSpan="4" style={{ padding: "20px 12px", textAlign: "center", color: "#94a3b8", fontStyle: "italic" }}>
                                  No matching teachers found.
                                </td>
                              </tr>
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Roster of Students */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#475569", marginBottom: "10px", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                  Assigned Students ({roster.length})
                </h3>
                {roster.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic" }}>No students assigned to this class yet.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "200px", overflowY: "auto" }}>
                    {roster.map((st) => (
                      <div
                        key={st.studentId}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          fontSize: "13px",
                          color: "#334155",
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <span>{st.fullName}</span>
                        <span style={{ color: "#64748b" }}>{st.studentId}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="acm-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", color: "#64748b", minHeight: "350px" }}>
              <FiBook size={40} style={{ color: "#94a3b8", marginBottom: "12px" }} />
              <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", textAlign: "center" }}>Select a class from the list to assign teachers and view details</p>
            </div>
          )}
        </div>

        {/* CREATE CLASS MODAL */}
        {showCreateModal && (
          <div className="acm-modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="acm-modal" style={{ width: "500px" }} onClick={(e) => e.stopPropagation()}>
              <div className="acm-modal-header">
                <h3>Create New Class</h3>
                <button className="acm-modal-close" onClick={() => setShowCreateModal(false)}>
                  <FiX />
                </button>
              </div>
              <div className="acm-modal-body">
                <div className="acm-form-group">
                  <label>Grade (6 - 11)</label>
                  <select
                    value={newClass.grade}
                    onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}
                  >
                    {grades.filter(g => parseInt(g) >= 6 && parseInt(g) <= 11).map(g => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                </div>

                <div className="acm-form-group">
                  <label>Class Name (A - F)</label>
                  <select
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                  >
                    {["A", "B", "C", "D", "E", "F"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="acm-form-group" style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ margin: 0 }}>Class Teacher</label>
                    {newClass.teacherId && (
                      <span style={{ fontSize: "12px", color: "#2b55cc", fontWeight: "600" }}>
                        Selected: {availableTeachers.find(t => t.teacherId === newClass.teacherId)?.fullName || newClass.teacherId}
                      </span>
                    )}
                  </div>

                  {/* Dropdown Toggle for Select Class Teacher Field */}
                  <div
                    onClick={() => setShowTeacherDropdown(prev => !prev)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "white",
                      color: newClass.teacherId ? "#334155" : "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxSizing: "border-box"
                    }}
                  >
                    <span>
                      {newClass.teacherId
                        ? `${availableTeachers.find(t => t.teacherId === newClass.teacherId)?.fullName || newClass.teacherId} (${newClass.teacherId})`
                        : "-- Click to Select Class Teacher --"
                      }
                    </span>
                    <FiChevronDown />
                  </div>

                  {/* Dropdown Container containing search bar and Table */}
                  {showTeacherDropdown && (
                    <div style={{
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      padding: "10px",
                      backgroundColor: "#f8fafc",
                      marginTop: "8px",
                      boxSizing: "border-box"
                    }}>
                      <div style={{ marginBottom: "8px" }}>
                        <input
                          type="text"
                          placeholder="Search teacher by name or ID..."
                          value={teacherSearchQuery}
                          onChange={(e) => setTeacherSearchQuery(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "6px",
                            fontSize: "13px",
                            boxSizing: "border-box",
                            outline: "none"
                          }}
                        />
                      </div>

                      <div style={{
                        maxHeight: "150px",
                        overflowY: "auto",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        backgroundColor: "white"
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
                            {availableTeachers
                              .filter(t => {
                                const query = teacherSearchQuery.toLowerCase();
                                const matchesName = t.fullName && t.fullName.toLowerCase().includes(query);
                                const matchesId = t.teacherId && String(t.teacherId).toLowerCase().includes(query);
                                return matchesName || matchesId;
                              })
                              .map((t) => {
                                const isSelected = newClass.teacherId === t.teacherId;
                                return (
                                  <tr
                                    key={t.teacherId}
                                    style={{
                                      borderBottom: "1px solid #cbd5e1",
                                      backgroundColor: isSelected ? "#eff6ff" : "white"
                                    }}
                                  >
                                    <td style={{ padding: "6px 8px", fontWeight: "600", color: "#334155" }}>{t.teacherId}</td>
                                    <td style={{ padding: "6px 8px", color: "#475569" }}>{t.fullName}</td>
                                    <td style={{ padding: "6px 8px", color: "#64748b" }}>{t.subjectSpecialization || "N/A"}</td>
                                    <td style={{ padding: "6px 8px", textAlign: "center" }}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setNewClass(prev => ({
                                            ...prev,
                                            teacherId: isSelected ? "" : t.teacherId
                                          }));
                                          setShowTeacherDropdown(false);
                                        }}
                                        style={{
                                          padding: "3px 6px",
                                          backgroundColor: isSelected ? "#ef4444" : "#2b55cc",
                                          color: "white",
                                          border: "none",
                                          borderRadius: "4px",
                                          fontSize: "10px",
                                          fontWeight: "600",
                                          cursor: "pointer"
                                        }}
                                      >
                                        {isSelected ? "Deselect" : "Select"}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            }
                            {availableTeachers.filter(t => {
                              const query = teacherSearchQuery.toLowerCase();
                              const matchesName = t.fullName && t.fullName.toLowerCase().includes(query);
                              const matchesId = t.teacherId && String(t.teacherId).toLowerCase().includes(query);
                              return matchesName || matchesId;
                            }).length === 0 && (
                                <tr>
                                  <td colSpan="4" style={{ padding: "15px 8px", textAlign: "center", color: "#94a3b8", fontStyle: "italic" }}>
                                    No matching teachers found.
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="acm-modal-footer">
                <button className="acm-btn acm-btn--ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="acm-btn acm-btn--primary" onClick={handleCreateClass}>
                  Create Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMATION DIALOG */}
        {confirmDialog.show && (
          <div className="acm-modal-overlay" onClick={closeConfirm}>
            <div className="acm-modal acm-confirm-modal" onClick={(e) => e.stopPropagation()}>
              <div className="acm-confirm-icon-wrap">
                <FiTrash2 className="acm-confirm-icon" />
              </div>
              <div className="acm-confirm-body">
                <h3 className="acm-confirm-title">{confirmDialog.title}</h3>
                <p className="acm-confirm-message">{confirmDialog.message}</p>
              </div>
              <div className="acm-confirm-footer">
                <button className="acm-btn acm-btn--ghost" onClick={closeConfirm}>
                  Cancel
                </button>
                <button
                  className="acm-btn acm-btn--danger"
                  onClick={() => {
                    confirmDialog.onConfirm();
                    closeConfirm();
                  }}
                >
                  <FiTrash2 /> Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="acm-container">
      {/* ── TOAST ── */}
      {toast.show && (
        <div className={`acm-toast acm-toast--${toast.type}`}>{toast.msg}</div>
      )}

      {/* ── HEADER ── */}
      <div className="acm-header">
        <div>
          <h1 className="acm-title">Class Management</h1>
          <p className="acm-subtitle">
            Filter students by date of birth, create classes, and manually
            assign students.
          </p>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="acm-tabs">
        <button
          className={`acm-tab ${activeTab === "manage" ? "acm-tab--active" : ""}`}
          onClick={() => setActiveTab("manage")}
        >
          <FiPlus /> Manage Classes
        </button>
        <button
          className={`acm-tab ${activeTab === "overview" ? "acm-tab--active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <FiBook /> All Classes &amp; Students
        </button>
      </div>

      {/* ── MANAGE TAB ── */}
      {activeTab === "manage" && (
        <>
          {/* ── DOB FILTER BAR ── */}
          <div className="acm-filter-bar">
            <div className="acm-filter-group">
              <label>DOB From</label>
              <input
                type="date"
                value={dobFrom}
                onChange={(e) => setDobFrom(e.target.value)}
              />
            </div>
            <div className="acm-filter-group">
              <label>DOB To</label>
              <input
                type="date"
                value={dobTo}
                onChange={(e) => setDobTo(e.target.value)}
              />
            </div>
            <button
              className="acm-btn acm-btn--primary"
              onClick={loadBatch}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load Student Pool"}
            </button>
            {batchLoaded && (
              <div className="acm-batch-stats">
                <span className="acm-stat-pill">
                  <FiUsers /> {pool.length} Unassigned
                </span>
                <span className="acm-stat-pill">
                  <FiBook /> {classes.length} Classes
                </span>
              </div>
            )}
          </div>

          {/* ── 3-PANEL LAYOUT ── */}
          <div className="acm-panels">
            {/* ── PANEL 1: CLASS LIST ── */}
            <div className="acm-panel acm-panel--classes">
              <div className="acm-panel-header">
                <h3>Classes</h3>
                <button
                  className="acm-btn-add-class"
                  onClick={() => setShowCreateModal(true)}
                  title="Create new class"
                >
                  <FiPlus style={{ marginRight: "4px" }} /> Create
                </button>
              </div>
              <div className="acm-search">
                <FiSearch className="acm-search-icon" />
                <input
                  placeholder="Search classes..."
                  value={classSearch}
                  onChange={(e) => setClassSearch(e.target.value)}
                />
              </div>
              <div className="acm-class-list">
                {filteredClasses.length === 0 && (
                  <div className="acm-empty">
                    {batchLoaded
                      ? "No classes for this batch. Create one!"
                      : "Load a DOB batch to see classes."}
                  </div>
                )}
                {filteredClasses.map((cls) => (
                  <div
                    key={cls.classId}
                    className={`acm-class-item ${selectedClass?.classId === cls.classId ? "acm-class-item--active" : ""}`}
                    onClick={() => selectClass(cls)}
                  >
                    <div className="acm-class-icon">
                      <FiBook />
                    </div>
                    <div className="acm-class-info">
                      <h4>{cls.className}</h4>
                      <p>
                        {cls.studentCount ?? "?"} students
                        {cls.teacherName && <> · {cls.teacherName}</>}
                      </p>
                    </div>
                    <div className="acm-class-actions">
                      <button
                        className={`acm-toggle-btn ${cls.assignmentOpen ? "acm-toggle-btn--open" : ""}`}
                        onClick={(e) => toggleTeacherEdit(cls.classId, e)}
                        title={
                          cls.assignmentOpen
                            ? "Disable teacher edit"
                            : "Enable teacher edit"
                        }
                      >
                        {cls.assignmentOpen ? <FiUnlock /> : <FiLock />}
                      </button>
                      <button
                        className="acm-delete-btn"
                        onClick={(e) => deleteClass(cls.classId, e)}
                        title="Delete class"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <FiChevronRight className="acm-chevron" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── PANEL 2: STUDENT POOL ── */}
            <div className="acm-panel acm-panel--pool">
              <div className="acm-panel-header">
                <h3>Student Pool</h3>
                <span className="acm-badge">{pool.length}</span>
              </div>
              <div className="acm-search">
                <FiSearch className="acm-search-icon" />
                <input
                  placeholder="Search students..."
                  value={poolSearch}
                  onChange={(e) => setPoolSearch(e.target.value)}
                />
              </div>
              {!batchLoaded ? (
                <div className="acm-empty acm-empty--lg">
                  <FiUsers size={40} />
                  <p>
                    Set a DOB range and click <strong>Load Student Pool</strong>
                  </p>
                </div>
              ) : (
                <div className="acm-student-list">
                  {filteredPool.length === 0 && (
                    <div className="acm-empty">
                      All students in this batch are assigned! 🎉
                    </div>
                  )}
                  {filteredPool.map((student) => (
                    <div key={student.studentId} className="acm-student-item">
                      <div className="acm-student-avatar">
                        {student.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="acm-student-info">
                        <h4>{student.fullName}</h4>
                        <p>
                          {student.studentId} · {student.dateOfBirth}
                        </p>
                      </div>
                      <button
                        className="acm-assign-btn"
                        onClick={() => assignStudent(student.studentId)}
                        disabled={!selectedClass}
                        title={
                          selectedClass
                            ? `Add to ${selectedClass.className}`
                            : "Select a class first"
                        }
                      >
                        <FiPlus />{" "}
                        {selectedClass ? selectedClass.className : "Select class"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── PANEL 3: CLASS ROSTER ── */}
            <div className="acm-panel acm-panel--roster">
              <div className="acm-panel-header">
                <h3>
                  {selectedClass ? (
                    <>
                      <span className="acm-selected-class">
                        {selectedClass.className}
                      </span>{" "}
                      Roster
                    </>
                  ) : (
                    "Class Roster"
                  )}
                </h3>
                {selectedClass && (
                  <span className="acm-badge">{roster.length}</span>
                )}
              </div>
              {selectedClass && (
                <div className="acm-roster-meta">
                  <span
                    className={`acm-status-pill ${selectedClass.assignmentOpen ? "acm-status-pill--open" : ""}`}
                  >
                    {selectedClass.assignmentOpen ? (
                      <>
                        <FiUnlock /> Teacher Edit ON
                      </>
                    ) : (
                      <>
                        <FiLock /> Teacher Edit OFF
                      </>
                    )}
                  </span>
                  {selectedClass.teacherName && (
                    <span className="acm-teacher-pill">
                      <FiUserCheck /> {selectedClass.teacherName}
                    </span>
                  )}
                </div>
              )}
              <div className="acm-search">
                <FiSearch className="acm-search-icon" />
                <input
                  placeholder="Search roster..."
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                />
              </div>
              {!selectedClass ? (
                <div className="acm-empty acm-empty--lg">
                  <FiBook size={40} />
                  <p>Click a class on the left to view its students</p>
                </div>
              ) : (
                <div className="acm-student-list">
                  {filteredRoster.length === 0 && (
                    <div className="acm-empty">
                      No students assigned yet. Add from the pool →
                    </div>
                  )}
                  {filteredRoster.map((student) => (
                    <div key={student.studentId} className="acm-student-item">
                      <div className="acm-student-avatar acm-student-avatar--assigned">
                        {student.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="acm-student-info">
                        <h4>{student.fullName}</h4>
                        <p>
                          {student.studentId} · {student.dateOfBirth}
                        </p>
                      </div>
                      <button
                        className="acm-remove-btn"
                        onClick={() => removeStudent(student.studentId)}
                        title="Remove from class"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="acm-overview">
          {/* Toolbar */}
          <div className="acm-overview-toolbar">
            <div className="acm-search--standalone">
              <FiSearch className="acm-search-icon" />
              <input
                placeholder="Search classes..."
                value={overviewSearch}
                onChange={(e) => setOverviewSearch(e.target.value)}
              />
            </div>
            <button
              className="acm-btn acm-btn--primary"
              onClick={loadAllClasses}
              disabled={overviewLoading}
            >
              ↻ Refresh
            </button>
          </div>

          {overviewLoading ? (
            <div className="acm-empty acm-empty--lg"><p>Loading all classes...</p></div>
          ) : allClasses.length === 0 ? (
            <div className="acm-empty acm-empty--lg">
              <FiBook size={44} />
              <p>No classes yet. Use the <strong>Manage Classes</strong> tab to create one.</p>
            </div>
          ) : (
            <div className="acm-overview-list">
              {allClasses
                .filter((c) =>
                  c.className?.toLowerCase().includes(overviewSearch.toLowerCase()),
                )
                .map((cls) => (
                  <div
                    key={cls.classId}
                    className={`acm-ov-card ${expandedClassId === cls.classId ? "acm-ov-card--open" : ""
                      }`}
                  >
                    {/* ── Class header row ── */}
                    <div
                      className="acm-ov-card-header"
                      onClick={() => toggleClassExpand(cls.classId)}
                    >
                      <div className="acm-class-icon"><FiBook /></div>
                      <div className="acm-ov-meta">
                        <span className="acm-ov-name">{cls.className}</span>
                        <span className="acm-ov-detail">
                          Year {cls.year} &nbsp;·&nbsp; {cls.studentCount ?? 0} students
                          {cls.teacherName && ` · ${cls.teacherName}`}
                          {cls.dobFrom && ` · DOB ${cls.dobFrom} → ${cls.dobTo}`}
                        </span>
                      </div>
                      <div className="acm-ov-badges">
                        <span
                          className={`acm-status-pill ${cls.assignmentOpen ? "acm-status-pill--open" : ""
                            }`}
                        >
                          {cls.assignmentOpen
                            ? <><FiUnlock /> Open</>
                            : <><FiLock /> Locked</>}
                        </span>
                      </div>
                      <div className="acm-ov-actions">
                        <button
                          className="acm-delete-btn"
                          title="Delete class (must be empty)"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteClassOverview(cls.classId, cls.className);
                          }}
                        >
                          <FiTrash2 />
                        </button>
                        <FiChevronDown
                          className={`acm-ov-chevron ${expandedClassId === cls.classId ? "acm-ov-chevron--open" : ""
                            }`}
                        />
                      </div>
                    </div>

                    {/* ── Expanded student roster ── */}
                    {expandedClassId === cls.classId && (
                      <div className="acm-ov-students">
                        {!classStudents[cls.classId] ? (
                          <div className="acm-ov-loading">Loading students...</div>
                        ) : classStudents[cls.classId].length === 0 ? (
                          <div className="acm-ov-empty">
                            No students assigned to this class yet.
                          </div>
                        ) : (
                          classStudents[cls.classId].map((student) => (
                            <div key={student.studentId} className="acm-ov-student-row">
                              <div className="acm-student-avatar acm-student-avatar--assigned">
                                {student.fullName?.charAt(0).toUpperCase()}
                              </div>
                              <div className="acm-student-info">
                                <h4>{student.fullName}</h4>
                                <p>{student.studentId} · {student.dateOfBirth}</p>
                              </div>
                              <button
                                className="acm-remove-btn"
                                title="Remove student from class"
                                onClick={() =>
                                  removeStudentOverview(cls.classId, student.studentId, student.fullName)
                                }
                              >
                                <FiX />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* ── CREATE CLASS MODAL ── */}
      {showCreateModal && (
        <div
          className="acm-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="acm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="acm-modal-header">
              <h3>Create New Class</h3>
              <button
                className="acm-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="acm-modal-body">
              <div className="acm-form-group">
                <label>Grade</label>
                <select
                  value={newClass.grade}
                  onChange={(e) =>
                    setNewClass({ ...newClass, grade: e.target.value })
                  }
                >
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="acm-form-group">
                <label>Section</label>
                <select
                  value={newClass.section}
                  onChange={(e) =>
                    setNewClass({ ...newClass, section: e.target.value })
                  }
                >
                  {sections.map((s) => (
                    <option key={s} value={s}>
                      Section {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="acm-form-group">
                <label>Academic Year</label>
                <input
                  type="number"
                  value={newClass.year}
                  onChange={(e) =>
                    setNewClass({ ...newClass, year: e.target.value })
                  }
                  placeholder="e.g. 2026"
                />
              </div>
              <div className="acm-modal-batch-info">
                <span>DOB Batch:</span>
                <strong>
                  {dobFrom} → {dobTo}
                </strong>
              </div>
            </div>
            <div className="acm-modal-footer">
              <button
                className="acm-btn acm-btn--ghost"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="acm-btn acm-btn--primary"
                onClick={handleCreateClass}
              >
                <FiPlus /> Create Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRMATION DIALOG ── */}
      {confirmDialog.show && (
        <div className="acm-modal-overlay" onClick={closeConfirm}>
          <div className="acm-modal acm-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="acm-confirm-icon-wrap">
              <FiTrash2 className="acm-confirm-icon" />
            </div>
            <div className="acm-confirm-body">
              <h3 className="acm-confirm-title">{confirmDialog.title}</h3>
              <p className="acm-confirm-message">{confirmDialog.message}</p>
            </div>
            <div className="acm-confirm-footer">
              <button className="acm-btn acm-btn--ghost" onClick={closeConfirm}>
                Cancel
              </button>
              <button
                className="acm-btn acm-btn--danger"
                onClick={() => {
                  confirmDialog.onConfirm();
                  closeConfirm();
                }}
              >
                <FiTrash2 /> Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
