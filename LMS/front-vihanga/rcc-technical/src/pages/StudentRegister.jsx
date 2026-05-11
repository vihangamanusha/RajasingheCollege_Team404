import { useState, useEffect } from "react";
import "../index.css";

export default function StudentRegister() {

  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    password: "",
    studentClass: "",
    dob: "",
    medium: "",
    contactNo: "",
    address: "",
  });

  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // LOAD STUDENTS
  const loadStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/students");
      const data = await res.json();
      setStudents(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // HANDLE INPUT
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

      await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Student Registered Successfully!");

      setForm({
        fullName: "",
        studentId: "",
        password: "",
        studentClass: "",
        dob: "",
        medium: "",
        contactNo: "",
        address: "",
      });

      setShowModal(false);

      loadStudents();

    } catch (error) {
      console.error(error);
    }
  };

  // FILTER STUDENTS
  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase()) ||
    s.studentClass.toLowerCase().includes(search.toLowerCase())
  );

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

                <td>{s.studentClass}</td>

                <td>
                  <span className={`medium-badge ${s.medium}`}>
                    {s.medium}
                  </span>
                </td>

                <td>{s.contactNo}</td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button className="delete-btn">
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

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="studentId"
                placeholder="Admission Number"
                value={form.studentId}
                onChange={handleChange}
                required
              />

              

             <select
                name="Grade"
                value={form.Grade}
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


              <input
                type="text"
                name="studentClass"
                placeholder="Class"
                value={form.studentClass}
                onChange={handleChange}
                required
              />

              <select
                name="medium"
                value={form.medium}
                onChange={handleChange}
                required
              >
                <option value="">Select Medium</option>
                <option value="Sinhala">Sinhala</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
              </select>

              
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={form.contactName}
                onChange={handleChange}
                required
              />


              <input
                type="text"
                name="contactNo"
                placeholder="Contact Number"
                value={form.contactNo}
                onChange={handleChange}
                required
              />
        
              <button type="reset" className="clearb-btn">
                Clear
              </button>
              

              <button type="submit" className="save-btn">
                Save Student
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}