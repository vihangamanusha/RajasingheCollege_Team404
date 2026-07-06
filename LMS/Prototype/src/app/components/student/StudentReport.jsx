import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Download, Award, TrendingUp } from "lucide-react";

export function StudentReport() {
  const handleDownloadPDF = () => {
    alert('Downloading report as PDF...\n\nStudent: Kamal Perera\nGrade: 10A\nAverage: 84.2%\nOverall Grade: A\n\nIn a real application, this would generate and download a formatted PDF report.');
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="student" />
      <div className="flex-1">
        <TopNavbar userName="Kamal Perera" role="Student - Grade 10A" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-800">My Report</h2>
            <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl text-gray-900 mb-1">Kamal Perera</h3>
                <p className="text-gray-600">Grade 10A - English Medium</p>
                <p className="text-sm text-gray-500 mt-1">Academic Year 2026</p>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10 text-[#fbbf24]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Average Marks</p>
                <p className="text-4xl text-[#1e40af] mb-1">84.2%</p>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+3.5%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Overall Grade</p>
                <p className="text-4xl text-[#fbbf24] mb-1">A</p>
                <p className="text-sm text-gray-600">Excellent</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Class Rank</p>
                <p className="text-4xl text-green-600 mb-1">3rd</p>
                <p className="text-sm text-gray-600">Out of 42</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg text-gray-800 mb-4">Subject Performance</h4>
              <div className="space-y-3">
                {[
                  { subject: "ICT", percentage: 92 },
                  { subject: "Sinhala", percentage: 90 },
                  { subject: "Mathematics", percentage: 85 },
                  { subject: "English", percentage: 83.7 },
                  { subject: "Geography", percentage: 84 },
                  { subject: "History", percentage: 78 },
                ].map((item) => (
                  <div key={item.subject}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{item.subject}</span>
                      <span className="text-sm text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#1e40af] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg text-gray-800 mb-2">Teacher's Comment</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Kamal has shown excellent academic performance throughout the year. He demonstrates
                strong understanding in Mathematics and ICT subjects. Continue to maintain this
                performance and focus on improving History and Science subjects. Well done!
              </p>
              <p className="text-sm text-gray-600 mt-3">- Class Teacher, Nimal Silva</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
