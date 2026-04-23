import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Download, FileText, Users, BookOpen, TrendingUp } from "lucide-react";

export function TechnicalOfficerReports() {
  const systemReports = [
    { id: 1, name: "User Activity Report", type: "System", date: "April 20, 2026", records: 1332 },
    { id: 2, name: "Database Backup Report", type: "Technical", date: "April 19, 2026", records: 1 },
    { id: 3, name: "System Performance Report", type: "Technical", date: "April 18, 2026", records: 0 },
    { id: 4, name: "User Access Log", type: "Security", date: "April 15, 2026", records: 2456 },
    { id: 5, name: "Data Migration Report", type: "System", date: "April 10, 2026", records: 1245 },
  ];

  const handleGenerateReport = (reportName) => {
    alert(`Generating ${reportName}...\n\nCollecting latest system data and compiling report.`);
  };

  const handleDownloadReport = (reportName) => {
    alert(`Downloading ${reportName}...\n\nThis would download the report as PDF or CSV format.`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="technical-officer" />
      <div className="flex-1">
        <TopNavbar userName="Technical Officer" role="Technical Officer" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-800">System Reports</h2>
            <button onClick={() => handleGenerateReport('Custom System Report')} className="flex items-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
              <FileText className="w-5 h-5" />
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">1,332</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-yellow-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">42</p>
              <p className="text-sm text-gray-600">Active Classes</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">156</p>
              <p className="text-sm text-gray-600">Reports Generated</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">99.8%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg text-gray-800">System Reports</h3>
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
                {systemReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{report.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        report.type === "System" ? "bg-blue-100 text-blue-700" :
                        report.type === "Technical" ? "bg-yellow-100 text-yellow-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.records > 0 ? report.records.toLocaleString() : '-'}</td>
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
