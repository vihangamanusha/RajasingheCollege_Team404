import { BookOpen } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function Academic() {
  const { t } = useLanguage();
  const facilities = [
    {
      titleKey: "facility1.title",
      descriptionKey: "facility1.desc",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    },
    {
      titleKey: "facility2.title",
      descriptionKey: "facility2.desc",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop",
    },
    {
      titleKey: "facility3.title",
      descriptionKey: "facility3.desc",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <div className="background">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
            alt="Academic Programs"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overlay">
          <div className="content">
            <h1 className="title">
              {t("academic.title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <h2 className="text-4xl text-primary mb-6">
              {t("academic.excellence")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our comprehensive academic programs are designed to provide
              students with a strong foundation in their chosen fields while
              developing critical thinking, problem-solving, and leadership
              skills. We offer multiple streams to cater to diverse interests
              and career aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {t("academic.ourPrograms")}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="academic-grid">
            {/* Grades 6-9 */}
            <Link
              to="/academic/grades-6-9"
              className="facility-card"
            >
              <div className="facility-image">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
                  alt="Grades 6-9"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="facility-content">
                <h3 className="facility-title">
                  {t("academic.grades69")}
                </h3>
                <p className="facility-description">
                  {t("academic.grades69Desc")}
                </p>
              </div>
            </Link>

            {/* Ordinary Level */}
            <Link
              to="/academic/ordinary-level"
              className="facility-card"
            >
              <div className="facility-image">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                  alt="Ordinary Level"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="facility-content">
                <h3 className="facility-title">
                  {t("academic.oLevel")}
                </h3>
                <p className="facility-description">
                  {t("academic.oLevelDesc")}
                </p>
              </div>
            </Link>

            {/* Advanced Level */}
            <Link
              to="/academic/advanced-level"
              className="facility-card"
            >
              <div className="facility-image">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
                  alt="Advanced Level"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="facility-content">
                <h3 className="facility-title">
                  {t("academic.aLevel")}
                </h3>
                <p className="facility-description">
                  {t("academic.aLevelDesc")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Examination Results */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {t("academic.examExcellence")}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "O/L Success Rate",
                percentage: "95%",
                description: "Students passing with 6+ subjects",
              },
              {
                title: "A/L Success Rate",
                percentage: "88%",
                description: "Students qualifying for university",
              },
              {
                title: "Distinction Rate",
                percentage: "45%",
                description: "Students achieving A grades",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary to-[#003366] text-white p-10 rounded-lg shadow-xl text-center"
              >
                <div className="text-6xl text-secondary mb-4">
                  {stat.percentage}
                </div>
                <h3 className="text-2xl mb-3">{stat.title}</h3>
                <p className="text-gray-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {t("academic.facilities")}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="facility-card"
              >
                <div className="facility-image">
                  <ImageWithFallback
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="facility-content">
                  <h3 className="facility-title">
                    {t(facility.titleKey)}
                  </h3>
                  <p className="facility-description">{t(facility.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Staff Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Academic Staff"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-4xl text-primary">
                  {t("academic.staff")}
                </h2>
              </div>
              <p className="text-base text-gray-600 mb-6 leading-relaxed font-light italic">
                {t("academic.staffDesc")}
              </p>
              <Link
                to="/academic/all-staff"
                className="btn btn-primary"
              >
                <span>{t("academic.seeAllStaff")}</span>
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LMS Portal Link */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#003366] text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl mb-6">
            {t("academic.lmsAccess")}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("academic.lmsDesc")}
          </p>
          <a
            href="https://lms.rrcc.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <BookOpen className="w-6 h-6" />
            <span>{t("academic.accessPortal")}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
