import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import ContactImage from "../assets/contact.jpeg";
import { sendMessage } from "../api/contactApi";

export function Contact() {
  const { t } = useLanguage();
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Phone
    const phonePattern = /^[0-9]{10}$/;

if (!formData.phone.trim()) {
  newErrors.phone = "Phone number is required";
} else if (!phonePattern.test(formData.phone)) {
  newErrors.phone = "Phone number must be exactly 10 digits";
}

    // Subject
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      await sendMessage(formData);

      alert("Message Sent Successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  }
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="contact-hero">
        <ImageWithFallback
          src={ContactImage}
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
                      Monday - Friday: 7:30 AM - 1:30 PM
                      <br />
                    
                       Saturday, Sunday & Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
      <h3>Send Message</h3>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label htmlFor="name">Your Name *</label>

          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />

          {errors.name && (
            <p className="error-text">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Your Email *</label>

          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />

          {errors.email && (
            <p className="error-text">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">Phone *</label>

          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0771234567"
          />

          {errors.phone && (
            <p className="error-text">{errors.phone}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject">Subject *</label>

          <select
            id="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Select Subject</option>
            <option value="admissions">Admissions Inquiry</option>
            <option value="academic">Academic Information</option>
            <option value="sports">Sports Programs</option>
            <option value="general">General Inquiry</option>
            <option value="other">Other</option>
          </select>

          {errors.subject && (
            <p className="error-text">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message">Message *</label>

          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
          ></textarea>

          {errors.message && (
            <p className="error-text">{errors.message}</p>
          )}
        </div>

        <button type="submit">
          <Send size={18} />
          <span>Send Message</span>
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
