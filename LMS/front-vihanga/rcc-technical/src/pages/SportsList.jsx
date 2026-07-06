import { useNavigate } from "react-router-dom";
import "../index.css";

export default function SportsList() {

  const navigate = useNavigate();

  const sports = [

    {
      id: "volleyball",
      name: "Volleyball",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=600&fit=crop",
      description:
        "Develop teamwork, discipline, and leadership through volleyball competitions and training.",
    },

    {
      id: "cricket",
      name: "Cricket",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&h=600&fit=crop",
      description:
        "Build sportsmanship and competitive spirit with school cricket tournaments and coaching.",
    },

    {
      id: "rugby",
      name: "Rugby",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&h=600&fit=crop",
      description:
        "Enhance strength, teamwork, and leadership through rugby practices and matches.",
    },

    {
      id: "karate",
      name: "Karate",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&h=600&fit=crop",
      description:
        "Train students with discipline, focus, and self-defense through karate programs.",
    },

    {
      id: "athletics",
      name: "Athletics",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&h=600&fit=crop",
      description:
        "Improve speed, endurance, and confidence through athletics training and competitions.",
    },

  ];

  return (

    <div className="sports-admin-page">

      {/* HEADER */}

      <div className="sports-admin-header">

        <div>

          <p className="sports-admin-school">
            Rajasinghe Central College
          </p>

          <h1>
            Sports Management
          </h1>

          <p>
            Manage sports achievements, records, and activities.
          </p>

        </div>

      </div>

      {/* SPORTS GRID */}

      <div className="sports-grid">

        {sports.map((sport) => (

          <div
            key={sport.id}
            className="sport-card"
          >

            {/* IMAGE */}

            <div className="sport-image-box">

              <img
                src={sport.image}
                alt={sport.name}
                className="sport-image"
              />

            </div>

            {/* CONTENT */}

            <div className="sport-content">

              <h2>
                {sport.name}
              </h2>

              <p>
                {sport.description}
              </p>

              <button
                className="sport-manage-btn"
                onClick={() =>
                  navigate(`/sport-achievements/${sport.id}`)
                }
              >
                Manage Achievements
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}