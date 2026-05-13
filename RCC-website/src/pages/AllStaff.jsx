import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../styles/styles.css";
import { getAllTeachers } from "../api/teacherApi";

export function AllStaff() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const data = await getAllTeachers();
    setTeachers(data);
  };

  return (
    <div className="staff-page">

      {/* Hero */}
      <section className="staff-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
          alt="All Staff"
          className="staff-hero-img"
        />

        <div className="staff-hero-overlay">
          <h1 className="staff-hero-title">Our Staff</h1>
        </div>
      </section>

      {/* Grid */}
      <section className="staff-section">
        <div className="staff-container">

          <div className="staff-grid">
            {teachers.map((t) => (
              <div key={t.teacher_id} className="staff-card">

                <div className="staff-icon">
                  <Users />
                </div>

                <h3 className="staff-name">{t.full_name}</h3>
                <p className="staff-role">{t.subject_specialization}</p>
                <p className="staff-dept">{t.contact_number}</p>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}