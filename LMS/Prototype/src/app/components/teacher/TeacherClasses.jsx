import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Users, BookOpen, Calendar, Upload } from "lucide-react";

export function TeacherClasses() {
  const classes = [
    {
      id: 1,
      name: "Grade 10A",
      students: 42,
      medium: "English",
      subjects: ["Mathematics"],
      schedule: "Mon, Wed, Fri - 8:00 AM",
      attendance: 95.5,
    },
    {
      id: 2,
      name: "Grade 10B",
      students: 38,
      medium: "Sinhala",
      subjects: ["Mathematics"],
      schedule: "Tue, Thu - 9:00 AM",
      attendance: 92.3,
    },
    {
      id: 3,
      name: "Grade 11A",
      students: 40,
      medium: "English",
      subjects: ["Mathematics"],
      schedule: "Mon, Wed - 10:00 AM",
      attendance: 94.8,
    },
  ];

  const handleViewStudents = (className) => {
    alert(`Viewing student list for ${className}\n\nThis would show detailed student information and attendance records.`);
  };

  const handleMarkAttendance = (className) => {
    alert(`Mark attendance for ${className}\n\nThis would open the attendance marking interface.`);
  };

  const handleUploadMarks = () => {
    window.location.href = '/upload-marks';
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="teacher" />
      <div className="flex-1">
        <TopNavbar userName="Nimal Silva" role="Teacher" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">My Classes</h2>

          <div className="grid grid-cols-1 gap-6">
            {classes.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-900 mb-1">{cls.name}</h3>
                      <p className="text-sm text-gray-600">
                        {cls.students} Students • {cls.medium} Medium
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-sm ${
                    cls.attendance >= 95 ? 'bg-green-100 text-green-700' :
                    cls.attendance >= 90 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {cls.attendance}% Attendance
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-[#1e40af]" />
                      <span className="text-sm text-gray-600">Subjects</span>
                    </div>
                    <p className="text-sm text-gray-900">{cls.subjects.join(', ')}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#fbbf24]" />
                      <span className="text-sm text-gray-600">Schedule</span>
                    </div>
                    <p className="text-sm text-gray-900">{cls.schedule}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Students</span>
                    </div>
                    <p className="text-sm text-gray-900">{cls.students} Enrolled</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleViewStudents(cls.name)} className="flex-1 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                    View Students
                  </button>
                  <button onClick={() => handleMarkAttendance(cls.name)} className="flex-1 px-4 py-2 bg-[#fbbf24] text-[#1e40af] rounded-lg hover:bg-[#f59e0b] transition-colors">
                    Mark Attendance
                  </button>
                  <button onClick={handleUploadMarks} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Marks
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
