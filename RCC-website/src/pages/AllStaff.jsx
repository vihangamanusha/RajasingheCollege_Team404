import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../styles/styles.css";
import { getAllTeachers } from "../api/teacherApi";
import staffImage from "../assets/staff.jpeg";

export function AllStaff() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers();
      console.log("Teachers from DB:", data);
      setTeachers(data);
    } catch (error) {
      console.log("Error loading teachers:", error);
    }
  };

  return(
    <div className="staff-page">

      {/* Hero */}
      <section className="staff-hero">
        <ImageWithFallback
          src={staffImage}
          alt="All Staff"
          className="staff-hero-img"
        />

        <div className="staff-hero-overlay">
          <h1 className="staff-hero-title">Our Staff</h1>
        </div>
      </section>

      {/* Introduction */}
<section className="academic-intro-section">
  <div className="academic-section-wrapper">

    <div className="academic-intro-card">

      <div className="academic-intro-icon">
        <Users className="academic-intro-icon-symbol" />
      </div>

      <h2 className="academic-intro-title">
        Meet Our Dedicated Staff
      </h2>

      <p className="academic-intro-text">
        Our teaching staff consists of experienced, qualified, and dedicated
        educators who are committed to inspiring students to achieve academic
        excellence and personal growth. Through their knowledge, guidance, and
        continuous support, they create a positive learning environment that
        encourages creativity, discipline, critical thinking, and lifelong
        learning. Every teacher plays an essential role in helping students
        develop the skills, values, and confidence needed for future success.
      </p>

    </div>

  </div>
</section>

      {/* Grid */}
      <section className="staff-section">
        <div className="staff-container">

          {teachers.length > 0 ? (

  <div className="staff-grid">

    {teachers.map((t) => (
  <div key={t.teacherId} className="staff-card">

    <div className="staff-icon">
      <Users />
    </div>

    <h3 className="staff-name">
      {t.fullName}
    </h3>

    <p className="staff-role">
      {t.subjectSpecialization}
    </p>

    <p className="staff-dept">
      {t.contactNumber}
    </p>

  </div>
))}

  </div>

) : (

  <div className="no-staff-container">

    <h3>No Staff Available Yet</h3>

    <p>
      There are currently no staff records available.
      Please check back later.
    </p>

  </div>

)}

        </div>
      </section>

    </div>
  );
}