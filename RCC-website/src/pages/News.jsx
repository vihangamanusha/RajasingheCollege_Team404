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
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop"
          alt="Latest News"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            {t("news.latest")}
          </h1>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-gradient-to-b from-[#F5F5F5] to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allNews.map((news, index) => (
              <article
                key={news.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/20 to-transparent opacity-70"></div>

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-4 py-2 bg-[#FFD700] text-[#002147] rounded-full text-sm font-bold shadow-lg">
                      {news.category}
                    </span>
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <Calendar className="w-4 h-4 inline text-[#002147] mr-2" />
                      <span className="text-sm font-semibold text-[#002147]">
                        {news.date.split(",")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                      <User className="w-4 h-4 text-white" />
                      <span className="text-sm text-white font-medium">
                        {news.author}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl text-[#002147] mb-4 group-hover:text-[#FFD700] transition-colors duration-300 font-semibold leading-tight">
                    {news.titleKey ? t(news.titleKey) : news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    {news.excerptKey ? t(news.excerptKey) : news.excerpt}
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
                  <p className="text-gray-700 leading-relaxed text-sm line-clamp-3">
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
