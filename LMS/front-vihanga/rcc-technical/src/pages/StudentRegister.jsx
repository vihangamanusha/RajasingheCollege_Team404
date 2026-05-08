import { useState, useEffect } from "react";

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

  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);

  // ✅ LOAD STUDENTS
  const loadStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/students");
      const data = await res.json();
      setStudents(data || []);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  // ✅ LOAD ON PAGE OPEN
  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to register student");
      }

      setMessage("Student registered successfully!");

      // reset form
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

      // ✅ refresh list
      loadStudents();
    } catch (error) {
      console.error(error);
      setMessage("Error registering student");
    }
  };

  return (
    <div className="student-form">
      <h2>Student Registration</h2>

      {message && <p className="message">{message}</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
        <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="studentClass" placeholder="Class (e.g. 10-A)" value={form.studentClass} onChange={handleChange} />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />

        <select name="medium" value={form.medium} onChange={handleChange}>
          <option value="">Select Medium</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
        </select>

        <input name="contactNo" placeholder="Contact Number" value={form.contactNo} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} />

        <button type="submit">Register Student</button>
      </form>

      {/* ✅ STUDENT LIST */}
      <div className="student-list">
        <h3>Registered Students</h3>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Medium</th>
                <th>Contact</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.userId}>
                  <td>{s.userId}</td>
                  <td>{s.fullName}</td>
                  <td>{s.studentId}</td>
                  <td>{s.studentClass}</td>
                  <td>{s.medium}</td>
                  <td>{s.contactNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}