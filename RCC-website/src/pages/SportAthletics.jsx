import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import otherSportsImage from "../assets/othergames.jpg";
import other from "../assets/sportothers.jpeg";
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
          src={otherSportsImage}
          alt="Athletics"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={28} />
            </div>

            <h1>Other Sports</h1>

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
            About Other Sports
          </h2>

          <div className="title-line"></div>

          <p>
            Our school offers a wide range of sports including Netball, Badminton, athletics,Chess, and many other
            activities. These sports provide students with opportunities to develop
            teamwork, discipline, leadership, physical fitness, and confidence through
            regular training and competitive participation.
          </p>

          <p>
            Under the guidance of experienced coaches and dedicated teachers, our
  students proudly represent the school in inter-house, district, provincial,
  and national competitions, achieving outstanding success while promoting
  sportsmanship, unity, and excellence in every sporting event
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src={other}
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
        There are currently no achievements available.
        Please check back later for the latest tournament victories and sports
        accomplishments.
      </p>

    </div>

  )}

</section>

    </div>
  );
}