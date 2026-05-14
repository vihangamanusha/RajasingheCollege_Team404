import { useState, useEffect } from "react";
import "./AdminClassManagement.css";
import { FiUsers, FiBook, FiPlus, FiSearch } from "react-icons/fi";

export default function AdminClassManagement() {
  const [formData, setFormData] = useState({
    grade: "9",
    dobFrom: "2012-02-01",
    dobTo: "2013-01-31",
    classSections: ["A", "B", "C", "D", "E", "F", "G"],
  });

  const [classes, setClasses] = useState([
    { id: "CLS-9A", name: "9-A", students: 35 },
    { id: "CLS-9B", name: "9-B", students: 32 },
    { id: "CLS-9C", name: "9-C", students: 34 },
  ]);

  const [generatedStudents, setGeneratedStudents] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const grades = ["6", "7", "8", "9", "10", "11", "12", "13"];
  const availableSections = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const handleCheckboxChange = (section) => {
    setFormData((prev) => {
      if (prev.classSections.includes(section)) {
        return {
          ...prev,
          classSections: prev.classSections.filter((s) => s !== section),
        };
      } else {
        return { ...prev, classSections: [...prev.classSections, section] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(
        "http://localhost:8080/api/classes/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add auth token if needed, but the request didn't specify it.
            // Assuming open or handled by interceptor if any.
          },
          body: JSON.stringify({
            grade: parseInt(formData.grade),
            dobFrom: formData.dobFrom,
            dobTo: formData.dobTo,
            classSections: formData.classSections,
          }),
        },
      );

      if (response.ok) {
        setMessage({ text: "Classes Generated Successfully", type: "success" });
        // Optionally fetch updated classes here
        // For now, let's mock adding the new classes
        const newClasses = formData.classSections.map((sec) => ({
          id: `CLS-${formData.grade}${sec}`,
          name: `${formData.grade}-${sec}`,
          students: 0, // Will be updated later
        }));
        setClasses(newClasses);
      } else {
        const errorData = await response.json();
        setMessage({
          text: errorData.message || "Failed to generate classes",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Error connecting to server", type: "error" });
      console.error("Error generating classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsByDob = async () => {
    if (!formData.dobFrom || !formData.dobTo) {
      setMessage({ text: "Please select both dates", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/student/by-dob?from=${formData.dobFrom}&to=${formData.dobTo}`);
      if (response.ok) {
        const data = await response.json();
        setGeneratedStudents(data.map(s => ({
          id: s.studentId,
          name: s.fullName,
          dob: s.dateOfBirth,
          class: s.classEntity ? s.classEntity.className : "Not Assigned"
        })));
        setMessage({ text: `Found ${data.length} students`, type: "success" });
      } else {
        setMessage({ text: "Failed to fetch students", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error connecting to server", type: "error" });
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-class-management-container">
      <div className="page-header-flex">
        <div className="header-text">
          <h1>Class Management</h1>
          <p>Generate and manage student classes dynamically.</p>
        </div>
      </div>

      <div className="content-grid-split">
        {/* LEFT SIDE: CLASS LIST */}
        <div className="table-card class-list-card">
          <div className="card-header">
            <h3>Current Classes</h3>
            <div className="search-box-mini">
              <FiSearch />
              <input type="text" placeholder="Search classes..." />
            </div>
          </div>
          <div className="class-list">
            {classes.map((cls) => (
              <div className="class-item" key={cls.id}>
                <div className="class-icon">
                  <FiBook />
                </div>
                <div className="class-info">
                  <h4>{cls.name}</h4>
                  <p>{cls.students} Students</p>
                </div>
                <button className="view-btn">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: GENERATE FORM */}
        <div className="table-card form-card">
          <h3>Generate Classes</h3>
          <form onSubmit={handleSubmit} className="generate-form">
            <div className="form-group">
              <label>Grade</label>
              <select
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
              >
                {grades.map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>DOB From</label>
                <input
                  type="date"
                  value={formData.dobFrom}
                  onChange={(e) =>
                    setFormData({ ...formData, dobFrom: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>DOB To</label>
                <input
                  type="date"
                  value={formData.dobTo}
                  onChange={(e) =>
                    setFormData({ ...formData, dobTo: e.target.value })
                  }
                />
              </div>
            </div>
            
            <button type="button" className="preview-btn" onClick={fetchStudentsByDob} disabled={loading}>
              {loading ? "Loading..." : "Preview Students by DOB"}
            </button>

            <div className="form-group">
              <label>Sections</label>
              <div className="checkbox-grid">
                {availableSections.map((sec) => (
                  <label key={sec} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.classSections.includes(sec)}
                      onChange={() => handleCheckboxChange(sec)}
                    />
                    <span>{sec}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="generate-btn" disabled={loading}>
              {loading ? "Generating..." : "Generate Classes"}
            </button>

            {message.text && (
              <div className={`inline-form-message ${message.type}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* BOTTOM: GENERATED STUDENTS TABLE */}
      <div className="table-card bottom-table-card">
        <h3>Recently Generated/Assigned Students</h3>
        <p className="subtitle">
          Students will appear here after class generation.
        </p>

        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Assigned Class</th>
            </tr>
          </thead>
          <tbody>
            {generatedStudents.length > 0 ? (
              generatedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.dob}</td>
                  <td>{student.class}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    color: "#64748b",
                    padding: "30px",
                  }}
                >
                  No students to display yet. Generate classes to populate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
