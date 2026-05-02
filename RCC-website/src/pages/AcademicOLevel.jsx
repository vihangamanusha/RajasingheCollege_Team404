import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AcademicOLevel() {
  const subjects = [
    "Sinhala Language & Literature",
    "Tamil Language",
    "English Language",
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "Buddhism",
    "Commerce & Accounts",
    "Business Studies",
    "Information & Communication Technology",
    "Health & Physical Education",
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
          alt="Ordinary Level"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">Ordinary Level</h1>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002147] mb-4">Subjects Offered</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto italic">
              Comprehensive O/L education preparing students for advanced level
              studies and future careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 border-l-4 border-[#FFD700] p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <p className="text-[#002147]">{subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
