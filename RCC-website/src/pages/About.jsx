import { Target, Award, History } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
          alt="About Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">{t("nav.about")}</h1>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center">
                  <History className="w-8 h-8 text-[#FFD700]" />
                </div>
              </div>
              <h2 className="text-4xl text-[#002147] mb-6">
                {t("about.ourHistory")}
              </h2>
            </div>
            <p className="text-base text-gray-600 mb-4 leading-relaxed font-light italic text-center">
              {t("about.historyDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
              <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h2 className="text-3xl text-[#002147] mb-4">
                {t("about.ourMission")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-light italic">
                {t("about.missionDesc")}
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
              <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h2 className="text-3xl text-[#002147] mb-4">
                {t("about.ourVision")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-light italic">
                {t("about.visionDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#002147] mb-4">
              {t("about.principalMessage")}
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop"
                  alt="Principal"
                  className="w-full h-96 object-cover"
                />

                <div className="p-6 text-center bg-[#002147] text-white">
                  <h3 className="text-[#FFD700] text-2xl mb-2">
                    Mr. K.P. Jayasinghe
                  </h3>
                  <p className="text-gray-300">{t("about.principal")}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-6 leading-relaxed font-light italic">
                {t("about.principalMsg")}
              </p>
              <p className="text-base text-gray-600 mb-6 leading-relaxed font-light italic">
                {t("about.principalMsg2")}
              </p>
              <p className="text-base text-gray-700 font-medium">
                - Mr. K.P. Jayasinghe, {t("about.principal")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
