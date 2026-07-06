import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";

export function StudentMarksView() {
  const marks = [
    { subject: "Mathematics", term1: 85, term2: 82, term3: 88 },
    { subject: "Science", term1: 78, term2: 81, term3: 79 },
    { subject: "English", term1: 82, term2: 85, term3: 84 },
    { subject: "Sinhala", term1: 90, term2: 88, term3: 92 },
    { subject: "History", term1: 76, term2: 78, term3: 80 },
    { subject: "Geography", term1: 84, term2: 82, term3: 86 },
    { subject: "ICT", term1: 92, term2: 90, term3: 94 },
    { subject: "Buddhism", term1: 88, term2: 85, term3: 87 },
  ];

  const getAverage = (t1, t2, t3) => {
    return ((t1 + t2 + t3) / 3).toFixed(1);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="student" />
      <div className="flex-1">
        <TopNavbar userName="Kamal Perera" role="Student - Grade 10A" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">My Marks</h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white">
              <h3 className="text-lg">Academic Year 2026 - Grade 10A</h3>
              <p className="text-sm text-blue-100 mt-1">Kamal Perera</p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Subject</th>
                  <th className="px-6 py-3 text-center text-sm text-gray-700">Term 1</th>
                  <th className="px-6 py-3 text-center text-sm text-gray-700">Term 2</th>
                  <th className="px-6 py-3 text-center text-sm text-gray-700">Term 3</th>
                  <th className="px-6 py-3 text-center text-sm text-gray-700">Average</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark) => {
                  const avg = parseFloat(getAverage(mark.term1, mark.term2, mark.term3));
                  return (
                    <tr key={mark.subject} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{mark.subject}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-lg ${
                          mark.term1 >= 75 ? "bg-green-100 text-green-700" :
                          mark.term1 >= 50 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {mark.term1}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-lg ${
                          mark.term2 >= 75 ? "bg-green-100 text-green-700" :
                          mark.term2 >= 50 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {mark.term2}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-lg ${
                          mark.term3 >= 75 ? "bg-green-100 text-green-700" :
                          mark.term3 >= 50 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {mark.term3}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-lg ${
                          avg >= 75 ? "bg-blue-100 text-blue-700" :
                          avg >= 50 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {avg}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
