import { useState, useEffect } from "react";
import "../index.css";

export default function StudentRegister() {

  const [form, setForm] = useState({
  fullName: "",
  studentId: "",
  password: "",
  studentClass: "",
  grade: "",
  dob: "",
  medium: "",
  contactNo: "",
  gname: "",
  address: "",
});

  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

 
  const loadStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/students");//get
      const data = await res.json();//convert to json
      setStudents(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  
  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

// SAVE STUDENT
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    let response;

    if (editingId) {

      // UPDATE
      response = await fetch(
        `http://localhost:8080/api/students/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),//js into json
        }
      );

    } else {

      // CREATE
      response = await fetch(
        "http://localhost:8080/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
    }

    if (!response.ok) {
      throw new Error("Failed to save student");
    }

    alert(
      editingId
        ? "Student Updated Successfully!"
        : "Student Registered Successfully!"
    );

    // CLEAR FORM
    setForm({
      fullName: "",
      studentId: "",
      password: "",
      studentClass: "",
      grade: "",
      dob: "",
      medium: "",
      contactNo: "",
      gname: "",
      address: "",
    });

    // RESET EDITING
    setEditingId(null);

  
    setShowModal(false);

   
    loadStudents();

  } catch (error) {

    console.error(error);

    alert("Error saving student");
  }
};

  // FILTER STUDENTS
  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase()) ||
    s.studentClass.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete?"
  );

  if (!confirmDelete) return;

  try {

    await fetch(
      `http://localhost:8080/api/students/${id}`,
      {
        method: "DELETE",
      }
    );

    alert("Student Deleted!");

    loadStudents();

  } catch (error) {
    console.error(error);
  }
};

/*edit */


  const handleEdit = (student) => {
  setForm({
    fullName: student.fullName || "",
    studentId: student.studentId || "",
    password: student.password || "",
    studentClass: student.studentClass || "",
    grade: student.grade || "",
    dob: student.dob || "",
    medium: student.medium || "",
    contactNo: student.contactNo || "",
    gname: student.gname || "",
    address: student.address || "",
    gender: student.gender || "",
  });

  setEditingId(student.userId);
  setShowModal(true);
};
  return (

    <div className="student-page">

      {/* HEADER */}
          <p className="event-school-name">
            Rajasinghe Central College
          </p>
      <div className="student-header">
          
        <div>
          <h1>Student Management</h1>

          <p>
            Manage all student records and information
          </p>
        </div>

        <button
          className="add-student-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Student
        </button>

      </div>

      {/* TABLE CARD */}

      <div className="student-card">

        {/* SEARCH */}

        <div className="student-search-box">

          <input
            type="text"
            placeholder="Search students by name, admission number, or grade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* TABLE */}

        <table className="student-table">

          <thead>
            <tr>
              <th>Admission No</th>
              <th>Name</th>
              <th>Grade/Class</th>
              <th>Medium</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.map((s) => (

              <tr key={s.userId}>

                <td>{s.studentId}</td>

                <td>{s.fullName}</td>

                <td>
                    {s.grade} - {s.studentClass}
                </td>

                <td>
                  <span className={`medium-badge ${s.medium}`}>
                    {s.medium}
                  </span>
                </td>

                <td>{s.contactNo}</td>

                <td>

                 <button
    className="edit-btn"
    onClick={() => handleEdit(s)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(s.userId)}
  >
    Delete
  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="student-modal-overlay">

          <div className="student-modal">

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2>Register Student</h2>

            <form onSubmit={handleSubmit} className="student-form-grid">

  {/* FULL NAME */}
  <div className="form-group">
    <label>Full Name</label>
    <input
      type="text"
      name="fullName"
      placeholder="Enter full name"
      value={form.fullName}
      onChange={handleChange}
      required
    />
  </div>

  {/* ADMISSION NUMBER */}
  <div className="form-group">
    <label>Admission Number</label>
    <input
      type="text"
      name="studentId"
      placeholder="Enter admission number"
      value={form.studentId}
      onChange={handleChange}
      required
    />
  </div>

  {/* GRADE */}
  <div className="form-group">
    <label>Grade</label>
    <select
      name="grade"
      value={form.grade}
      onChange={handleChange}
      required
    >
      <option value="">Select Grade</option>
      <option value="Grade 6">Grade 6</option>
      <option value="Grade 7">Grade 7</option>
      <option value="Grade 8">Grade 8</option>
      <option value="Grade 9">Grade 9</option>
      <option value="Grade 10">Grade 10</option>
      <option value="Grade 11">Grade 11</option>
    </select>
  </div>

  {/* CLASS */}
  <div className="form-group">
    <label>Class</label>
    <input
      type="text"
      name="studentClass"
      placeholder="Enter class (e.g. A, B, C)"
      value={form.studentClass}
      onChange={handleChange}
      required
    />
  </div>

  {/* MEDIUM */}
  <div className="form-group">
    <label>Medium</label>
    <select
      name="medium"
      value={form.medium}
      onChange={handleChange}
      required
    >
      <option value="">Select Medium</option>
      <option value="Sinhala">Sinhala</option>
      <option value="English">English</option>
     
    </select>
  </div>

  {/* DATE OF BIRTH */}
  <div className="form-group">
    <label>Date of Birth</label>
    <input
      type="date"
      name="dob"
      value={form.dob}
      onChange={handleChange}
      required
    />
  </div>

  {/* PASSWORD */}
  <div className="form-group full-width">
    <label>Password</label>
    <input
      type="password"
      name="password"
      placeholder="Create password for LMS access"
      value={form.password}
      onChange={handleChange}
      required
    />
  </div>

  {/* ADDRESS */}
  <div className="form-group full-width">
    <label>Address</label>
    <textarea
      name="address"
      placeholder="Enter address"
      value={form.address}
      onChange={handleChange}
      required
    />
  </div>

  {/* GUARDIAN NAME */}
  <div className="form-group">
    <label>Guardian Name</label>
    <input
      type="text"
      name="gname"
      value={form.gname}
      placeholder="Guardian name"
      onChange={handleChange}
      required
    />
  </div>

  {/* CONTACT NUMBER */}
  <div className="form-group">
    <label>Guardian Contact Number</label>
    <input
      type="text"
      name="contactNo"
      placeholder="Phone number"
      value={form.contactNo}
      onChange={handleChange}
      required
    />
  </div>

  {/* BUTTONS */}
  <div className="modal-btns">

    <button
      type="reset"
      className="clearb-btn"
    >
      Clear
    </button>

    <button
      type="submit"
      className="save-btn"
    >
      Save Student
    </button>

  </div>

</form>
        
              

          </div>

        </div>

      )}

    </div>
  );
}