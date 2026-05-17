import { Trophy, Award } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/styles.css";

export function Sports() {

  const { t } = useLanguage();

  const coaches = [
    {
      name: "Mr. D.S. Silva",
      specialty: "Athletics & Cricket",
      experience: "15 years",
    },
    {
      name: "Mrs. N.K. Perera",
      specialty: "Volleyball & Karate",
      experience: "12 years",
    },
    {
      name: "Mr. A.R. Fernando",
      specialty: "Rugby",
      experience: "10 years",
    },
  ];

  const sports = [
    {
      name: t("sports.volleyball"),
      icon: "🏐",
      path: "/sports/volleyball",
      image:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop",
      description: "Provincial Champions",
    },
    {
      name: t("sports.cricket"),
      icon: "🏏",
      path: "/sports/cricket",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop",
      description: "District Tournament Winners",
    },
    {
      name: t("sports.rugby"),
      icon: "🏉",
      path: "/sports/rugby",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop",
      description: "Inter-School Champions",
    },
    {
      name: t("sports.karate"),
      icon: "🥋",
      path: "/sports/karate",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=600&fit=crop",
      description: "National Medalists",
    },
    {
      name: t("sports.athletics"),
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
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&h=1080&fit=crop"
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
            size={45}
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

      # Upgraded Sports Section (Professional Horizontal Cards)

## Replace Your Current `sports-grid` Section With This JSX

```jsx
{/* SPORTS SECTION */}
<section className="sports-section">

  <div className="section-title">

    <h2>
      {t("sports.weOffer")}
    </h2>

    <div className="section-line"></div>

    <p>
      {t("sports.weOfferDesc")}
    </p>

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

            <div className="sport-row-icon">
              {sport.icon}
            </div>

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

          <div className="sport-achievement">
            {sport.description}
          </div>

          <button className="sport-view-btn">
            View More
          </button>

        </div>

      </Link>

    ))}

  </div>

</section>





      {/* COACHING STAFF */}

      <section className="coaches-section">

        <div className="section-title">

          <h2>
            {t("sports.coachingStaff")}
          </h2>

          <div className="section-line"></div>

        </div>

        <div className="coaches-grid">

          {coaches.map((coach, index) => (

            <div
              key={index}
              className="coach-card"
            >

              <div className="coach-icon">

                <Award
                  size={45}
                  color="#002147"
                />

              </div>

              <h3>
                {coach.name}
              </h3>

              <p>
                {coach.specialty}
              </p>

              <p>
                {coach.experience} of experience
              </p>

            </div>

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