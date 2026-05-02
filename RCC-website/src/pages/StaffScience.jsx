import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function StaffScience() {
  const staff = [
    {
      name: "Mrs. S.D. Perera",
      position: "Head of Department - Science",
      subjects: "Physics, Chemistry",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. R.K. Silva",
      position: "Senior Teacher",
      subjects: "Biology",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Mr. P.L. Fernando",
      position: "Teacher",
      subjects: "Combined Mathematics",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Mrs. N.M. Wijesinghe",
      position: "Teacher",
      subjects: "Chemistry",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=1080&fit=crop"
          alt="Science Department"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            Science Department
          </h1>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#002147] mb-4">Our Faculty</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {staff.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[#002147] text-lg mb-2">{member.name}</h3>
                  <p className="text-sm text-[#FFD700] mb-2">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {member.subjects}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
