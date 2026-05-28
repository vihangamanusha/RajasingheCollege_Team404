import { Link } from "react-router";
import { ArrowRight, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import scienceImg from "../assets/about.jpeg";
import arduinoImg from "../assets/about.jpeg";
import cadetImg from "../assets/about.jpeg";
import scoutsImg from "../assets/about.jpeg";
import stjohnImg from "../assets/about.jpeg";
import astronomyImg from "../assets/about.jpeg";
import techImg from "../assets/about.jpeg";
import buddhistImg from "../assets/about.jpeg";
import artImg from "../assets/about.jpeg";
import mediaImg from "../assets/about.jpeg";

import "../styles/styles.css";

export function ClubsSocieties() {

  const clubs = [
    {
      id: 1,
      title: "Science Society",
      image: scienceImg,
      description:
        "Encouraging students to explore scientific discoveries, experiments, and innovation.",
    },

    {
      id: 2,
      title: "Arduino Club",
      image: arduinoImg,
      description:
        "Developing programming, robotics, and electronics skills through practical projects.",
    },

    {
      id: 3,
      title: "Cadet Platoon",
      image: cadetImg,
      description:
        "Building leadership, discipline, confidence, and teamwork among students.",
    },

    {
      id: 4,
      title: "Scouts",
      image: scoutsImg,
      description:
        "Teaching survival skills, leadership, responsibility, and community service.",
    },

    {
      id: 5,
      title: "St. John Ambulance",
      image: stjohnImg,
      description:
        "Training students in first aid, healthcare awareness, and emergency response.",
    },

    {
      id: 6,
      title: "Astronomy Society",
      image: astronomyImg,
      description:
        "Exploring planets, stars, galaxies, and the mysteries of the universe.",
    },

    {
      id: 7,
      title: "Tech Society",
      image: techImg,
      description:
        "Promoting technology, coding, innovation, and digital creativity.",
    },

    {
      id: 8,
      title: "Buddhist Society",
      image: buddhistImg,
      description:
        "Encouraging spiritual values, mindfulness, and cultural traditions.",
    },

    {
      id: 9,
      title: "Art Society",
      image: artImg,
      description:
        "Providing opportunities for creativity through painting, drawing, and design.",
    },

    {
      id: 10,
      title: "Media Club",
      image: mediaImg,
      description:
        "Developing photography, videography, editing, and communication skills.",
    },
  ];

  return (
    <div className="clubs-page">

      {/* HERO SECTION */}
      <section className="clubs-hero">

        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="Clubs and Societies"
          className="clubs-hero-image"
        />

        <div className="clubs-overlay">

          <div className="clubs-hero-content">

            <div className="clubs-icon">
              <Users size={40} />
            </div>

            <h1>Clubs & Societies</h1>

            <p>
              Empowering students through leadership,
              creativity, teamwork, and innovation.
            </p>

          </div>

        </div>

      </section>

      {/* INTRO SECTION */}
      <section className="clubs-intro-section">

        <div className="container">

          <div className="clubs-section-header">

            <h2>
              Student Activities & Organizations
            </h2>

            <div className="title-line"></div>

          </div>

          <p className="clubs-intro-text">

            Our school provides a wide range of clubs and societies
            that help students develop leadership qualities, practical
            skills, creativity, teamwork, and confidence. Students are
            encouraged to participate actively in extracurricular
            activities to enhance their talents and personal growth.

          </p>

        </div>

      </section>

      {/* CLUBS LIST */}
<section className="clubs-list-section">

  <div className="container">

    {clubs.map((club) => (

      <div
        key={club.id}
        className="club-row-card"
      >

        {/* LEFT IMAGE */}
        <div className="club-row-image">

          <img
            src={club.image}
            alt={club.title}
          />

        </div>

        {/* RIGHT CONTENT */}
        <div className="club-row-content">

          <h2>
            {club.title}
          </h2>

          <p>
            {club.description}
          </p>
{/* LEARN MORE BUTTON 
          <Link
            to={`/clubs/${club.id}`}
            className="club-row-btn"
          >
            Learn More
            <ArrowRight size={18} />
          </Link>
*/}
        </div>

      </div>

    ))}

  </div>

</section>
    </div>
  );
}