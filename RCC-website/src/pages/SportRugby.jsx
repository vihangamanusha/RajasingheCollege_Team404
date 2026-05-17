import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../styles/styles.css";

export function SportRugby() {

  const achievements = [

    {
      title: "Inter-School Rugby Champions 2025",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop",
      description:
        "Our rugby team became inter-school champions after an outstanding season filled with determination and teamwork.",
    },

    {
      title: "Regional Rugby Tournament Winners",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=600&fit=crop",
      description:
        "Students showcased excellent leadership and discipline to secure victory in the regional rugby tournament.",
    },

    {
      title: "Under-18 Rugby Cup Champions",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c643e7485?w=800&h=600&fit=crop",
      description:
        "Our under-18 rugby squad displayed remarkable skill and sportsmanship throughout the championship competition.",
    },

  ];

  return (

    <div className="sport-page">

      {/* HERO */}

      <section className="sport-hero">

        <ImageWithFallback
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&h=1080&fit=crop"
          alt="Rugby"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={40} />
            </div>

            <h1>Rugby</h1>

            <p>
              Building strength, teamwork,
              discipline, and leadership through rugby.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-section">

        <div className="about-left">

          <h2>
            About Rugby
          </h2>

          <div className="title-line"></div>

          <p>
            Rugby is one of the most exciting and competitive sports in our
            school. Students are trained with discipline, physical fitness,
            teamwork, and leadership qualities while participating in major
            tournaments.
          </p>

          <p>
            Our rugby teams have achieved success at regional and national
            levels, producing talented players who proudly represent the school.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&h=700&fit=crop"
            alt="Rugby Team"
          />

        </div>

      </section>

      {/* ACHIEVEMENTS */}

      <section className="achievement-section">

        <div className="section-heading">

          <h2>
            Achievements
          </h2>

          <div className="title-line"></div>

        </div>

        <div className="achievement-grid">

          {achievements.map((item, index) => (

            <div
              className="achievement-card"
              key={index}
            >

              <div className="achievement-image">

                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                />

              </div>

              <div className="achievement-content">

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}