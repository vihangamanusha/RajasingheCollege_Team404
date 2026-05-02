import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AcademicALevel() {
  const streams = [
    {
      title: "Science Stream",
      subjects: ["Physics", "Chemistry", "Biology", "Combined Mathematics"],
    },
    {
      title: "Mathematics Stream",
      subjects: [
        "Pure Mathematics",
        "Applied Mathematics",
        "Physics",
        "Chemistry",
      ],
    },
    {
      title: "Arts Stream",
      subjects: ["History", "Geography", "Economics", "Literature"],
    },
    {
      title: "Commerce Stream",
      subjects: [
        "Business Studies",
        "Accounting",
        "Economics",
        "Business Statistics",
      ],
    },
    {
      title: "Technology Stream",
      subjects: [
        "Engineering Technology",
        "Science for Technology",
        "Information Technology",
        "Engineering Drawing",
      ],
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
          alt="Advanced Level"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">Advanced Level</h1>
        </div>
      </section>

      {/* Streams Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002147] mb-4">Available Streams</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto italic">
              Specialized streams for university preparation and career pathways
            </p>
          </div>

          <div className="space-y-8">
            {streams.map((stream, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 border-l-4 border-[#FFD700] rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl text-[#002147] mb-4">{stream.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stream.subjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <p className="text-gray-700">{subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
