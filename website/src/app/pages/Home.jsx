import { motion } from "motion/react";
import { Calendar, MapPin, BookOpen, Trophy, Laptop } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
function Home() {
  return <div>
      {
    /* Welcome Section with Background Image */
  }
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <ImageWithFallback
    src="https://images.unsplash.com/photo-1664553692783-888fda781031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    alt="School Building"
    className="w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-[#1a2b5c]/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h2
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="text-white text-5xl md:text-6xl mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
  >
            Welcome to Excellence
          </motion.h2>
        </div>
      </section>

      {
    /* An Experience That Lasts a Lifetime */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-[#1a2b5c] mb-8"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700 }}
  >
            An Experience That Lasts a Lifetime
          </motion.h1>

          <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-[#4a5568] text-lg md:text-xl leading-relaxed space-y-4 mb-8"
  >
            <p>
              Since 1956, Rajashinghe Central College has been devoted to producing gentlemen capable of spearheading change and advancement. Its multicultural environment fosters the free exchange of ideas and the celebration of diverse identities.
            </p>
            <p>
              Possessing a rich history of tradition but never limited by it, the College has always maintained adaptation as the key to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {
    /* Latest News & Updates */
  }
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
            <h2
    className="text-[#1a2b5c] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}
  >
              Latest News & Updates
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
    {
      date: "April 15, 2026",
      title: "Outstanding A-Level Results 2026",
      excerpt: "Our students achieved remarkable success with 95% pass rate and 40 students gaining university entrance.",
      image: "https://images.unsplash.com/photo-1573894997713-de07a124df43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      date: "April 10, 2026",
      title: "Annual Science Exhibition Success",
      excerpt: "Our science fair showcased innovative projects from grades 6-13, with 5 projects winning national recognition.",
      image: "https://images.unsplash.com/photo-1752920299211-28be8c9b0121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      date: "April 5, 2026",
      title: "Cricket Team Championship Victory",
      excerpt: "Our cricket team won the inter-school championship for the third consecutive year with outstanding performance.",
      image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      date: "March 28, 2026",
      title: "New Computer Lab Inauguration",
      excerpt: "State-of-the-art computer laboratory with 50 workstations opened, enhancing digital learning capabilities.",
      image: "https://images.unsplash.com/photo-1573894998033-c0cef4ed722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      date: "March 20, 2026",
      title: "Student Art Exhibition Success",
      excerpt: "Annual art exhibition featured stunning works from our talented students across various mediums.",
      image: "https://images.unsplash.com/photo-1752920299180-e8fd9276c202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      date: "March 15, 2026",
      title: "Swimming Team National Championship",
      excerpt: "Our swimmers brought home 8 medals including 3 golds from the National Schools Championship.",
      image: "https://images.unsplash.com/photo-1573894999291-f440466112cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ].map((news, i) => <motion.article
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="bg-white shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-gray-100"
  >
                <div className="relative overflow-hidden h-56">
                  <ImageWithFallback
    src={news.image}
    alt={news.title}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  />
                  <div className="absolute top-4 left-4 bg-[#FFD700] text-[#1a2b5c] px-4 py-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {news.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3
    className="text-[#1a2b5c] mb-3 group-hover:text-[#FFD700] transition-colors"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.35rem", fontWeight: 600 }}
  >
                    {news.title}
                  </h3>
                  <p className="text-[#4a5568] leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>
              </motion.article>)}
          </div>

          <div className="text-center">
            <Link to="/news">
              <button className="px-8 py-3 bg-[#1a2b5c] text-white hover:bg-[#FFD700] hover:text-[#1a2b5c] transition-all duration-300">
                View All News
              </button>
            </Link>
          </div>
        </div>
      </section>

      {
    /* Upcoming Events */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
            <h2
    className="text-[#1a2b5c] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}
  >
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
    {
      date: "May 15, 2026",
      time: "9:00 AM",
      title: "Annual Prize Giving Ceremony",
      location: "School Main Hall",
      description: "Celebrating academic excellence and student achievements with awards and recognition."
    },
    {
      date: "May 20, 2026",
      time: "2:00 PM",
      title: "Inter-House Sports Meet",
      location: "School Grounds",
      description: "Annual sports competition featuring athletics, relay races, and field events."
    },
    {
      date: "May 25, 2026",
      time: "10:00 AM",
      title: "Parent-Teacher Meeting",
      location: "Classrooms",
      description: "Quarterly academic progress review and discussion session for all grades."
    },
    {
      date: "June 1, 2026",
      time: "3:00 PM",
      title: "Drama Society Performance",
      location: "School Auditorium",
      description: "Original theatrical production by our talented drama society students."
    },
    {
      date: "June 8, 2026",
      time: "8:00 AM",
      title: "Science Fair 2026",
      location: "Science Complex",
      description: "Student innovation showcase with projects in physics, chemistry, and biology."
    },
    {
      date: "June 15, 2026",
      time: "6:00 PM",
      title: "Music Concert Evening",
      location: "Main Hall",
      description: "Classical and contemporary musical performances by school orchestra and choir."
    },
    {
      date: "June 22, 2026",
      time: "9:00 AM",
      title: "O-Level Mock Examinations Begin",
      location: "Examination Halls",
      description: "Mock exams for Grade 10 and 11 students to prepare for final O-Level examinations."
    },
    {
      date: "June 28, 2026",
      time: "2:00 PM",
      title: "Alumni Association Meeting",
      location: "Conference Room",
      description: "Quarterly gathering of alumni to discuss fundraising and school development projects."
    },
    {
      date: "July 5, 2026",
      time: "10:00 AM",
      title: "Career Guidance Workshop",
      location: "Main Hall",
      description: "Professional counseling session for A-Level students on university selection and careers."
    }
  ].map((event, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="bg-white p-6 shadow-lg border-l-4 border-[#FFD700] hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-[#FFD700] mb-2" style={{ fontWeight: 600 }}>
                      {event.date} • {event.time}
                    </div>
                    <h3
    className="text-[#1a2b5c] mb-2"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.35rem", fontWeight: 600 }}
  >
                      {event.title}
                    </h3>
                  </div>
                  <Calendar className="w-8 h-8 text-[#1a2b5c] flex-shrink-0 ml-3" />
                </div>
                <div className="flex items-center gap-2 mb-3 text-[#4a5568]">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <p className="text-[#4a5568] leading-relaxed">
                  {event.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Modern Cards Section - Academic, Sport, LMS */
  }
      <section className="py-24 px-6 bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
    backgroundSize: "50px 50px"
  }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-16">
            {[
    {
      title: "Academics",
      description: "Discover our flexible curriculum designed to inspire creativity and foster academic excellence with qualified instructors providing personalized guidance.",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1573894998033-c0cef4ed722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/academic"
    },
    {
      title: "Sport",
      description: "Our Royal College embraces a historic and well-rounded athletic program where students compete in numerous sports, building character and teamwork.",
      icon: Trophy,
      image: "https://images.unsplash.com/photo-1774504798059-0e7022b63b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/sport"
    },
    {
      title: "Learning Online",
      description: "The internet has revolutionized education, now you can gain access to quality educational materials from anywhere. We combine both virtual and in-person activities.",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1752920299211-28be8c9b0121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/academic"
    }
  ].map((card, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: i * 0.2 }}
    className="relative"
  >
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <motion.div
    whileHover={{ rotate: -3, scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="relative transform rotate-2 shadow-2xl overflow-hidden"
    style={{ width: "280px", height: "320px" }}
  >
                      <ImageWithFallback
    src={card.image}
    alt={card.title}
    className="w-full h-full object-cover"
  />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b5c]/80 to-transparent" />
                    </motion.div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[30px] border-t-[#FFD700]" />
                  </div>
                </div>

                <div className="text-center">
                  <h3
    className="text-white mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 600 }}
  >
                    {card.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-6 px-4">
                    {card.description}
                  </p>
                  <Link to={card.link}>
                    <button className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-[#1a2b5c] transition-all duration-300">
                      Learn More
                    </button>
                  </Link>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
}
export {
  Home as default
};
