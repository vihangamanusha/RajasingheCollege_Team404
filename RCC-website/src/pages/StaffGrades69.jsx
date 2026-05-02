import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function StaffGrades69() {
  const staffBySubject = [
    {
      subject: "Mathematics",
      teachers: [
        {
          name: "Mr. K.D. Silva",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        },
        {
          name: "Mrs. M.P. Fernando",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      subject: "Science",
      teachers: [
        {
          name: "Mrs. R.N. Perera",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        },
        {
          name: "Mr. S.L. Jayawardena",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      subject: "English Language",
      teachers: [
        {
          name: "Mrs. A.K. Wijesinghe",
          image:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        },
        {
          name: "Ms. N.S. De Silva",
          image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      subject: "Sinhala Language",
      teachers: [
        {
          name: "Mr. P.R. Bandara",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      subject: "History",
      teachers: [
        {
          name: "Mrs. L.M. Gunasekara",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      subject: "Geography",
      teachers: [
        {
          name: "Mr. T.B. Amarasinghe",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop"
          alt="Grades 6-9 Teachers"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#002147]/70 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white">
            Grades 6-9 Teachers
          </h1>
        </div>
      </section>

      {/* Staff by Subject */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-12">
            {staffBySubject.map((item, index) => (
              <div key={index}>
                <h2 className="text-3xl text-[#002147] mb-6 border-b-2 border-[#FFD700] pb-2">
                  {item.subject}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {item.teachers.map((teacher, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="h-48 overflow-hidden">
                        <ImageWithFallback
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 bg-[#002147] text-center">
                        <h3 className="text-white text-lg">{teacher.name}</h3>
                      </div>
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
