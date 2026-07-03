import { FileText, Download, FolderOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import downloadBanner from "../assets/volleyball.jpeg";

export function Downloads() {
  const { t } = useLanguage();

  const documents = [
    {
      title: "Research Application Form",
      description: "Application form for student research projects.",
      file: "/documents/research-application.pdf",
    },
    {
      title: "Student Admission Form",
      description: "Official admission application form.",
      file: "/documents/admission-form.pdf",
    },
    {
      title: "Sports Registration Form",
      description: "Registration form for school sports activities.",
      file: "/documents/sports-registration.pdf",
    },
    {
      title: "Scholarship Application",
      description: "Scholarship application document.",
      file: "/documents/scholarship.pdf",
    },
  ];

  return (
    <div className="downloads-page">

      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-background">
          <ImageWithFallback
            src={downloadBanner}
            alt="Downloads"
            className="about-hero-image"
          />
        </div>

        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
               Downloads
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-history-section">
        <div className="about-section-wrapper">
          <div className="about-history-wrapper">
            <div className="about-history-heading">
              <div className="about-history-icon">
                <FolderOpen className="about-history-icon-symbol" />
              </div>

              <h2 className="about-history-title">
                Downloadable Resources
              </h2>
            </div>

            <p className="about-history-text">
                Access essential forms and documents for students, parents, and staff. Download the necessary files for admissions, research, sports registration, and scholarship applications.
            </p>
          </div>
        </div>
      </section>

      {/* Download Cards */}
      <section className="about-mission-vision">
        <div className="about-section-wrapper">

          <div className="about-card-grid">

            {documents.map((doc, index) => (
              <div className="about-card" key={index}>

                <div className="about-card-icon">
                  <FileText className="about-card-icon-symbol" />
                </div>

                <h3 className="about-card-heading">
                  {doc.title}
                </h3>

                <p className="about-card-text">
                  {doc.description}
                </p>

                <a
                  href={doc.file}
                  download
                  className="download-btn"
                >
                  <Download size={18} />
                  Download PDF
                </a>

              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}