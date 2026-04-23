import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { BookOpen, Users, Upload } from "lucide-react";

export function TeacherSubjects() {
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      grade: "Grade 10",
      classes: ["10A", "10B", "10C"],
      totalStudents: 120,
      lessonsCompleted: 24,
      totalLessons: 40,
    },
    {
      id: 2,
      name: "Mathematics",
      grade: "Grade 11",
      classes: ["11A", "11B"],
      totalStudents: 80,
      lessonsCompleted: 18,
      totalLessons: 35,
    },
  ];

  const handleViewStudents = (subject) => {
    alert(`Viewing students for ${subject.name} - ${subject.grade}\n\nClasses: ${subject.classes.join(', ')}\nTotal Students: ${subject.totalStudents}`);
  };

  const handleUploadMaterial = () => {
    window.location.href = '/upload-materials';
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="teacher" />
      <div className="flex-1">
        <TopNavbar userName="Nimal Silva" role="Teacher" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">My Subjects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subjects.map((subject) => {
              const progress = (subject.lessonsCompleted / subject.totalLessons) * 100;
              return (
                <div key={subject.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-[#1e40af]" />
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.grade}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {subject.classes.length} Classes
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Classes</span>
                        <span className="text-sm text-gray-900">{subject.classes.join(', ')}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Students</span>
                        <span className="text-sm text-gray-900">{subject.totalStudents}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Lesson Progress</span>
                        <span className="text-sm text-gray-900">{subject.lessonsCompleted}/{subject.totalLessons}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1e40af] h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleViewStudents(subject)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                      <Users className="w-4 h-4" />
                      View Students
                    </button>
                    <button onClick={() => handleUploadMaterial()} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#fbbf24] text-[#1e40af] rounded-lg hover:bg-[#f59e0b] transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Material
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
