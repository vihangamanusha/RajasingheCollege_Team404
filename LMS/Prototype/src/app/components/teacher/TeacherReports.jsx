import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Download, BarChart3, TrendingUp, Users } from "lucide-react";

export function TeacherReports() {
  const reports = [
    { id: 1, title: "Grade 10A - Term 1 Results", class: "Grade 10A", date: "April 18, 2026", average: 78.5 },
    { id: 2, title: "Grade 10B - Term 1 Results", class: "Grade 10B", date: "April 18, 2026", average: 75.2 },
    { id: 3, title: "Grade 11A - Term 1 Results", class: "Grade 11A", date: "April 15, 2026", average: 81.3 },
    { id: 4, title: "Monthly Attendance Report", class: "All Classes", date: "April 10, 2026", average: 94.2 },
  ];

  const classPerformance = [
    { class: "Grade 10A", students: 42, average: 78.5, passRate: 92.8 },
    { class: "Grade 10B", students: 38, average: 75.2, passRate: 89.5 },
    { class: "Grade 11A", students: 40, average: 81.3, passRate: 95.0 },
  ];

  const handleDownloadReport = (title) => {
    alert(`Downloading: ${title}\n\nThis would generate and download a detailed PDF report.`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="teacher" />
      <div className="flex-1">
        <TopNavbar userName="Nimal Silva" role="Teacher" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Reports &amp; Analytics</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl text-gray-900 mb-1">120</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-yellow-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl text-gray-900 mb-1">78.3%</p>
              <p className="text-sm text-gray-600">Average Performance</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-3xl text-gray-900 mb-1">92.4%</p>
              <p className="text-sm text-gray-600">Pass Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg mb-4 text-gray-800">Class Performance Overview</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-gray-700">Class</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-700">Students</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-700">Average Mark</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-700">Pass Rate</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {classPerformance.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.class}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.students}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg ${
                          item.average >= 80 ? 'bg-green-100 text-green-700' :
                          item.average >= 70 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.average}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.passRate}%</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1e40af] h-2 rounded-full"
                            style={{ width: `${item.passRate}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg text-gray-800">Available Reports</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Report Title</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Class</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Average</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{report.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.class}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.average}%</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDownloadReport(report.title)} className="flex items-center gap-2 px-3 py-1 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors text-xs">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
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
