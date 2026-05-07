import { Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function AllStaff() {
  const { t } = useLanguage();

  const staff = [
    { name: "Principal M.S. Jayasooriya", role: "Principal", dept: "Administration" },
    { name: "Mr. K.D. Silva", role: "Deputy Principal", dept: "Academic" },
    { name: "Mrs. R.P. Fernando", role: "HOD - English", dept: "Languages" },
    { name: "Mr. A.K. Perera", role: "HOD - Science", dept: "Science" },
    { name: "Mr. D.S. Silva", role: "Sports Director", dept: "Sports" },
    { name: "Mrs. N.K. Perera", role: "Counselor", dept: "Student Affairs" },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
          alt="All Staff"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">Our Staff</h1>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#002147] to-[#003366] text-white p-8 rounded-lg shadow-xl"
              >
                <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-[#002147]" />
                </div>
                <h3 className="text-[#FFD700] mb-2 font-bold text-lg">{member.name}</h3>
                <p className="text-gray-300 mb-1">{member.role}</p>
                <p className="text-sm text-gray-400">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
