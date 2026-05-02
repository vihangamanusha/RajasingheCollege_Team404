import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function SportVolleyball() {
  const { t } = useLanguage();
  const achievements = [
    {
      year: "2025",
      titleKey: "volleyball.achievement1.title",
      descriptionKey: "volleyball.achievement1.desc",
      image:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop",
    },
    {
      year: "2024",
      titleKey: "volleyball.achievement2.title",
      descriptionKey: "volleyball.achievement2.desc",
      image:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop",
    },
    {
      year: "2023",
      titleKey: "volleyball.achievement3.title",
      descriptionKey: "volleyball.achievement3.desc",
      image:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1920&h=1080&fit=crop"
          alt="Volleyball"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/90 via-[#002147]/70 to-[#002147]/90 flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl mb-4">🏐</div>
            <h1 className="text-6xl md:text-7xl text-white mb-4">
              {t("sports.volleyball")}
            </h1>
            <p className="text-xl text-[#FFD700] italic">
              {t("volleyball.tagline")}
            </p>
          </div>
        </div>
      </section>

      {/* Description & History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl text-[#002147] mb-6">
                {t("sport.about")} {t("sports.volleyball")} {t("sport.team")}
              </h2>
              <div className="w-24 h-1 bg-[#FFD700] mb-8"></div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("volleyball.desc1")}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("volleyball.desc2")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("volleyball.desc3")}
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=800&fit=crop"
                alt="Volleyball Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-28 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFD700] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#002147] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-[#FFD700]"></div>
                <Trophy className="w-10 h-10 text-[#FFD700]" />
                <div className="w-12 h-0.5 bg-[#FFD700]"></div>
              </div>
              <h2 className="text-5xl md:text-6xl text-[#002147] mb-4 font-serif">
                {t("sport.achievements")}
              </h2>
              <div className="w-36 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {achievements.map((achievement, index) => (
              <article
                key={index}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-[#FFD700]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={achievement.image}
                    alt={t(achievement.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/50 to-transparent opacity-90"></div>

                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-br from-[#FFD700] to-[#FFC700] text-[#002147] px-6 py-3 rounded-2xl shadow-2xl transform group-hover:rotate-3 transition-transform duration-300">
                      <span className="text-3xl font-bold">
                        {achievement.year}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                      <Trophy className="w-8 h-8 text-[#FFD700]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-16 h-1 bg-[#FFD700] mb-3"></div>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-2xl text-[#002147] mb-4 font-semibold group-hover:text-[#FFD700] transition-colors duration-300 leading-tight">
                    {t(achievement.titleKey)}
                  </h3>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
                  <p className="text-gray-700 leading-relaxed">
                    {t(achievement.descriptionKey)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
