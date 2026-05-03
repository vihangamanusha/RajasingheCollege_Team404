import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Facebook, Youtube, Instagram } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
function Contact() {
  return <div className="pt-20">
      {
    /* Hero Section */
  }
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
    src="https://images.unsplash.com/photo-1664553692783-888fda781031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzY2hvb2wlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzY5NjI5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    alt="School Building"
    className="w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-[#1a2b5c]/75" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-white text-5xl md:text-6xl"
    style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
  >
            Contact Us
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-white/90 text-xl mt-4"
  >
            We're here to help and answer any questions you might have
          </motion.p>
        </div>
      </section>

      {
    /* Contact Information */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Rajasinghe Central College",
        "Main Street",
        "Ruwanwella",
        "Sri Lanka"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "Office: +94 36 226 7890",
        "Principal: +94 36 226 7891",
        "Admission: +94 36 226 7892",
        "Fax: +94 36 226 7893"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "General: info@rrcc.lk",
        "Admissions: admissions@rrcc.lk",
        "Principal: principal@rrcc.lk",
        "Sports: sports@rrcc.lk"
      ],
      color: "from-purple-500 to-purple-600"
    }
  ].map((contact, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.15 }}
    className="bg-white p-8 shadow-lg border-t-4 border-[#FFD700] hover:shadow-2xl transition-all duration-300"
  >
                <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                <h3
    className="text-[#1a2b5c] mb-6 text-center"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.75rem", fontWeight: 600 }}
  >
                  {contact.title}
                </h3>
                <div className="space-y-3 text-center">
                  {contact.details.map((detail, idx) => <p key={idx} className="text-[#4a5568] leading-relaxed">
                      {detail}
                    </p>)}
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Office Hours */
  }
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center mb-12"
  >
            <h2
    className="text-[#1a2b5c] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
  >
              Office Hours
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-10 shadow-lg"
  >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#1a2b5c] rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3
    className="text-[#1a2b5c]"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 600 }}
  >
                School Office
              </h3>
            </div>

            <div className="space-y-4">
              {[
    { day: "Monday - Friday", time: "7:30 AM - 4:00 PM" },
    { day: "Saturday", time: "8:00 AM - 12:00 PM" },
    { day: "Sunday & Public Holidays", time: "Closed" }
  ].map((schedule, i) => <div key={i} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0">
                  <span className="text-[#1a2b5c] text-lg" style={{ fontWeight: 600 }}>
                    {schedule.day}
                  </span>
                  <span className="text-[#4a5568] text-lg">
                    {schedule.time}
                  </span>
                </div>)}
            </div>
          </motion.div>
        </div>
      </section>

      {
    /* Social Media & Links */
  }
      <section className="py-24 px-6 bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="mb-12"
  >
            <h2
    className="text-white mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
  >
              Connect With Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6" />
            <p className="text-white/90 text-xl">
              Follow us on social media for the latest updates and news
            </p>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex justify-center gap-8 mb-12"
  >
            {[
    { icon: Facebook, label: "Facebook", link: "#" },
    { icon: Youtube, label: "YouTube", link: "#" },
    { icon: Instagram, label: "Instagram", link: "#" }
  ].map((social, i) => <motion.a
    key={i}
    href={social.link}
    whileHover={{ scale: 1.1, y: -5 }}
    className="bg-white/10 backdrop-blur-sm p-6 border-2 border-white/20 hover:border-[#FFD700] transition-all duration-300 group"
  >
                <social.icon className="w-12 h-12 text-white group-hover:text-[#FFD700] transition-colors duration-300 mx-auto mb-3" />
                <span className="text-white text-sm">{social.label}</span>
              </motion.a>)}
          </motion.div>

          <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-white/10 backdrop-blur-sm p-8 border-2 border-white/20"
  >
            <h3 className="text-white text-2xl mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>
              Quick Links
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
    "Admissions Portal",
    "Student Login",
    "Parent Portal",
    "Staff Portal",
    "Library Access",
    "Online Payments"
  ].map((link, i) => <a
    key={i}
    href="#"
    className="text-white/90 hover:text-[#FFD700] transition-colors duration-300 py-2"
  >
                  {link}
                </a>)}
            </div>
          </motion.div>
        </div>
      </section>

      {
    /* Map Section */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center mb-12"
  >
            <h2
    className="text-[#1a2b5c] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
  >
              Find Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="aspect-video bg-gray-200 shadow-xl flex items-center justify-center"
  >
            {
    /* Placeholder for Google Maps embed */
  }
            <div className="text-center text-[#4a5568]">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#1a2b5c]" />
              <p className="text-xl">Google Maps Location</p>
              <p className="text-sm mt-2">Rajasinghe Central College, Ruwanwella</p>
            </div>

            {
    /* To embed actual Google Maps, use:
    <iframe
      className="w-full h-full"
      src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
    */
  }
          </motion.div>
        </div>
      </section>
    </div>;
}
export {
  Contact as default
};
