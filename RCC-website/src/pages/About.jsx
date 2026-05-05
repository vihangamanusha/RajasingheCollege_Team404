import { Target, Award, History } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <div className="background">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overlay">
          <div className="content">
            <h1 className="title">
              {t("nav.about")}
            </h1>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <History className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h2 className="text-4xl text-primary mb-6">
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
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl text-primary mb-4">
                {t("about.ourMission")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-light italic">
                {t("about.missionDesc")}
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl text-primary mb-4">
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
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {t("about.principalMessage")}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop"
                  alt="Principal"
                  className="w-full h-96 object-cover"
                />

                <div className="p-6 text-center bg-primary text-white">
                  <h3 className="text-secondary text-2xl mb-2">
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
