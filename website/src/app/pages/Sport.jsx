import { motion } from "motion/react";
import { Trophy, Award, Medal, Target } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
function Sport() {
  return <div className="pt-20">
      {
    /* Hero Section with Image */
  }
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
    src="https://images.unsplash.com/photo-1774504798059-0e7022b63b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    alt="Students playing sports"
    className="w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-[#1a2b5c]/75" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-white text-5xl md:text-6xl mb-6"
    style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
  >
            Sports Excellence
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-white/90 text-xl md:text-2xl"
  >
            Building champions through dedication and teamwork
          </motion.p>
        </div>
      </section>

      {
    /* About Sports */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="space-y-6"
  >
              <h2
    className="text-[#1a2b5c] mb-6"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
  >
                A Legacy of Athletic Excellence
              </h2>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                At Rajasinghe Central College, sports and athletics are integral to our educational philosophy. We believe that physical education builds character, discipline, teamwork, and leadership skills that last a lifetime.
              </p>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                Our comprehensive sports program offers state-of-the-art facilities, professional coaching, and opportunities to compete at district, provincial, and national levels. From traditional sports like cricket and rugby to modern athletic disciplines, we nurture talent and celebrate achievement.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
    { icon: Trophy, label: "Championship Wins", value: "45+" },
    { icon: Medal, label: "National Medals", value: "120+" },
    { icon: Award, label: "Sports Offered", value: "15+" },
    { icon: Target, label: "Athletes", value: "800+" }
  ].map((stat, i) => <div key={i} className="bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a] p-6 text-center text-white">
                    <stat.icon className="w-8 h-8 text-[#FFD700] mx-auto mb-3" />
                    <div className="text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                      {stat.value}
                    </div>
                    <div className="text-sm">{stat.label}</div>
                  </div>)}
              </div>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
              <div className="relative overflow-hidden shadow-2xl">
                <ImageWithFallback
    src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    alt="Students playing sports"
    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
  />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Sports Achievements Cards */
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
              Recent Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
    {
      year: "2026",
      title: "Inter-School Cricket Championship",
      achievement: "Champions - 3rd Consecutive Year",
      description: "Dominated the tournament with exceptional batting and bowling performances",
      icon: "\u{1F3CF}",
      color: "from-green-500 to-green-600"
    },
    {
      year: "2026",
      title: "National Swimming Championship",
      achievement: "8 Medals (3 Gold, 3 Silver, 2 Bronze)",
      description: "Outstanding performance by our swimming team at national level",
      icon: "\u{1F3CA}",
      color: "from-blue-500 to-blue-600"
    },
    {
      year: "2025",
      title: "Provincial Athletics Meet",
      achievement: "Overall Champions",
      description: "Swept track and field events with record-breaking performances",
      icon: "\u{1F3C3}",
      color: "from-orange-500 to-orange-600"
    },
    {
      year: "2025",
      title: "Basketball Inter-School Tournament",
      achievement: "Runners-up",
      description: "Thrilling matches showcasing excellent teamwork and skill",
      icon: "\u{1F3C0}",
      color: "from-purple-500 to-purple-600"
    },
    {
      year: "2025",
      title: "District Volleyball Championship",
      achievement: "Champions - Boys & Girls Categories",
      description: "Both teams displayed exceptional coordination and determination",
      icon: "\u{1F3D0}",
      color: "from-red-500 to-red-600"
    },
    {
      year: "2024",
      title: "Rugby Sevens Tournament",
      achievement: "Semi-finalists",
      description: "Strong performance against top schools in the region",
      icon: "\u{1F3C9}",
      color: "from-yellow-500 to-yellow-600"
    }
  ].map((achievement, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-[#FFD700] group hover:scale-105"
  >
                <div className={`w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-6 text-5xl group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>
                <div className="text-[#FFD700] mb-2 text-center" style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                  {achievement.year}
                </div>
                <h3
    className="text-[#1a2b5c] mb-3 text-center"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 600 }}
  >
                  {achievement.title}
                </h3>
                <div className="text-center mb-4 text-[#1a2b5c] font-semibold">
                  {achievement.achievement}
                </div>
                <p className="text-[#4a5568] leading-relaxed text-center">
                  {achievement.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Famous Sports Cards */
  }
      <section className="py-24 px-6 bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
            <h2
    className="text-white mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}
  >
              Our Premier Sports
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6" />
            <p className="text-white/90 text-xl max-w-3xl mx-auto">
              Discover our flagship sports programs with world-class facilities and coaching
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
    {
      sport: "Cricket",
      icon: "\u{1F3CF}",
      description: "Our cricket program is the pride of the school with three consecutive inter-school championships. We have produced numerous district and provincial level players.",
      facilities: ["Full-size cricket ground", "Indoor practice nets", "Professional coaching", "Modern equipment"],
      achievements: "3x Inter-School Champions",
      image: "https://images.unsplash.com/photo-1573894997713-de07a124df43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      sport: "Rugby",
      icon: "\u{1F3C9}",
      description: "Our rugby team embodies strength, strategy, and sportsmanship. With rigorous training and passionate players, we compete at the highest levels.",
      facilities: ["Regulation rugby field", "Fitness center", "Qualified coaches", "Team facilities"],
      achievements: "Provincial Semi-finalists",
      image: "https://images.unsplash.com/photo-1774504798059-0e7022b63b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      sport: "Volleyball",
      icon: "\u{1F3D0}",
      description: "Both boys and girls volleyball teams excel at district level. Our program emphasizes teamwork, agility, and competitive spirit.",
      facilities: ["Indoor volleyball courts", "Training equipment", "Expert coaching staff", "Competition venues"],
      achievements: "District Champions (Boys & Girls)",
      image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ].map((sport, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: i * 0.2 }}
    className="bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden group hover:border-[#FFD700] transition-all duration-300"
  >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
    src={sport.image}
    alt={sport.sport}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b5c] to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <div className="text-7xl mb-2">{sport.icon}</div>
                    <h3
    className="text-white"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", fontWeight: 700 }}
  >
                      {sport.sport}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="bg-[#FFD700] text-[#1a2b5c] px-4 py-2 inline-block mb-6" style={{ fontWeight: 600 }}>
                    {sport.achievements}
                  </div>
                  <p className="text-white/90 leading-relaxed mb-6">
                    {sport.description}
                  </p>
                  <div className="border-t border-white/20 pt-6">
                    <h4 className="text-[#FFD700] mb-4" style={{ fontWeight: 600 }}>Facilities & Features:</h4>
                    <ul className="space-y-2">
                      {sport.facilities.map((facility, idx) => <li key={idx} className="text-white/90 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                          {facility}
                        </li>)}
                    </ul>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
}
export {
  Sport as default
};
