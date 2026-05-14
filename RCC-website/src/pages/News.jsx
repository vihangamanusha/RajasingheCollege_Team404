import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import newsImage from "../assets/news.jpeg";

export function News() {
  const { t } = useLanguage();

  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/news");

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();

      // Sort latest first
      const sorted = (data || []).sort((a, b) => b.id - a.id);

      setAllNews(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-page">

      {/* HERO */}
      <section className="news-hero">
        <ImageWithFallback
          src={newsImage}
          alt="Latest News"
          className="news-hero__image"
        />

        <div className="news-hero__overlay">
          <h1 className="news-hero__title">
            {t("news.latest")}
          </h1>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="news-section">
        <div className="news-container">

          {/* LOADING */}
          {loading && (
            <div className="empty-state">
              Loading news...
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="empty-state">
              {error}
            </div>
          )}

          {/* GRID */}
          {!loading && !error && (
            <div className="news-grid">

              {allNews.length === 0 ? (
                <div className="empty-state">
                  No news articles found.
                </div>
              ) : (
                allNews.map((news, index) => (
                  <article
                    key={news.id}
                    className="news-card"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >

                    {/* IMAGE */}
                    <div className="news-card__image-wrapper">

                      <ImageWithFallback
                         src={
                           news.image
                           ? news.image.startsWith("http")
                           ? news.image
                           : `http://localhost:8080/${news.image.replace(/^\/+/, "")}`
                           : "https://via.placeholder.com/800x600?text=No+Image"
                         }
                            alt={news.title}
                             className="news-card__image"
                       />
 
                      <div className="news-card__image-overlay"></div>

                      {/* DATE */}
                      <div className="news-card__meta-row">
                        <div className="news-card__date">
                          <Calendar className="news-card__icon" />

                          <span>
                            {news.date
                              ? news.date.split("T")[0]
                              : "No Date"}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="news-card__content">

                      <h3 className="news-card__title">
                        {news.title}
                      </h3>

                      <p className="news-card__excerpt">
                        {news.content?.substring(0, 120)}...
                      </p>

                      <div className="news-card__divider"></div>

                      <p className="news-card__body">
                        {news.content}
                      </p>

                    </div>
                  </article>
                ))
              )}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}