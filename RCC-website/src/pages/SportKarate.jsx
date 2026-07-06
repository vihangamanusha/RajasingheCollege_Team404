import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import coverimage from "../assets/karathe.jpeg";
import karateTeam from "../assets/karatecover.jpg";

import "../styles/styles.css";

export function SportKarate() {

  const [achievements, setAchievements] = useState([]);
    
      useEffect(() => {
    
        loadAchievements();
    
      }, []);
      const loadAchievements = async () => {
    
        try {
    
          const data = await getBySportType("Karate");
    
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
          src={coverimage}
          alt="Karate"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={28} />
            </div>

            <h1>Karate</h1>

            <p>
              Building discipline, confidence,
              focus, and strength through martial arts.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-section">

        <div className="about-left">

          <h2>
            About Karate
          </h2>

          <div className="title-line"></div>

          <p>
            Karate is one of the most respected martial arts programs in our
            school. Students are trained in self-discipline, concentration,
            physical fitness, and self-defense techniques.
          </p>

          <p>
            Our karate athletes regularly compete in district, provincial, and
            national tournaments while bringing pride and recognition to the
            school.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src={karateTeam}
            alt="Karate Team"
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

    <div 
    className="achievement-grid"
    style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  }}>

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
                    : `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${item.image}`
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
        There are currently no achievements available for the Karate team.
        Please check back later for the latest tournament victories and sports
        accomplishments.
      </p>

    </div>

  )}

</section>

    </div>
  );
}