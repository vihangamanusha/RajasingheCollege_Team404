import { Trophy, Shield, Medal, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "./SportRugby.css";

export function SportRugby() {

  const achievements = [
    {
      title: "Inter-School Rugby Champions 2025",
      description:
        "Our senior rugby squad became inter-school champions after an outstanding unbeaten season.",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop",
    },
    {
      title: "Regional Rugby Tournament Winners",
      description:
        "The team displayed exceptional teamwork and discipline to secure the regional title in 2024.",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop",
    },
    {
      title: "Under-18 Rugby Cup Champions",
      description:
        "Our under-18 players showed remarkable determination and sportsmanship throughout the tournament.",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c643e7485?w=800&h=500&fit=crop",
    },
  ];

  return (
    <div className="rugby-page">

      {/* HERO SECTION */}
      <section className="rugby-hero">

        <ImageWithFallback
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&h=1080&fit=crop"
          alt="Rugby"
          className="rugby-hero-image"
        />

        <div className="rugby-overlay">

          <div className="rugby-hero-content">

            <div className="rugby-icon-box">
              <Trophy size={40} />
            </div>

            <h1>Rugby</h1>

            <p>
              Building strength, teamwork, discipline, and leadership through
              competitive school rugby.
            </p>

          </div>

        </div>

      </section>

      {/* INTRO SECTION */}
      <section className="rugby-intro-section">

        <div className="rugby-intro-container">

          <div className="rugby-intro-left">

            <h2>Inter-School Rugby Excellence</h2>

            <p>
              Rugby has become one of the most respected sports in our school.
              Our players are trained to maintain discipline, physical fitness,
              strategic thinking, and strong teamwork both on and off the field.
            </p>

            <p>
              With experienced coaches and dedicated players, the rugby squad
              continues to achieve success in regional and national
              competitions.
            </p>

          </div>

          <div className="rugby-intro-right">

            <div className="rugby-stat-card">
              <Shield size={28} />
              <h3>10+</h3>
              <p>Major Rugby Titles</p>
            </div>

            <div className="rugby-stat-card">
              <Medal size={28} />
              <h3>25+</h3>
              <p>National Players</p>
            </div>

            <div className="rugby-stat-card">
              <Users size={28} />
              <h3>100+</h3>
              <p>Active Players</p>
            </div>

          </div>

        </div>

      </section>

      {/* ACHIEVEMENTS */}
      <section className="rugby-achievement-section">

        <div className="rugby-section-header">

          <h2>Rugby Achievements</h2>

          <p>
            Our rugby teams continue to make the school proud through outstanding
            performances and championship victories.
          </p>

        </div>

        <div className="rugby-achievement-container">

          {achievements.map((item, index) => (

            <div
              className={`rugby-achievement-card ${
                index % 2 !== 0 ? "reverse" : ""
              }`}
              key={index}
            >

              {/* IMAGE */}
              <div className="rugby-achievement-image">

                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="rugby-achievement-img"
                />

              </div>

              {/* CONTENT */}
              <div className="rugby-achievement-content">

                <span className="rugby-achievement-badge">
                  Achievement
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}