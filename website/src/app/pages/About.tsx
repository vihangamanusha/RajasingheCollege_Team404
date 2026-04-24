import { motion } from 'motion/react';
import { Target, Eye, Heart, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664553692783-888fda781031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="School Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a2b5c]/75"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-6xl"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden shadow-2xl group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1678152392895-8561c47bd363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="School Building"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b5c]/60 to-transparent"></div>
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
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
              >
                A Legacy of Excellence
              </h2>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                Founded in 1956, Rajasinghe Central College Ruwanwella has been a cornerstone of educational excellence
                in the region for over seven decades. Our institution stands as a testament to the power of dedicated
                teaching, comprehensive curriculum, and unwavering commitment to student success.
              </p>
              <p className="text-[#2d3748] text-lg leading-relaxed">
                We pride ourselves on cultivating well-rounded individuals who excel not only academically but also in
                sports, arts, and community service. Our graduates go on to become leaders, innovators, and compassionate
                citizens who make meaningful contributions to society.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { icon: Users, number: '2,500+', label: 'Students' },
                  { icon: Heart, number: '150+', label: 'Teachers' },
                  { icon: Target, number: '70+', label: 'Years' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-10 h-10 text-[#FFD700] mx-auto mb-3" />
                    <div
                      className="text-[#1a2b5c] mb-1"
                      style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700 }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-[#4a5568]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
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
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700 }}
            >
              Vision & Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 shadow-lg border-t-4 border-[#FFD700]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#1a2b5c] rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3
                  className="text-[#1a2b5c]"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 600 }}
                >
                  Our Vision
                </h3>
              </div>
              <p className="text-[#4a5568] text-lg leading-relaxed">
                To be a leading educational institution that nurtures globally competent, ethical, and innovative individuals who contribute positively to society while preserving our rich cultural heritage and values.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 shadow-lg border-t-4 border-[#1a2b5c]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-[#1a2b5c]" />
                </div>
                <h3
                  className="text-[#1a2b5c]"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 600 }}
                >
                  Our Mission
                </h3>
              </div>
              <ul className="text-[#4a5568] text-lg leading-relaxed space-y-3">
                <li>• Provide quality education through innovative teaching methodologies</li>
                <li>• Foster critical thinking and creativity in every student</li>
                <li>• Promote holistic development through sports and extracurricular activities</li>
                <li>• Cultivate moral values and social responsibility</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal's Speech */}
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
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700 }}
            >
              Principal's Message
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a] p-8 text-white shadow-xl">
                <p className="text-xl leading-relaxed mb-6 italic">
                  "Education is not just about acquiring knowledge; it's about building character, developing critical thinking, and preparing our students to become responsible citizens of tomorrow."
                </p>
                <p className="leading-relaxed mb-4">
                  As the Principal of Rajasinghe Central College, I am honored to lead an institution with such a rich legacy of excellence. Our dedicated faculty, modern facilities, and comprehensive curriculum ensure that every student receives the best possible education.
                </p>
                <p className="leading-relaxed">
                  We are committed to nurturing the potential in every child, encouraging them to dream big, work hard, and make a positive difference in the world.
                </p>
              </div>
              <div className="pl-8 border-l-4 border-[#FFD700]">
                <h4
                  className="text-[#1a2b5c] mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 600 }}
                >
                  Mr. K.A. Samaraweera
                </h4>
                <p className="text-[#4a5568]">Principal</p>
                <p className="text-[#4a5568]">Rajasinghe Central College Ruwanwella</p>
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
                  alt="Principal"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History of School */}
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
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700 }}
            >
              Our History
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto"></div>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                year: '1956',
                title: 'Foundation',
                description: 'Rajasinghe Central College was established with a vision to provide quality education to the youth of Ruwanwella and surrounding areas.',
                image: 'https://images.unsplash.com/photo-1672073233308-f58af32a0761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                year: '1970s',
                title: 'Expansion',
                description: 'The school expanded significantly with new buildings, laboratories, and sports facilities to accommodate growing student numbers.',
                image: 'https://images.unsplash.com/photo-1651103435299-f20251469c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                year: '2000s',
                title: 'Modernization',
                description: 'Introduction of computer labs, digital learning resources, and modern teaching methodologies marked a new era of educational excellence.',
                image: 'https://images.unsplash.com/photo-1573894998033-c0cef4ed722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2hvb2wlMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                year: 'Today',
                title: 'Excellence Continues',
                description: 'The college continues to thrive with over 2,500 students, state-of-the-art facilities, and a commitment to holistic education.',
                image: 'https://images.unsplash.com/photo-1752920299211-28be8c9b0121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3Njk2OTI4NHww&ixlib=rb-4.1.0&q=80&w=1080'
              }
            ].map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="bg-white/10 backdrop-blur-sm p-8 border-l-4 border-[#FFD700]">
                    <div className="text-[#FFD700] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 700 }}>
                      {milestone.year}
                    </div>
                    <h3
                      className="text-white mb-4"
                      style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 600 }}
                    >
                      {milestone.title}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="overflow-hidden shadow-2xl">
                    <ImageWithFallback
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-[350px] object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
