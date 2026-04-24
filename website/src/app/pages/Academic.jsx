import { motion } from "motion/react";
import { BookOpen, Microscope, Calculator, Palette, BarChart, Cpu, Users, Award } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
function Academic() {
  return <div className="pt-20">
      {
    /* Hero Section with Image */
  }
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
    src="https://images.unsplash.com/photo-1573894998033-c0cef4ed722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    alt="Students in classroom"
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
            Academic Excellence
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-white/90 text-xl md:text-2xl"
  >
            Empowering minds, shaping futures
          </motion.p>
        </div>
      </section>

      {
    /* About Education */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
              <div className="relative overflow-hidden shadow-2xl">
                <ImageWithFallback
    src="https://images.unsplash.com/photo-1752920299211-28be8c9b0121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    alt="Students learning"
    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
  />
              </div>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="space-y-6"
  >
              <h2
    className="text-[#1a2b5c] mb-6"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
  >
                Quality Education for Every Student
              </h2>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                At Rajasinghe Central College, we believe in providing a comprehensive education that goes beyond textbooks. Our academic programs are designed to challenge students intellectually while nurturing their individual talents and interests.
              </p>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                With experienced faculty, modern facilities, and innovative teaching methods, we prepare our students for success in higher education and beyond. Our curriculum combines traditional academic rigor with practical skills development.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
    { icon: BookOpen, label: "Comprehensive Curriculum" },
    { icon: Users, label: "Qualified Teachers" },
    { icon: Award, label: "Academic Excellence" },
    { icon: Cpu, label: "Modern Technology" }
  ].map((item, i) => <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-[#1a2b5c]" />
                    </div>
                    <span className="text-[#4a5568]">{item.label}</span>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Grades 6-11 Section */
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
              Secondary Education (Grades 6-11)
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
    {
      grade: "Grades 6-7",
      title: "Foundation Years",
      subjects: ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "ICT", "Religion"],
      description: "Building strong foundational knowledge across core subjects"
    },
    {
      grade: "Grades 8-9",
      title: "Development Years",
      subjects: ["Mathematics", "Science", "Languages", "Social Studies", "Commerce", "ICT", "Arts & Crafts"],
      description: "Expanding knowledge and introducing specialized subjects"
    },
    {
      grade: "Grades 10-11",
      title: "O-Level Preparation",
      subjects: ["Mathematics", "Science", "English", "Sinhala", "History", "Geography", "Commerce", "ICT", "Buddhism"],
      description: "Intensive preparation for O-Level examinations"
    }
  ].map((section, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#FFD700]"
  >
                <div className="text-[#FFD700] mb-3" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 600 }}>
                  {section.grade}
                </div>
                <h3
    className="text-[#1a2b5c] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.75rem", fontWeight: 600 }}
  >
                  {section.title}
                </h3>
                <p className="text-[#4a5568] mb-6 leading-relaxed">
                  {section.description}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-[#1a2b5c] mb-3" style={{ fontWeight: 600 }}>Key Subjects:</h4>
                  <ul className="space-y-2">
                    {section.subjects.map((subject, idx) => <li key={idx} className="text-[#4a5568] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                        {subject}
                      </li>)}
                  </ul>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* A/L Streams Section */
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
              Advanced Level Streams (Grades 12-13)
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6" />
            <p className="text-white/90 text-xl max-w-3xl mx-auto">
              Choose your path to success with our comprehensive A/L programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
    {
      icon: Cpu,
      title: "Technology Stream",
      subjects: ["Engineering Technology", "Science for Technology", "ICT"],
      color: "from-blue-500 to-blue-600",
      description: "Perfect for aspiring engineers and technology professionals"
    },
    {
      icon: Microscope,
      title: "Bio-Science Stream",
      subjects: ["Biology", "Chemistry", "Physics"],
      color: "from-green-500 to-green-600",
      description: "Ideal for medical, dental, and biological science careers"
    },
    {
      icon: Calculator,
      title: "Physical Science Stream",
      subjects: ["Combined Mathematics", "Physics", "Chemistry"],
      color: "from-purple-500 to-purple-600",
      description: "Foundation for engineering and physical sciences"
    },
    {
      icon: BarChart,
      title: "Commerce Stream",
      subjects: ["Business Studies", "Accounting", "Economics"],
      color: "from-yellow-500 to-yellow-600",
      description: "Pathway to business and management careers"
    },
    {
      icon: Palette,
      title: "Arts Stream",
      subjects: ["Literature", "History", "Geography", "Logic", "Political Science"],
      color: "from-pink-500 to-pink-600",
      description: "Explore humanities and social sciences"
    },
    {
      icon: Calculator,
      title: "Mathematics Stream",
      subjects: ["Pure Mathematics", "Applied Mathematics", "Statistics"],
      color: "from-indigo-500 to-indigo-600",
      description: "Advanced mathematics for specialized fields"
    }
  ].map((stream, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="bg-white/10 backdrop-blur-sm p-8 border-2 border-white/20 hover:border-[#FFD700] transition-all duration-300 group hover:scale-105"
  >
                <div className={`w-16 h-16 bg-gradient-to-br ${stream.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stream.icon className="w-8 h-8 text-white" />
                </div>
                <h3
    className="text-white mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.75rem", fontWeight: 600 }}
  >
                  {stream.title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {stream.description}
                </p>
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-[#FFD700] mb-3" style={{ fontWeight: 600 }}>Core Subjects:</h4>
                  <ul className="space-y-2">
                    {stream.subjects.map((subject, idx) => <li key={idx} className="text-white/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                        {subject}
                      </li>)}
                  </ul>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Academic Achievements */
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
              Academic Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
    { number: "95%", label: "O-Level Pass Rate", color: "bg-blue-500" },
    { number: "88%", label: "A-Level Pass Rate", color: "bg-green-500" },
    { number: "40+", label: "University Entries 2026", color: "bg-purple-500" },
    { number: "15+", label: "District Rank Holders", color: "bg-yellow-500" }
  ].map((achievement, i) => <motion.div
    key={i}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="text-center"
  >
                <div className={`${achievement.color} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <div className="text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700 }}>
                    {achievement.number}
                  </div>
                </div>
                <h3 className="text-[#1a2b5c] text-xl" style={{ fontWeight: 600 }}>
                  {achievement.label}
                </h3>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
}
export {
  Academic as default
};
