import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Globe, LucideDivide } from "lucide-react";
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
      {/* Main Header */}
      <header className="header">
        <div className="container py-4">
          <div className="flex  justify-between">
            {/* Logo and School Name - Left */}
            <div className="logo-link group">
              <img
                src={logo}
                alt="RRCC Logo"
                className="logo"
              />

              <div className="hidden md:block">
                <h2 className="school-name">
                  Rajasinghe Central College
                </h2>
                <p className="school-location">Ruwanwella</p>
              </div>
            </div>

            {/* Desktop Navigation - Right */}
            <nav className="hidden lg:flex nav">
              {navItems.map((item) => {
                if (item.path === "#lms") {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className="nav-link"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="language-btn"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "සිං" : "EN"}</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden mobile-menu-btn"
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
            <nav className="mobile-nav">
              {navItems.map((item) => {
                if (item.path === "#lms") {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-nav-link"
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
                    className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={toggleLanguage}
                className="w-full mt-3 language-btn"
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
