import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export function ClassManagement() {
  const params = new URLSearchParams(window.location.search);
  const [userRole] = useState(
    params.get('from') === 'admin' ? 'admin' : 'technical-officer'
  );

  const classes = [
    { id: 1, grade: "Grade 9", className: "9A", medium: "English", teacher: "Nimal Silva", students: 42 },
    { id: 2, grade: "Grade 9", className: "9B", medium: "Sinhala", teacher: "Amara Dias", students: 38 },
    { id: 3, grade: "Grade 10", className: "10A", medium: "English", teacher: "Saman Kumara", students: 40 },
    { id: 4, grade: "Grade 10", className: "10B", medium: "Sinhala", teacher: "Ruwan Perera", students: 35 },
    { id: 5, grade: "Grade 11", className: "11A", medium: "English", teacher: "Kamala Fernando", students: 36 },
    { id: 6, grade: "Grade 11", className: "11B", medium: "Sinhala", teacher: "Sunil Bandara", students: 39 },
  ];

  const handleAddClass = () => {
    alert('Add Class form will open here. You can create a new class with grade, section, medium, and assign a class teacher.');
  };

  const handleEditClass = (cls) => {
    alert(`Edit class: ${cls.grade} ${cls.className}\nMedium: ${cls.medium}\nTeacher: ${cls.teacher}`);
  };

  const handleDeleteClass = (cls) => {
    if (confirm(`Are you sure you want to delete ${cls.grade} ${cls.className}?`)) {
      alert(`Class ${cls.grade} ${cls.className} has been deleted successfully.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role={userRole} />
      <div className="flex-1">
        <TopNavbar
          userName={userRole === 'admin' ? 'Admin User' : 'Technical Officer'}
          role={userRole === 'admin' ? 'Administrator' : 'Technical Officer'}
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-800">Class Management</h2>
            <button onClick={handleAddClass} className="flex items-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
              <Plus className="w-5 h-5" />
              Add New Class
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Grade</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Class Name</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Medium</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Class Teacher</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Students</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{cls.grade}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cls.className}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        cls.medium === "English" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {cls.medium}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cls.teacher}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cls.students}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClass(cls)} className="p-2 text-[#1e40af] hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteClass(cls)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
