import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
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
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1920&h=1080&fit=crop"
          alt="Karate"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={40} />
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
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&h=700&fit=crop"
            alt="Karate Team"
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