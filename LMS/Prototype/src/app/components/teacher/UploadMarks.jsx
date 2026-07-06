import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Save } from "lucide-react";
import { useState } from "react";

export function UploadMarks() {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marks, setMarks] = useState({
    "1": { term1: "", term2: "", term3: "" },
    "2": { term1: "", term2: "", term3: "" },
    "3": { term1: "", term2: "", term3: "" },
    "4": { term1: "", term2: "", term3: "" },
    "5": { term1: "", term2: "", term3: "" },
  });

  const students = [
    { id: 1, name: "Kamal Perera" },
    { id: 2, name: "Saman Kumara" },
    { id: 3, name: "Ravi Fernando" },
    { id: 4, name: "Nimal Silva" },
    { id: 5, name: "Amara Dias" },
  ];

  const handleMarkChange = (studentId, term, value) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [term]: value
      }
    }));
  };

  const handleSaveMarks = () => {
    if (!selectedGrade || !selectedClass || !selectedSubject) {
      alert('Please select Grade, Class, and Subject before saving marks.');
      return;
    }
    alert(`Marks saved successfully!\nGrade: ${selectedGrade}\nClass: ${selectedClass}\nSubject: ${selectedSubject}`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="teacher" />
      <div className="flex-1">
        <TopNavbar userName="Nimal Silva" role="Teacher" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Upload Student Marks</h2>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Grade</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="">Choose Grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="">Choose Class</option>
                  <option value="A">Class A</option>
                  <option value="B">Class B</option>
                  <option value="C">Class C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="">Choose Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="sinhala">Sinhala</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg text-gray-800">Student Marks Entry</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Student Name</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Term 1</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Term 2</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Term 3</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id]?.term1 || ""}
                        onChange={(e) => handleMarkChange(student.id, 'term1', e.target.value)}
                        placeholder="0-100"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id]?.term2 || ""}
                        onChange={(e) => handleMarkChange(student.id, 'term2', e.target.value)}
                        placeholder="0-100"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id]?.term3 || ""}
                        onChange={(e) => handleMarkChange(student.id, 'term3', e.target.value)}
                        placeholder="0-100"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-gray-50 flex justify-end">
              <button onClick={handleSaveMarks} className="flex items-center gap-2 px-6 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
                <Save className="w-5 h-5" />
                Save Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
