import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            {t("contact.title")}
          </h1>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl text-[#002147] mb-8">
                {t("contact.getInTouch")}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t("contact.intro")}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-[#002147] mb-2">
                      {t("contact.address")}
                    </h3>
                    <p className="text-gray-700">
                      Ruwanwella Rajasinhge Central College
                      <br />
                      Main Street, Ruwanwella
                      <br />
                      Kegalle District, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-[#002147] mb-2">
                      {t("contact.phone")}
                    </h3>
                    <p className="text-gray-700">
                      Main Office: +94 35 226 XXXX
                      <br />
                      Principal: +94 35 226 YYYY
                      <br />
                      Admissions: +94 35 226 ZZZZ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-[#002147] mb-2">
                      {t("contact.email")}
                    </h3>
                    <p className="text-gray-700">
                      General: info@rrcc.lk
                      <br />
                      Principal: principal@rrcc.lk
                      <br />
                      Admissions: admissions@rrcc.lk
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="text-[#002147] mb-2">Office Hours</h3>
                    <p className="text-gray-700">
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
            <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-xl">
              <h3 className="text-3xl text-[#002147] mb-6">
                {t("contact.sendMessage")}
              </h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    {t("contact.yourName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    placeholder={t("contact.yourName")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    {t("contact.yourEmail")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    placeholder={t("contact.yourEmail")}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    {t("contact.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    placeholder={t("contact.phone")}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    {t("contact.subject")} *
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
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
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                    placeholder={t("contact.message")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[#002147] text-white rounded-lg hover:bg-[#003366] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t("contact.send")}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#002147] mb-4">
              {t("contact.location")}
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <div className="h-96">
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
