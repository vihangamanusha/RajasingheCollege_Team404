import { useState, useEffect } from "react";
import "../index.css";

export default function StudentRegister() {

 const [form, setForm] = useState({
  fullName: "",
  studentId: "",
  password: "",
  grade: "",
  studentClass: "",
  medium: "",
  dob: "",
  address: "",

  gardian_name: "",
  gardian_contact: "",

  emergency_contact_name_01: "",
  emergency_contact_contact_01: "",

  emergency_contact_name_02: "",
  emergency_contact_contact_02: "",

  mother_job: "",
  father_job: "",
  donation: "",
});

  const [step, setStep] = useState(1);

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
      gardian_name: "",
      gardian_contact: "",
      emergency_contact_name_01: "",
      emergency_contact_contact_01: "",
      emergency_contact_name_02: "",
      emergency_contact_contact_02: "",
      mother_job: "",
      father_job: "",
      donation: "",

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
    grade: student.grade || "",
    studentClass: student.studentClass || "",
    medium: student.medium || "",
    dob: student.dob || "",
    address: student.address || "",

    gardian_name: student.gardian_name || "",
    gardian_contact: student.gardian_contact || "",

    emergency_contact_name_01:
      student.emergency_contact_name_01 || "",

    emergency_contact_contact_01:
      student.emergency_contact_contact_01 || "",

    emergency_contact_name_02:
      student.emergency_contact_name_02 || "",

    emergency_contact_contact_02:
      student.emergency_contact_contact_02 || "",

    mother_job: student.mother_job || "",
    father_job: student.father_job || "",
    donation: student.donation || "",
  });

  setEditingId(student.userId);
  setStep(1);
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
  onClick={() => {
    setEditingId(null);

    setForm({
      fullName: "",
      studentId: "",
      password: "",
      grade: "",
      studentClass: "",
      medium: "",
      dob: "",
      address: "",

      gardian_name: "",
      gardian_contact: "",

      emergency_contact_name_01: "",
      emergency_contact_contact_01: "",

      emergency_contact_name_02: "",
      emergency_contact_contact_02: "",

      mother_job: "",
      father_job: "",
      donation: "",
    });

    setStep(1);
    setShowModal(true);
  }}
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

 {step === 1 && (
  <div className="student-form-grid">

    <div className="form-group">
      <label>Full Name</label>
      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Admission No</label>
      <input
        name="studentId"
        value={form.studentId}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Grade</label>
      <input
        name="grade"
        value={form.grade}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Class</label>
      <input
        name="studentClass"
        value={form.studentClass}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Medium</label>
      <select
        name="medium"
        value={form.medium}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="Sinhala">Sinhala</option>
        <option value="English">English</option>
      </select>
    </div>

    <div className="form-group">
      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
      />
    </div>

    <div className="form-group full-width">
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
    </div>

    <div className="form-group full-width">
      <label>Address</label>
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
      />
    </div>

    <div className="modal-btns">
      <button
        type="button"
        className="save-btn"
        onClick={() => setStep(2)}
      >
        Next →
      </button>
    </div>

  </div>
)}
{step === 2 && (
  <div className="student-form-grid">

    <div className="form-group">
      <label>Guardian Name</label>
      <input
        name="gardian_name"
        value={form.gardian_name}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Guardian Contact</label>
      <input
        name="gardian_contact"
        value={form.gardian_contact}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Emergency Contact 1</label>
      <input
        name="emergency_contact_name_01"
        value={form.emergency_contact_name_01}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Emergency Phone 1</label>
      <input
        name="emergency_contact_contact_01"
        value={form.emergency_contact_contact_01}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Emergency Contact 2</label>
      <input
        name="emergency_contact_name_02"
        value={form.emergency_contact_name_02}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Emergency Phone 2</label>
      <input
        name="emergency_contact_contact_02"
        value={form.emergency_contact_contact_02}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Mother Occupation</label>
      <input
        name="mother_job"
        value={form.mother_job}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Father Occupation</label>
      <input
        name="father_job"
        value={form.father_job}
        onChange={handleChange}
      />
    </div>

    <div className="form-group full-width">
      <label>Donations Received</label>
      <textarea
        name="donation"
        value={form.donation}
        onChange={handleChange}
      />
    </div>

    <div className="modal-btns">

      <button
        type="button"
        className="clearb-btn"
        onClick={() => setStep(1)}
      >
        ← Previous
      </button>

      <button
        type="submit"
        className="save-btn"
      >
        {editingId ? "Update Student" : "Save Student"}
      </button>

    </div>

  </div>
)}

</form>
        
              

          </div>

        </div>

      )}

    </div>
  );
}