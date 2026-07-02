import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import "../styles/styles.css";

export function SportAthletics() {

  const [achievements, setAchievements] = useState([]);
  
    useEffect(() => {
  
      loadAchievements();
  
    }, []);
    const loadAchievements = async () => {
  
      try {
  
        const data = await getBySportType("Athletics");
  
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
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&h=1080&fit=crop"
          alt="Athletics"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={40} />
            </div>

            <h1>Athletics</h1>

            <p>
              Inspiring speed, endurance,
              determination, and sportsmanship.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-section">

        <div className="about-left">

          <h2>
            About Athletics
          </h2>

          <div className="title-line"></div>

          <p>
            Athletics plays a major role in developing physical fitness,
            discipline, endurance, and confidence among students. Our athletes
            participate in sprinting, relay races, long-distance running, and
            field events throughout the year.
          </p>

          <p>
            With professional coaching and dedicated training, our athletics
            teams continue to achieve success in district, provincial, and
            national competitions.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src="https://images.unsplash.com/photo-1486218119243-13883505764c?w=900&h=700&fit=crop"
            alt="Athletics Team"
          />

        </div>

      </section>

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
        There are currently no achievements available for the Volleyball team.
        Please check back later for the latest tournament victories and sports
        accomplishments.
      </p>

    </div>

  )}

</section>

    </div>
  );
}