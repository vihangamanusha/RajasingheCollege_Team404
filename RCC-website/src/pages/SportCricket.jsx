import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import "../styles/styles.css";

export function SportCricket() {

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {

    loadAchievements();

  }, []);
  const loadAchievements = async () => {

    try {

      const data = await getBySportType("Cricket");

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
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&h=1080&fit=crop"
          alt="Cricket"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={40} />
            </div>

            <h1>Cricket</h1>

            <p>
              Developing discipline, teamwork,
              and sportsmanship through cricket excellence.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-section">

        <div className="about-left">

          <h2>
            About Cricket
          </h2>

          <div className="title-line"></div>

          <p>
            Cricket is one of the most celebrated sports in our school.
            Students participate in competitive tournaments and receive
            professional coaching to improve their batting, bowling,
            and fielding techniques.
          </p>

          <p>
            Our cricket team has earned many championships and continues
            to build talented players who represent the school with pride.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&h=700&fit=crop"
            alt="Cricket Team"
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