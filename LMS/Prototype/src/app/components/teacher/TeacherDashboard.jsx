import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { BookOpen, Users, Upload, FolderOpen, BarChart3, GraduationCap } from "lucide-react";

export function TeacherDashboard() {
  const mySubjects = [
    { name: "Mathematics", grade: "Grade 10", classes: "3 Classes" },
    { name: "Mathematics", grade: "Grade 11", classes: "2 Classes" },
  ];

  const myClasses = [
    { name: "Grade 10A", students: 42, medium: "English" },
    { name: "Grade 10B", students: 38, medium: "Sinhala" },
    { name: "Grade 11A", students: 40, medium: "English" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="teacher" />
      <div className="flex-1">
        <TopNavbar userName="Nimal Silva" role="Teacher" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Teacher Dashboard</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1e40af]" />
                My Subjects
              </h3>
              <div className="space-y-3">
                {mySubjects.map((subject, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-900">{subject.name}</p>
                    <p className="text-xs text-gray-600">{subject.grade} • {subject.classes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#1e40af]" />
                My Classes
              </h3>
              <div className="space-y-3">
                {myClasses.map((cls, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-900">{cls.name}</p>
                    <p className="text-xs text-gray-600">{cls.students} Students • {cls.medium}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => window.location.href = '/upload-marks'} className="w-full flex items-center gap-3 px-4 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>Upload Marks</span>
                </button>
                <button onClick={() => window.location.href = '/upload-materials'} className="w-full flex items-center gap-3 px-4 py-3 bg-[#fbbf24] text-[#1e40af] rounded-lg hover:bg-[#f59e0b] transition-colors">
                  <FolderOpen className="w-5 h-5" />
                  <span>Upload Materials</span>
                </button>
                <button onClick={() => alert('Reports feature coming soon!')} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <BarChart3 className="w-5 h-5" />
                  <span>View Reports</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg mb-4 text-gray-800">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-3xl text-[#1e40af] mb-1">5</p>
                <p className="text-sm text-gray-600">Total Classes</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <p className="text-3xl text-[#fbbf24] mb-1">120</p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-3xl text-green-500 mb-1">24</p>
                <p className="text-sm text-gray-600">Materials Uploaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
