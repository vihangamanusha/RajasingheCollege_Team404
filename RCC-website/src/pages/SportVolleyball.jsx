import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import VolleyballImage from "../assets/volleyballs.jpg";
import newsImage from "../assets/news.jpeg";
import "../styles/styles.css";

export function SportVolleyball() {

  const [achievements, setAchievements] = useState([]);
    
      useEffect(() => {
    
        loadAchievements();
    
      }, []);
      const loadAchievements = async () => {
    
        try {
    
          const data = await getBySportType("Volleyball");
    
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
          src={VolleyballImage}
          alt="Volleyball"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={28} />
            </div>

            <h1>Volleyball</h1>

            <p>
              Building champions through discipline,
              teamwork, and dedication.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-section">

        <div className="about-left">

          <h2>
            About Volleyball
          </h2>

          <div className="title-line"></div>

          <p>
            Volleyball is one of the leading sports activities in our school.
            Students receive professional coaching and participate in district,
            provincial, and national level competitions every year.
          </p>

          <p>
            Our volleyball team has consistently demonstrated outstanding performance in
            school tournaments and has earned recognition through dedication and hard
            work. Students are encouraged to build confidence, teamwork, discipline, and
            leadership while proudly representing the school in competitive events.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src={newsImage}
            alt="Volleyball Team"
          />

        </div>

      </section>

      {/* ACHIEVEMENTS */}

      {/* ACHIEVEMENTS */}

<section className="achievement-section">

  <div className="section-heading">

    <h2>
      Achievements
    </h2>

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
        There are currently no volleyball achievements available.
        Please check back later for the latest updates and accomplishments.
      </p>

    </div>

  )}

</section>

    </div>
  );
}