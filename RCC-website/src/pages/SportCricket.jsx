import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import cricketTeamImage from "../assets/livestream.jpeg";
import cricketTeam from "../assets/cricketteam.jpg";
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
          src={cricketTeamImage}
          alt="Cricket"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={33} />
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
            Cricket is one of the most popular sports in our school. Students receive
            regular training and participate in inter-school tournaments to develop
            their batting, bowling, and fielding skills.
          </p>

          <p>
           Our school proudly takes part in the annual Big Match, one of the most
           anticipated sporting events, promoting teamwork, sportsmanship, and school
           spirit while continuing a proud cricketing tradition.
          </p>

        </div>

        <div className="about-right">

          <ImageWithFallback
            src={cricketTeam}
            alt="Cricket Team"
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
        There are currently no achievements available for the Cricket team.
        Please check back later for the latest tournament victories and sports
        accomplishments.
      </p>

    </div>

  )}

</section>

    </div>
  );
}