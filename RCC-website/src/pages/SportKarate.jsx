import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function SportKarate() {
  const { t } = useLanguage();
  const achievements = [
    {
      year: "2025",
      titleKey: "karate.achievement1.title",
      descriptionKey: "karate.achievement1.desc",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=600&fit=crop",
    },
    {
      year: "2024",
      titleKey: "karate.achievement2.title",
      descriptionKey: "karate.achievement2.desc",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=600&fit=crop",
    },
    {
      year: "2024",
      titleKey: "karate.achievement3.title",
      descriptionKey: "karate.achievement3.desc",
      image:
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1920&h=1080&fit=crop"
          alt="Karate"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/90 via-[#002147]/70 to-[#002147]/90 flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl mb-4">🥋</div>
            <h1 className="text-6xl md:text-7xl text-white mb-4">
              {t("sports.karate")}
            </h1>
            <p className="text-xl text-[#FFD700] italic">
              {t("karate.tagline")}
            </p>
          </div>
        </div>
      </section>

      {/* Description & History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=800&fit=crop"
                alt="Karate Training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-5xl text-[#002147] mb-6">
                {t("sport.about")} {t("sports.karate")} {t("sport.program")}
              </h2>
              <div className="w-24 h-1 bg-[#FFD700] mb-8"></div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("karate.desc1")}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t("karate.desc2")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("karate.desc3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-gradient-to-b from-[#F5F5F5] to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#002147] mb-4">
              {t("sport.excellence")}
            </h2>
            <div className="w-32 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-6 right-6 bg-[#FFD700] text-[#002147] px-6 py-3 rounded-full shadow-lg">
                    <span className="text-2xl font-semibold">
                      {achievement.year}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl text-[#002147] mb-4 group-hover:text-[#FFD700] transition-colors duration-300">
                    {t(achievement.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(achievement.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
