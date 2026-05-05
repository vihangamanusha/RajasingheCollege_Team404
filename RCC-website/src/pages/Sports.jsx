import { Trophy, Award } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

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

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&h=1080&fit=crop"
          alt="Sports"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            {t("sports.title")}
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#FFD700]" />
              </div>
            </div>
            <h2 className="text-4xl text-[#002147] mb-6">
              {t("sports.championsTitle")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("sports.intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Sports Available */}
      <section className="py-24 bg-gradient-to-b from-[#F5F5F5] to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#002147] mb-4">
              {t("sports.weOffer")}
            </h2>
            <div className="w-32 h-1 bg-[#FFD700] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("sports.weOfferDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {[
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
            ].map((sport, index) => (
              <Link
                key={index}
                to={sport.path}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/95 via-[#002147]/50 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <div className="text-6xl mb-3 transform group-hover:scale-125 transition-transform duration-500">
                      {sport.icon}
                    </div>
                    <h3 className="text-white text-2xl mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                      {sport.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{sport.description}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 bg-[#FFD700] px-4 py-2 rounded-bl-xl">
                  <svg
                    className="w-5 h-5 text-[#002147]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Staff */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#002147] mb-4">
              {t("sports.coachingStaff")}
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#002147] to-[#003366] text-white p-8 rounded-lg shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-12 h-12 text-[#002147]" />
                </div>
                <h3 className="text-[#FFD700] mb-3">{coach.name}</h3>
                <p className="text-gray-300 mb-2">{coach.specialty}</p>
                <p className="text-sm text-gray-400">
                  {coach.experience} of experience
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl text-[#002147] mb-6">
            {t("sports.joinTitle")}
          </h2>
          <p className="text-lg text-gray-700">{t("sports.joinDesc")}</p>
        </div>
      </section>
    </div>
  );
}
