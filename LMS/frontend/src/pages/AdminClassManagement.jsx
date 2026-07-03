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
  });

  // ── Overview Tab State ────────────────────────────────────
  const [activeTab, setActiveTab] = useState("manage");
  const [allClasses, setAllClasses] = useState([]);
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [classStudents, setClassStudents] = useState({});
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewSearch, setOverviewSearch] = useState("");

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
    if (!dobFrom || !dobTo) {
      showToast("Load a DOB batch first", "error");
      return;
    }
    try {
      const res = await fetch(`${API}/api/classes/create`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...newClass,
          dobFrom,
          dobTo,
          year: parseInt(newClass.year),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Class ${data.className} created!`);
        setShowCreateModal(false);
        loadBatch();
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
                    className={`acm-ov-card ${
                      expandedClassId === cls.classId ? "acm-ov-card--open" : ""
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
                          className={`acm-status-pill ${
                            cls.assignmentOpen ? "acm-status-pill--open" : ""
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
                          className={`acm-ov-chevron ${
                            expandedClassId === cls.classId ? "acm-ov-chevron--open" : ""
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
