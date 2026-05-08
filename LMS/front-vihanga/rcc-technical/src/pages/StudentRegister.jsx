import { useState } from "react";

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
    } catch (error) {
      console.error(error);
      setMessage("Error registering student");
    }
  };

  return (
    <div className="student-form">
      <h2>Student Registration</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          name="studentClass"
          placeholder="Class (e.g. 10-A)"
          value={form.studentClass}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <select name="medium" value={form.medium} onChange={handleChange}>
          <option value="">Select Medium</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
        </select>

        <input
          name="contactNo"
          placeholder="Contact Number"
          value={form.contactNo}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit">Register Student</button>
      </form>
    </div>
  );
}