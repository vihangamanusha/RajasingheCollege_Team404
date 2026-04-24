import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Bell } from "lucide-react";
import logoImg from "../../imports/rcc.png";
function Layout() {
  const [scrollY, setScrollY] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Academic", path: "/academic" },
    { name: "News", path: "/news" },
    { name: "Sport", path: "/sport" },
    { name: "Live Stream", path: "/live-stream" },
    { name: "Contact Us", path: "/contact" }
  ];
  return <div className="min-h-screen bg-white" style={{ fontFamily: "Crimson Text, serif" }}>
      {
    /* Navigation */
  }
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 100 ? "bg-[#1a2b5c]/95 backdrop-blur-md shadow-xl" : "bg-[#1a2b5c]"}`}>
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4 cursor-pointer ml-0"
  >
                <img src={logoImg} alt="RRCC Logo" className="w-16 h-16 object-contain" />
                <div>
                  <h1 className="text-[#FFD700] leading-tight" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.5px" }}>
                    RAJASINGHE CENTRAL COLLEGE
                  </h1>
                  <p className="text-[#FFD700]/90 leading-tight" style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", fontWeight: 500 }}>
                    RUWANWELLA
                  </p>
                </div>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-6 mr-6">
              {navItems.map((item, i) => <Link key={item.path} to={item.path}>
                  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    className={`text-white hover:text-[#FFD700] transition-colors cursor-pointer ${location.pathname === item.path ? "text-[#FFD700]" : ""}`}
    style={{ fontFamily: "Arial, sans-serif", fontSize: "0.95rem", fontWeight: 500 }}
  >
                    {item.name}
                  </motion.div>
                </Link>)}

              {
    /* Notification Bell */
  }
              <div className="relative">
                <motion.button
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative text-white hover:text-[#FFD700] transition-colors p-2"
  >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    5
                  </span>
                </motion.button>

                {
    /* Notification Dropdown */
  }
                {showNotifications && <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute right-0 mt-2 w-80 bg-white shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
  >
                    <div className="bg-[#1a2b5c] text-white px-4 py-3">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {[
    {
      title: "New Online Learning Portal",
      message: "Access your courses and assignments online",
      time: "2 hours ago",
      unread: true
    },
    {
      title: "Annual Prize Giving - May 15",
      message: "Don't miss the ceremony at 9:00 AM",
      time: "1 day ago",
      unread: true
    },
    {
      title: "Basketball Team Wins",
      message: "Congratulations to our team!",
      time: "2 days ago",
      unread: true
    },
    {
      title: "Library Renovation Complete",
      message: "Visit our modern library facility",
      time: "5 days ago",
      unread: true
    },
    {
      title: "Parent-Teacher Meeting",
      message: "Scheduled for May 25 at 10:00 AM",
      time: "1 week ago",
      unread: true
    }
  ].map((notification, i) => <div
    key={i}
    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${notification.unread ? "bg-blue-50" : ""}`}
  >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <h4 className="text-[#1a2b5c] font-semibold text-sm mb-1">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-1">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-400">
                                {notification.time}
                              </span>
                            </div>
                            {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                          </div>
                        </div>)}
                    </div>
                    <Link to="/news">
                      <div className="px-4 py-3 bg-gray-50 text-center text-[#1a2b5c] hover:bg-gray-100 transition-colors cursor-pointer border-t">
                        <span className="text-sm font-semibold">View All Notifications</span>
                      </div>
                    </Link>
                  </motion.div>}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />

      {
    /* Footer */
  }
      <footer className="bg-[#0f1a2e] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            {
    /* Map Section */
  }
            <div className="md:col-span-2">
              <h3
    className="text-[#FFD700] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", fontWeight: 600 }}
  >
                Find Us
              </h3>
              <div className="aspect-video bg-gray-700 shadow-lg flex items-center justify-center border-2 border-white/20">
                {
    /* Placeholder for Google Maps embed */
  }
                <div className="text-center text-white/70">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-[#FFD700]" />
                  <p className="text-sm">Rajasinghe Central College</p>
                  <p className="text-xs mt-1">Main Street, Ruwanwella</p>
                </div>
                {
    /* To embed actual Google Maps, replace above div with:
    <iframe
      className="w-full h-full"
      src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
    */
  }
              </div>
            </div>

            {
    /* Quick Links */
  }
            <div>
              <h3
    className="text-[#FFD700] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", fontWeight: 600 }}
  >
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navItems.slice(0, 4).map((link) => <li key={link.path}>
                    <Link to={link.path} className="text-white/70 hover:text-[#FFD700] transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {
    /* Resources */
  }
            <div>
              <h3
    className="text-[#FFD700] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", fontWeight: 600 }}
  >
                Resources
              </h3>
              <ul className="space-y-2">
                {["Library", "Calendar", "Parents Portal", "Alumni"].map((link) => <li key={link}>
                    <a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors">
                      {link}
                    </a>
                  </li>)}
              </ul>
            </div>

            {
    /* Contact */
  }
            <div>
              <h3
    className="text-[#FFD700] mb-4"
    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", fontWeight: 600 }}
  >
                Contact
              </h3>
              <p className="text-white/70 mb-2">Main Street, Ruwanwella</p>
              <p className="text-white/70 mb-2">+94 36 226 7890</p>
              <p className="text-white/70">info@rrcc.lk</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2026 Rajasinghe Central College Ruwanwella. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
}
export {
  Layout as default
};
