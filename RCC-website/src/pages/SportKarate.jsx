import { Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function SportKarate() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1920&h=1080&fit=crop"
          alt="Karate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">Karate</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h2 className="text-4xl text-[#002147]">National Medalists</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our karate athletes have achieved national recognition through disciplined training and competitive excellence.
            </p>
            <div className="bg-[#F5F5F5] p-6 rounded-lg">
              <h3 className="text-2xl text-[#002147] mb-4">Recent Achievements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>National Karate Championships - Gold Medals 2025</li>
                <li>Provincial Karate Tournament Champions 2024</li>
                <li>Asian Youth Karate Competition Participants 2024</li>
                <li>District Karate Championships Winners 2023</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
