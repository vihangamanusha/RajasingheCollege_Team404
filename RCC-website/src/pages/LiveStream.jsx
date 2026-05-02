import { Radio, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function LiveStream() {
  const { t } = useLanguage();
  const upcomingStreams = [
    {
      titleKey: "stream1.title",
      date: "May 25, 2026",
      time: "2:00 PM",
      descriptionKey: "stream1.desc",
    },
    {
      titleKey: "stream2.title",
      date: "May 15, 2026",
      time: "8:00 AM",
      descriptionKey: "stream2.desc",
    },
    {
      titleKey: "stream3.title",
      date: "June 5, 2026",
      time: "10:00 AM",
      descriptionKey: "stream3.desc",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&h=1080&fit=crop"
          alt="Live Stream"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            {t("livestream.title")}
          </h1>
        </div>
      </section>

      {/* Current Live Stream */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-[#002147] to-[#003366] rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Radio className="w-24 h-24 text-[#FFD700] mx-auto mb-6 animate-pulse" />
                <p className="text-2xl text-white mb-4">
                  {t("livestream.noLive")}
                </p>
              </div>
            </div>
            <div className="p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-red-600 rounded-full text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span>OFFLINE</span>
                </div>
              </div>
              <h2 className="text-3xl mb-4">School Events Live Stream</h2>
              <p className="text-gray-300">
                Stay connected with RRCC by watching our live streams of major
                school events, ceremonies, and competitions. Enable
                notifications to never miss a stream!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Streams */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#002147] mb-4">
              {t("livestream.upcoming")}
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingStreams.map((stream, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-[#002147] mb-4">{t(stream.titleKey)}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>{stream.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{stream.time}</span>
                  </div>
                </div>
                <p className="text-gray-700">{t(stream.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
