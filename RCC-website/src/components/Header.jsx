import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Globe } from "lucide-react";
import logo from "../assets/rcc.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.academic"), path: "/academic" },
    { name: t("nav.news"), path: "/news" },
    { name: t("nav.sports"), path: "/sports" },
    { name: t("nav.liveStream"), path: "/live-stream" },
    { name: t("nav.contact"), path: "/contact" },
    { name: t("nav.lms"), path: "#lms" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar with School Name */}

      {/* Main Header */}
      <header className="bg-[#002147] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and School Name - Left */}
            <Link to="/" className="flex items-center gap-4 group">
              <img
                src={logo}
                alt="RRCC Logo"
                className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />

              <div className="hidden md:block">
                <h2 className="text-[#FFD700] leading-tight text-2xl">
                  Rajasinghe Central College
                </h2>
                <p className="text-white text-base leading-tight">Ruwanwella</p>
              </div>
            </Link>

            {/* Desktop Navigation - Right */}
            <nav className="hidden lg:flex items-center gap-6 ml-auto">
              {navItems.map((item) => {
                if (item.path === "#lms") {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className="relative py-2 transition-colors duration-300 text-white/80 hover:text-white"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative py-2 transition-colors duration-300 ${
                      isActive(item.path)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700]"></span>
                    )}
                  </Link>
                );
              })}

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-[#002147] rounded-lg hover:bg-[#FFC700] transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "සිං" : "EN"}</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              {navItems.map((item) => {
                if (item.path === "#lms") {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 rounded-lg transition-colors duration-300 text-white hover:bg-white/10"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg transition-colors duration-300 ${
                      isActive(item.path)
                        ? "bg-[#FFD700] text-[#002147]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={toggleLanguage}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-[#FFD700] text-[#002147] rounded-lg hover:bg-[#FFC700] transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "සිංහල" : "English"}</span>
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
