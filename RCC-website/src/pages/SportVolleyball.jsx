import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
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
          src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1920&h=1080&fit=crop"
          alt="Volleyball"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={40} />
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
            Our team has produced many talented athletes and continues to
            maintain a strong reputation in school sports.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&h=700&fit=crop"
            alt="Volleyball Team"
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

                {item.image ? (
    <img
      src={
        item.image.startsWith("http")
          ? item.image
          : `http://localhost:8080${item.image}`
      }
      alt={item.topic}
    />
  ) : (<div className="image-placeholder">
      No Image
    </div>
  )}
              </div>

              <div className="achievement-content">

                <h3>
                  {item.topic}
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