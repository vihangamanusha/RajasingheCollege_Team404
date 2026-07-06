import { Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function StaffALevel() {
  const { t } = useLanguage();

  const staff = [
    { name: "Dr. L.N. Bandara", subject: "Mathematics", experience: "22 years" },
    { name: "Prof. H.D. Wiseman", subject: "English", experience: "20 years" },
    { name: "Dr. A.R. Gupta", subject: "Science", experience: "18 years" },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
          alt="A/L Staff"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">A/L Staff</h1>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#002147] to-[#003366] text-white p-8 rounded-lg shadow-xl text-center"
              >
                <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-[#002147]" />
                </div>
                <h3 className="text-[#FFD700] mb-3 font-bold">{member.name}</h3>
                <p className="text-gray-300 mb-2">{member.subject}</p>
                <p className="text-sm text-gray-400">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
