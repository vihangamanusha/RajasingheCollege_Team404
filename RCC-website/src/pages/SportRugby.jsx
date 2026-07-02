import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBySportType } from "../api/sportApi";
import rugbyTeamImage from "../assets/rugbypage.jpg";
import rugbyTeam from "../assets/rugby.jpeg";
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
          src={rugbyTeamImage}
          alt="Rugby"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-icon">
              <Trophy size={28} />
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
            Rising to New Heights! 🏉
            Our school’s rugby journey dates back to the vibrant 1980s, built on raw passion, grit, and an unyielding team spirit. What started as a foundational dream decades ago has now evolved into a powerhouse of talent.
            
</p>
          <p>
           Today, our boys are performing at an absolute peak—showcasing incredible skills, fierce discipline, and high-octane performances on the field. With a string of outstanding recent achievements and dominant victories under our belt, the roaring spirit of our rugby legacy has never been stronger.
            Stay tuned as we continue to tackle boundaries and chase glory! 
          </p>
          <p>
            #SchoolRugby #GoldStandard #RugbyLegacy #RisingChampions
          </p>
          

        </div>

        <div className="about-right">

          <ImageWithFallback
            src={rugbyTeam}
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