import { Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router";
import "../styles/styles.css";

export function AllStaff() {
  const { t } = useLanguage();

  const staff = [
    { name: "Principal M.S. Jayasooriya", role: "Principal", dept: "Administration" },
    { name: "Mr. K.D. Silva", role: "Deputy Principal", dept: "Academic" },
    { name: "Mrs. R.P. Fernando", role: "HOD - English", dept: "Languages" },
    { name: "Mr. A.K. Perera", role: "HOD - Science", dept: "Science" },
    { name: "Mr. D.S. Silva", role: "Sports Director", dept: "Sports" },
    { name: "Mrs. N.K. Perera", role: "Counselor", dept: "Student Affairs" },
  ];

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
            {staff.map((member, index) => (
              <div key={index} className="staff-card">

                <div className="staff-icon">
                  <Users />
                </div>

                <h3 className="staff-name">{member.name}</h3>
                <p className="staff-role">{member.role}</p>
                <p className="staff-dept">{member.dept}</p>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}