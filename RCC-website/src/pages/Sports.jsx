import { Trophy, Award, Volleyball } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import sportsImage from "../assets/sport.png";
import cricketImage from "../assets/cricket.jpeg";
import karatheImage from "../assets/karathe.jpeg";
import VolleyballImage from "../assets/volleyball.jpeg";
import rugbyImage from "../assets/rugby.jpeg";
import "../styles/styles.css";

export function Sports() {

  const { t } = useLanguage();

  

  const sports = [
    {
      name: t("sports.volleyball"),
      icon: "🏐",
      path: "/sports/volleyball",
      image:VolleyballImage,
    },
    {
      name: t("sports.cricket"),
      icon: "🏏",
      path: "/sports/cricket",
      image:cricketImage,
        
     
    },
    {
      name: t("sports.rugby"),
      icon: "🏉",
      path: "/sports/rugby",
      image:rugbyImage,
    },
    {
      name: t("sports.karate"),
      icon: "🥋",
      path: "/sports/karate",
      image:karatheImage,
      
    },
    {
      name: t("Others"),
      icon: "🏃",
      path: "/sports/athletics",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      description: "Record Holders",
    },
     
  ];

  return (

    <div>

      {/* HERO SECTION */}

      <section className="sports-hero">

        <ImageWithFallback
          src={sportsImage}
          alt="Sports"
        />

        <div className="sports-overlay">
          <h1>{t("sports.title")}</h1>
        </div>

      </section>

      {/* INTRO SECTION */}

      <section className="sports-intro">

        <div className="sports-intro-icon">

          <Trophy
            size={33}
            color="#FFD700"
          />

        </div>

        <h2>
          {t("sports.championsTitle")}
        </h2>

        <p>
          {t("sports.intro")}
        </p>

      </section>

      

{/* SPORTS SECTION */}
<section className="sports-section">

  <div className="section-title">

    <h2>
      {t("sports.weOffer")}
    </h2>

    <div className="section-line"></div>

    

  </div>

  <div className="sports-list">

    {sports.map((sport, index) => (

      <Link
        key={index}
        to={sport.path}
        className="sport-row-card"
      >

        {/* LEFT IMAGE */}
        <div className="sport-row-image">

          <ImageWithFallback
            src={sport.image}
            alt={sport.name}
          />

        </div>

        {/* RIGHT CONTENT */}
        <div className="sport-row-content">

          <div className="sport-top-row">

            

            <h3>
              {sport.name}
            </h3>

          </div>

          <p className="sport-row-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Students are trained professionally with modern coaching
            methods and participate in district and national level
            tournaments.
          </p>

          

          <button className="sport-view-btn">
            View More
          </button>

        </div>

      </Link>

    ))}

  </div>

</section>





      

      {/* CTA SECTION */}

      <section className="sports-cta">

        <h2>
          {t("sports.joinTitle")}
        </h2>

        <p>
          {t("sports.joinDesc")}
        </p>

      </section>

    </div>
  );
}