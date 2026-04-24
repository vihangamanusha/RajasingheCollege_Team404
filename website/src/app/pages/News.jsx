import { motion } from "motion/react";
import { Calendar, Tag } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
function News() {
  const newsArticles = [
    {
      date: "April 23, 2026",
      category: "Announcement",
      title: "New Online Learning Portal Launched",
      excerpt: "School introduces comprehensive digital learning platform with video lessons, assignments, and interactive quizzes for all grades.",
      image: "https://images.unsplash.com/photo-1752920299211-28be8c9b0121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Students can now access study materials, submit assignments online, and attend virtual classes through the new platform."
    },
    {
      date: "April 20, 2026",
      category: "Sports",
      title: "Basketball Team Advances to Provincials",
      excerpt: "Our basketball team secured their spot in the provincial championship after winning the district finals.",
      image: "https://images.unsplash.com/photo-1774504798059-0e7022b63b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "The team displayed outstanding teamwork and determination throughout the tournament."
    },
    {
      date: "April 18, 2026",
      category: "Academic",
      title: "Mathematics Olympiad Winners Announced",
      excerpt: "Five students won medals at the National Mathematics Olympiad, bringing pride to the school.",
      image: "https://images.unsplash.com/photo-1573894998033-c0cef4ed722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Students competed against top performers from schools nationwide and excelled in advanced mathematics challenges."
    },
    {
      date: "April 15, 2026",
      category: "Academic",
      title: "Outstanding A-Level Results 2026",
      excerpt: "Our students achieved remarkable success with 95% pass rate and 40 students gaining university entrance. This marks our best performance in the past decade.",
      image: "https://images.unsplash.com/photo-1573894997713-de07a124df43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "The college celebrates exceptional A-Level results with students excelling across all streams including Bio-Science, Physical Science, Commerce, and Arts."
    },
    {
      date: "April 12, 2026",
      category: "Infrastructure",
      title: "Library Renovation Project Completed",
      excerpt: "Modern library with digital resources, reading spaces, and study rooms opened for students.",
      image: "https://images.unsplash.com/photo-1752920299180-e8fd9276c202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "The renovated facility includes 10,000+ books, digital archives, and comfortable study areas for students."
    },
    {
      date: "April 10, 2026",
      category: "Events",
      title: "Annual Science Exhibition Success",
      excerpt: "Our science fair showcased innovative projects from grades 6-13, with 5 projects winning national recognition and awards.",
      image: "https://images.unsplash.com/photo-1752920299211-28be8c9b0121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Students presented groundbreaking projects in physics, chemistry, biology, and technology, demonstrating exceptional scientific thinking and innovation."
    },
    {
      date: "April 5, 2026",
      category: "Sports",
      title: "Cricket Team Championship Victory",
      excerpt: "Our cricket team won the inter-school championship for the third consecutive year with outstanding performance in the finals.",
      image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "The team displayed exceptional skill and sportsmanship throughout the tournament, defeating rivals in a thrilling final match."
    },
    {
      date: "April 2, 2026",
      category: "Cultural",
      title: "Annual Drama Festival Grand Success",
      excerpt: "School drama production received standing ovation with performances spanning traditional and contemporary theatre.",
      image: "https://images.unsplash.com/photo-1573894999291-f440466112cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Students performed original plays and classic dramas to a packed auditorium of parents and guests."
    },
    {
      date: "March 28, 2026",
      category: "Infrastructure",
      title: "New Computer Lab Inauguration",
      excerpt: "State-of-the-art computer laboratory with 50 workstations opened, enhancing digital learning capabilities for all students.",
      image: "https://images.unsplash.com/photo-1573894998033-c0cef4ed722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "The new facility features latest computers, high-speed internet, and specialized software for programming and design courses."
    },
    {
      date: "March 25, 2026",
      category: "Announcement",
      title: "Scholarship Program for Talented Students",
      excerpt: "New merit-based scholarship program announced to support academically gifted students from underprivileged backgrounds.",
      image: "https://images.unsplash.com/photo-1678152392895-8561c47bd363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      content: "The program will cover tuition fees, books, and uniforms for 50 deserving students starting next academic year."
    },
    {
      date: "March 20, 2026",
      category: "Cultural",
      title: "Student Art Exhibition Attracts Crowds",
      excerpt: "Annual art exhibition featured stunning works from our talented students across various mediums including painting, sculpture, and digital art.",
      image: "https://images.unsplash.com/photo-1752920299180-e8fd9276c202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Over 200 artworks were displayed, showcasing the diverse creative talents of our students from all grade levels."
    },
    {
      date: "March 15, 2026",
      category: "Sports",
      title: "Swimming Team National Championship Success",
      excerpt: "Our swimmers brought home 8 medals including 3 golds from the National Schools Championship, establishing new school records.",
      image: "https://images.unsplash.com/photo-1573894999291-f440466112cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Athletes excelled in freestyle, backstroke, and relay events, demonstrating the quality of our swimming program."
    },
    {
      date: "March 8, 2026",
      category: "Academic",
      title: "Debate Team Wins Provincial Championship",
      excerpt: "Our debate team secured first place at the Provincial Inter-School Debate Championship with compelling arguments and excellent presentation.",
      image: "https://images.unsplash.com/photo-1678152392895-8561c47bd363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Students demonstrated critical thinking and public speaking skills, defeating teams from 15 other schools."
    },
    {
      date: "February 28, 2026",
      category: "Events",
      title: "Environmental Awareness Week Concluded",
      excerpt: "Students participated in tree planting, recycling drives, and educational sessions during week-long environmental awareness campaign.",
      image: "https://images.unsplash.com/photo-1651103435299-f20251469c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Over 500 trees were planted, and students learned about climate change, conservation, and sustainable practices."
    },
    {
      date: "February 20, 2026",
      category: "Alumni",
      title: "Distinguished Alumni Visit Inspires Students",
      excerpt: "Former students now successful professionals returned to share their experiences and inspire current students.",
      image: "https://images.unsplash.com/photo-1672073233308-f58af32a0761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Alumni working in medicine, engineering, law, and business shared career insights and motivational stories."
    }
  ];
  const categories = ["All", "Academic", "Sports", "Events", "Cultural", "Infrastructure", "Alumni", "Announcement"];
  return <div className="pt-20">
      {
    /* Hero Section */
  }
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a]">
          <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
    backgroundSize: "40px 40px"
  }} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-white text-5xl md:text-6xl"
    style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
  >
            Latest News & Updates
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-white/90 text-xl mt-4"
  >
            Stay informed about school events, achievements, and announcements
          </motion.p>
        </div>
      </section>

      {
    /* Category Filter */
  }
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, i) => <motion.button
    key={i}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
    className={`px-6 py-2 border-2 ${i === 0 ? "bg-[#1a2b5c] text-white border-[#1a2b5c]" : "bg-white text-[#1a2b5c] border-[#1a2b5c] hover:bg-[#1a2b5c] hover:text-white"} transition-all duration-300`}
  >
                {category}
              </motion.button>)}
          </div>
        </div>
      </section>

      {
    /* News Grid */
  }
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, i) => <motion.article
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i % 6 * 0.1 }}
    className="bg-white shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500"
  >
                <div className="relative overflow-hidden h-64">
                  <ImageWithFallback
    src={article.image}
    alt={article.title}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  />
                  <div className="absolute top-4 left-4 bg-[#FFD700] text-[#1a2b5c] px-4 py-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#1a2b5c] text-white px-4 py-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3
    className="text-[#1a2b5c] mb-3 group-hover:text-[#FFD700] transition-colors"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 600 }}
  >
                    {article.title}
                  </h3>
                  <p className="text-[#4a5568] leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <p className="text-[#4a5568] leading-relaxed text-sm">
                    {article.content}
                  </p>
                </div>
              </motion.article>)}
          </div>
        </div>
      </section>
    </div>;
}
export {
  News as default
};
