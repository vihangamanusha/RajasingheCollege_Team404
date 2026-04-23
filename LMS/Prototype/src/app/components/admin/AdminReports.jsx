import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Download, FileText, TrendingUp, Users } from "lucide-react";

export function AdminReports() {
  const reports = [
    { id: 1, name: "Student Performance Report", type: "Academic", date: "April 20, 2026", students: 1245 },
    { id: 2, name: "Teacher Attendance Report", type: "HR", date: "April 18, 2026", students: 87 },
    { id: 3, name: "Class-wise Analysis", type: "Academic", date: "April 15, 2026", students: 42 },
    { id: 4, name: "Monthly Financial Report", type: "Finance", date: "April 10, 2026", students: 0 },
    { id: 5, name: "Exam Results Summary", type: "Academic", date: "April 5, 2026", students: 1245 },
  ];

  const handleGenerateReport = (reportName) => {
    alert(`Generating ${reportName}...\n\nThis will compile the latest data and create a downloadable report.`);
  };

  const handleDownloadReport = (reportName) => {
    alert(`Downloading ${reportName}...\n\nIn a real application, this would download the report as PDF or Excel.`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="admin" />
      <div className="flex-1">
        <TopNavbar userName="Admin User" role="Administrator" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-800">Reports &amp; Analytics</h2>
            <button onClick={() => handleGenerateReport('Custom Report')} className="flex items-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
              <FileText className="w-5 h-5" />
              Generate Custom Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">1,245</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-yellow-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">156</p>
              <p className="text-sm text-gray-600">Reports Generated</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">87.5%</p>
              <p className="text-sm text-gray-600">Average Attendance</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">82.3%</p>
              <p className="text-sm text-gray-600">Average Performance</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg text-gray-800">Available Reports</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Report Name</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Last Generated</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Records</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{report.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        report.type === "Academic" ? "bg-blue-100 text-blue-700" :
                        report.type === "HR" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.students > 0 ? report.students : '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleGenerateReport(report.name)} className="px-3 py-1 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors text-xs">
                          Generate
                        </button>
                        <button onClick={() => handleDownloadReport(report.name)} className="p-2 text-[#fbbf24] hover:bg-yellow-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
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
