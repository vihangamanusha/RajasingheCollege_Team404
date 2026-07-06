import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { FileText, BarChart3, FolderOpen, Award } from "lucide-react";

export function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="student" />
      <div className="flex-1">
        <TopNavbar userName="Kamal Perera" role="Student - Grade 10A" />
        <div className="p-6">
          <div className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-xl p-8 mb-8 text-white">
            <h2 className="text-2xl mb-2">Welcome back, Kamal!</h2>
            <p className="text-blue-100">Grade 10A - Rajasinha Central College</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div onClick={() => window.location.href = '/student/marks'} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#1e40af]" />
              </div>
              <h3 className="text-lg mb-2 text-gray-800">View My Marks</h3>
              <p className="text-sm text-gray-600">Check your exam and assignment marks</p>
            </div>

            <div onClick={() => window.location.href = '/student/report'} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <h3 className="text-lg mb-2 text-gray-800">Download Report</h3>
              <p className="text-sm text-gray-600">Download your progress report as PDF</p>
            </div>

            <div onClick={() => window.location.href = '/student/materials'} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg mb-2 text-gray-800">Study Materials</h3>
              <p className="text-sm text-gray-600">Access notes, PDFs and video lessons</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">Recent Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">Mathematics - Term 1</p>
                    <p className="text-xs text-gray-500">Grade 10A</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm text-gray-900">85/100</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">Science - Term 1</p>
                    <p className="text-xs text-gray-500">Grade 10A</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm text-gray-900">78/100</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-900">English - Term 1</p>
                    <p className="text-xs text-gray-500">Grade 10A</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm text-gray-900">82/100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-2xl text-[#1e40af] mb-1">81.7%</p>
                  <p className="text-xs text-gray-600">Average Grade</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-2xl text-[#fbbf24] mb-1">A</p>
                  <p className="text-xs text-gray-600">Overall Grade</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-2xl text-green-600 mb-1">12</p>
                  <p className="text-xs text-gray-600">Subjects</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-2xl text-purple-600 mb-1">3</p>
                  <p className="text-xs text-gray-600">Terms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
