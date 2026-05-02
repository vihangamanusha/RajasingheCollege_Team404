import { Facebook, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/rcc.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#002147] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="RRCC Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* School Name */}
        <div className="text-center mb-8">
          <h3 className="text-[#FFD700] text-2xl mb-2">
            {t("footer.schoolName")}
          </h3>
          <p className="text-gray-300">{t("footer.tagline")}</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-[#002147] transition-all duration-300"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-[#002147] transition-all duration-300"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-[#002147] transition-all duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link
            to="/about"
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            {t("nav.about")}
          </Link>
          <Link
            to="/news"
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            {t("nav.news")}
          </Link>
          <Link
            to="/sports"
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            {t("nav.sports")}
          </Link>
          <Link
            to="/live-stream"
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            {t("nav.liveStream")}
          </Link>
          <a
            href="#lms"
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            {t("nav.lms")}
          </a>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-white/20 pt-8">
          {/* Footer Links */}

          {/* Copyright */}
          <div className="text-center text-sm text-gray-300">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
