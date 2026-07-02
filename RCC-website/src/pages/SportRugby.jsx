import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import "../styles/styles.css";

export function SportRugby() {

  const [achievements, setAchievements] = useState([]);
    
      useEffect(() => {
    
        loadAchievements();
    
      }, []);
      const loadAchievements = async () => {
    
        try {
    
          const data = await getBySportType("Rugby");
    
          setAchievements(data);
    
        } catch (error) {
    
          console.log(error);
    
        }
      };

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

      {/* ACHIEVEMENTS */}

<section className="achievement-section">

  <div className="section-heading">
    <h2>Achievements</h2>
    <div className="title-line"></div>
  </div>

  {achievements.length > 0 ? (

    <div className="achievement-grid">

      {achievements.map((item, index) => (

        <div
          className="achievement-card"
          key={index}
        >

          <div className="achievement-image">

            {item.image ? (
              <img
                src={
                  item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:8080${item.image}`
                }
                alt={item.topic}
              />
            ) : (
              <div className="image-placeholder">
                No Image
              </div>
            )}

          </div>

          <div className="achievement-content">

            <h3>{item.topic}</h3>

            <p>{item.description}</p>

          </div>

        </div>

      ))}

    </div>

  ) : (

    <div className="no-achievement-container">

      <h3>No Achievements Yet</h3>

      <p>
        There are currently no achievements available for the Rugby team.
        Please check back later for the latest tournament victories and sports
        accomplishments.
      </p>

    </div>

  )}

</section>

    </div>
  );
}