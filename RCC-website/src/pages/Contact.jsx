import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Banner */}
      <section className="contact-hero">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
          alt="Contact Us"
        />

        <div className="contact-hero-overlay">
          <h1 className="contact-hero-title">
            {t("contact.title")}
          </h1>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>
                {t("contact.getInTouch")}
              </h2>
              <p>
                {t("contact.intro")}
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <MapPin className="contact-info-icon" />
                  </div>
                  <div>
                    <h3>
                      {t("contact.address")}
                    </h3>
                    <p>
                      Ruwanwella Rajasinhge Central College
                      <br />
                      Main Street, Ruwanwella
                      <br />
                      Kegalle District, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Phone className="contact-info-icon" />
                  </div>
                  <div>
                    <h3>
                      {t("contact.phone")}
                    </h3>
                    <p>
                      Main Office: +94 35 226 XXXX
                      <br />
                      Principal: +94 35 226 YYYY
                      <br />
                      Admissions: +94 35 226 ZZZZ
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Mail className="contact-info-icon" />
                  </div>
                  <div>
                    <h3>
                      {t("contact.email")}
                    </h3>
                    <p>
                      General: info@rrcc.lk
                      <br />
                      Principal: principal@rrcc.lk
                      <br />
                      Admissions: admissions@rrcc.lk
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Clock className="contact-info-icon" />
                  </div>
                  <div>
                    <h3>Office Hours</h3>
                    <p>
                      Monday - Friday: 7:30 AM - 3:30 PM
                      <br />
                      Saturday: 8:00 AM - 12:00 PM
                      <br />
                      Sunday & Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h3>
                {t("contact.sendMessage")}
              </h3>
              <form>
                <div>
                  <label htmlFor="name">
                    {t("contact.yourName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder={t("contact.yourName")}
                  />
                </div>

                <div>
                  <label htmlFor="email">
                    {t("contact.yourEmail")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t("contact.yourEmail")}
                  />
                </div>

                <div>
                  <label htmlFor="phone">
                    {t("contact.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder={t("contact.phone")}
                  />
                </div>

                <div>
                  <label htmlFor="subject">
                    {t("contact.subject")} *
                  </label>
                  <select
                    id="subject"
                  >
                    <option value="">{t("contact.subject")}</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="academic">Academic Information</option>
                    <option value="sports">Sports Programs</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message">
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t("contact.message")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                >
                  <Send />
                  <span>{t("contact.send")}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="contact-map-container">
          <div className="contact-map-header">
            <h2 className="contact-map-title">
              {t("contact.location")}
            </h2>
            <div className="contact-map-divider"></div>
          </div>
          <div className="contact-map-wrapper">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8!2d80.4!3d6.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMDAuMCJOIDgwwrAyNCcwMC4wIkU!5e0!3m2!1sen!2slk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
