import { Calendar, User } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function News() {
  const { t } = useLanguage();
  const allNews = [
    {
      id: 1,
      titleKey: "news.item1.title",
      date: "April 28, 2026",
      author: "Admin",
      excerptKey: "news.item1.excerpt",
      content:
        "The annual science exhibition held on April 28th was a grand success with over 50 innovative projects displayed by our talented students.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
      category: "Events",
    },
    {
      id: 2,
      titleKey: "news.item2.title",
      date: "April 20, 2026",
      author: "Sports Department",
      excerptKey: "news.item2.excerpt",
      content:
        "RRCC athletes dominated the district sports championship, securing 15 gold medals, 12 silver medals, and 8 bronze medals across various categories.",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      category: "Sports",
    },
    {
      id: 3,
      titleKey: "news.item3.title",
      date: "April 15, 2026",
      author: "Admin",
      excerptKey: "news.item3.excerpt",
      content:
        "Our new computer lab featuring 50 modern workstations, high-speed internet, and latest software was officially opened by the Education Minister.",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop",
      category: "Infrastructure",
    },
    {
      id: 4,
      titleKey: "news.item4.title",
      date: "April 10, 2026",
      author: "Arts Department",
      excerptKey: "news.item4.excerpt",
      content:
        "The school drama team's stellar performance of a classical Sinhala drama earned them the first place at the provincial drama competition.",
      image:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
      category: "Arts",
    },
    {
      id: 5,
      title: "Outstanding O/L Results 2025",
      date: "April 5, 2026",
      author: "Academic Department",
      excerpt: "Record-breaking O/L results with 96% pass rate achieved.",
      content:
        "Our students have achieved exceptional results in the 2025 O/L examination with a 96% pass rate. 45 students secured 9As.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      category: "Academic",
    },
    {
      id: 6,
      title: "Environmental Conservation Project",
      date: "March 28, 2026",
      author: "Green Club",
      excerpt: "Students plant 500 trees as part of environmental initiative.",
      content:
        "In collaboration with the Forest Department, our Green Club organized a massive tree planting campaign.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
      category: "Community",
    },
  ];

  return (
    <div className="news-page">
      {/* Hero Banner */}
      <section className="news-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop"
          alt="Latest News"
          className="news-hero__image"
        />

        <div className="news-hero__overlay">
          <h1 className="news-hero__title">{t("news.latest")}</h1>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-section">
        <div className="news-container">
          <div className="news-grid">
            {allNews.map((news, index) => (
              <article
                key={news.id}
                className="news-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="news-card__image-wrapper">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="news-card__image"
                  />

                  <div className="news-card__image-overlay"></div>

                  <div className="news-card__meta-row">
                    <span className="news-card__category">{news.category}</span>
                    <div className="news-card__date">
                      <Calendar className="news-card__icon" />
                      <span>{news.date.split(",")[0]}</span>
                    </div>
                  </div>

                  <div className="news-card__author-row">
                    <User className="news-card__icon" />
                    <span className="news-card__author">{news.author}</span>
                  </div>
                </div>

                <div className="news-card__content">
                  <h3 className="news-card__title">
                    {news.titleKey ? t(news.titleKey) : news.title}
                  </h3>
                  <p className="news-card__excerpt line-clamp-2">
                    {news.excerptKey ? t(news.excerptKey) : news.excerpt}
                  </p>
                  <div className="news-card__divider"></div>
                  <p className="news-card__body line-clamp-3">
                    {news.content}
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
