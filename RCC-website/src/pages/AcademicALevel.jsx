import { BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function AcademicALevel() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop"
          alt="Advanced Level"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">Advanced Level</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-[#FFD700]" />
              </div>
            </div>
            <h2 className="text-4xl text-[#002147] mb-6">Advanced Level</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our A/L program offers specialized streams for students pursuing higher education.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
