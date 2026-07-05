import { useEffect, useState } from "react";
import { FileText, Download, FolderOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { getDocuments } from "../api/documentApi";
import downloadBanner from "../assets/volleyball.jpeg";

export function Downloads() {
  const { t } = useLanguage();

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const data = await getDocuments();

    // Optional: newest first
    const sorted = (data || []).sort((a, b) => b.id - a.id);

    setDocuments(sorted);
  };

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
              Access essential forms and documents for students, parents,
              and staff. Download the necessary files.
            </p>
          </div>
        </div>
      </section>

      {/* Download Cards */}
      <section className="about-mission-vision">
        <div className="about-section-wrapper">

          {documents.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px",
                fontSize: "18px",
                fontWeight: "500"
              }}
            >
              No documents available.
            </div>
          ) : (
            <div className="about-card-grid">

              {documents.map((doc) => (
                <div className="about-card" key={doc.id}>

                  <div className="about-card-icon">
                    <FileText className="about-card-icon-symbol" />
                  </div>

                  <h3 className="about-card-heading">
                    {doc.topic}
                  </h3>

                    
                  <a
                    href={`http://localhost:8080/api/documents/download/${doc.id}`}
                    className="download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     <Download size={15} style={{ marginRight: "5px" }} />
                     Download PDF
                  </a>
                  

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}