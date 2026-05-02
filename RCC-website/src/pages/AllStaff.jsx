import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AllStaff() {
  const allStaff = [
    {
      name: "Mr. K.P. Jayasinghe",
      subject: "Principal",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. S.M. Perera",
      subject: "Vice Principal - Academic",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. R.D. Fernando",
      subject: "Vice Principal - Administration",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. K.D. Silva",
      subject: "Mathematics (Grades 6-9)",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. M.P. Fernando",
      subject: "Mathematics (Grades 6-9)",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. R.N. Perera",
      subject: "Science (Grades 6-9)",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. S.L. Jayawardena",
      subject: "Science (Grades 6-9)",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. A.K. Wijesinghe",
      subject: "English Language (Grades 6-9)",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. D.P. Rodrigo",
      subject: "Mathematics (O/L)",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. S.K. Weerasinghe",
      subject: "Mathematics (O/L)",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. N.R. Dissanayake",
      subject: "Science (O/L)",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. L.K. Bandara",
      subject: "Physics (A/L)",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. S.D. Perera",
      subject: "Chemistry (A/L)",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. R.K. Silva",
      subject: "Biology (A/L)",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. P.L. Fernando",
      subject: "Combined Mathematics (A/L)",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. M.N. Jayawardena",
      subject: "Economics (A/L)",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop"
          alt="All Staff Members"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            Our Academic Staff
          </h1>
        </div>
      </section>

      {/* All Staff Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002147] mb-4">All Staff Members</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto italic">
              Meet our dedicated team of educators committed to excellence in
              education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allStaff.map((staff, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-[#002147] text-center">
                  <h3 className="text-white text-lg mb-1">{staff.name}</h3>
                  <p className="text-[#FFD700] text-sm">{staff.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
