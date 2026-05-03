import { motion } from "motion/react";
import { Video, Calendar, Clock, Users } from "lucide-react";
function LiveStream() {
  return <div className="pt-20">
      {
    /* Hero Section */
  }
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a]">
        <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
    backgroundSize: "40px 40px"
  }} />
        <div className="relative z-10 text-center px-6">
          <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6"
  >
            <Video className="w-12 h-12 text-[#1a2b5c]" />
          </motion.div>
          <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-white text-5xl md:text-6xl"
    style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
  >
            Live Streaming
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-white/90 text-xl mt-4"
  >
            Watch school events live from anywhere in the world
          </motion.p>
        </div>
      </section>

      {
    /* Main Live Stream Section */
  }
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
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
              Current Live Stream
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          {
    /* YouTube Embed Placeholder */
  }
          <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="aspect-video bg-gray-900 shadow-2xl mb-8 relative overflow-hidden"
  >
            {
    /* Placeholder for YouTube embed - Replace with actual YouTube video ID */
  }
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a]">
              <div className="text-center text-white">
                <Video className="w-24 h-24 text-[#FFD700] mx-auto mb-6" />
                <h3 className="text-3xl mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>
                  No Live Stream Currently
                </h3>
                <p className="text-xl text-white/80">
                  Check back during scheduled events
                </p>
              </div>
            </div>

            {
    /* To embed actual YouTube live stream, use:
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/LIVE_VIDEO_ID"
      title="Live Stream"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    */
  }
          </motion.div>

          <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-[#1a2b5c] to-[#1e3a8a] p-8 text-white text-center"
  >
            <h3 className="text-2xl mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>
              How to Watch
            </h3>
            <p className="text-lg text-white/90 leading-relaxed">
              Live streams are available during major school events including Annual Prize Giving,
              Sports Meets, Cultural Shows, and Special Ceremonies. The stream will appear above
              when an event is live. You can also subscribe to our YouTube channel for notifications.
            </p>
          </motion.div>
        </div>
      </section>

      {
    /* Upcoming Live Events */
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
              Upcoming Live Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
    {
      event: "Annual Prize Giving Ceremony 2026",
      date: "May 15, 2026",
      time: "9:00 AM",
      duration: "3 hours",
      description: "Celebrate academic excellence and student achievements with awards, speeches, and cultural performances.",
      attendees: "2000+ Expected Viewers"
    },
    {
      event: "Inter-House Sports Meet",
      date: "May 20, 2026",
      time: "2:00 PM",
      duration: "4 hours",
      description: "Watch thrilling athletic competitions featuring track events, field events, and relay races.",
      attendees: "1500+ Expected Viewers"
    },
    {
      event: "Music Concert Evening",
      date: "June 15, 2026",
      time: "6:00 PM",
      duration: "2 hours",
      description: "Classical and contemporary musical performances by our talented orchestra, choir, and soloists.",
      attendees: "1000+ Expected Viewers"
    },
    {
      event: "Drama Society Annual Performance",
      date: "June 1, 2026",
      time: "3:00 PM",
      duration: "2.5 hours",
      description: "Original theatrical production showcasing the exceptional talent of our drama society.",
      attendees: "800+ Expected Viewers"
    }
  ].map((event, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    className="bg-white p-8 shadow-lg border-l-4 border-[#FFD700] hover:shadow-2xl transition-all duration-300"
  >
                <div className="flex items-start justify-between mb-4">
                  <h3
    className="text-[#1a2b5c] flex-1"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 600 }}
  >
                    {event.event}
                  </h3>
                  <Video className="w-8 h-8 text-[#FFD700] flex-shrink-0 ml-4" />
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-[#4a5568]">
                    <Calendar className="w-5 h-5 text-[#FFD700]" />
                    <span style={{ fontWeight: 600 }}>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#4a5568]">
                    <Clock className="w-5 h-5 text-[#FFD700]" />
                    <span>{event.time} ({event.duration})</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#4a5568]">
                    <Users className="w-5 h-5 text-[#FFD700]" />
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <p className="text-[#4a5568] leading-relaxed mb-6">
                  {event.description}
                </p>

                <button className="w-full py-3 bg-[#1a2b5c] text-white hover:bg-[#FFD700] hover:text-[#1a2b5c] transition-all duration-300">
                  Set Reminder
                </button>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Past Events Archive */
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
              Past Events Archive
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6" />
            <p className="text-[#4a5568] text-lg">
              Watch recordings of previous events on our YouTube channel
            </p>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center"
  >
            <button className="px-10 py-4 bg-gradient-to-r from-[#1a2b5c] to-[#1e3a8a] text-white hover:from-[#FFD700] hover:to-[#FFC700] hover:text-[#1a2b5c] transition-all duration-300 text-lg">
              Visit Our YouTube Channel
            </button>
          </motion.div>
        </div>
      </section>
    </div>;
}
export {
  LiveStream as default
};
