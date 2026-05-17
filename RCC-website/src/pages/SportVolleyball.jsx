import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../styles/styles.css";

export function SportVolleyball() {

  const achievements = [

    {
      title: "Provincial Champions 2025",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop",
      description:
        "Our volleyball team achieved the provincial championship through excellent teamwork and dedication.",
    },

    {
      title: "District Tournament Winners",
      image:
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&h=600&fit=crop",
      description:
        "Students performed exceptionally well in district tournaments and secured first place.",
    },

    {
      title: "Inter School Champions",
      image:
        "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=600&fit=crop",
      description:
        "The school volleyball squad became champions in the annual inter-school competition.",
    },

  ];

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