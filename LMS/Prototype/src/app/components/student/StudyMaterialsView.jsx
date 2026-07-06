import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { FileText, Youtube, Download, Eye } from "lucide-react";

export function StudyMaterialsView() {
  const handleViewPDF = (material) => {
    alert(`Opening PDF: ${material.title}\n\nIn a real application, this would open the PDF file in a new tab or viewer.`);
  };

  const handleDownloadPDF = (material) => {
    alert(`Downloading: ${material.title}\n\nIn a real application, this would download the PDF file to your device.`);
  };

  const handleWatchVideo = (material) => {
    alert(`Opening YouTube video: ${material.title}\n\nIn a real application, this would open the YouTube video in a new tab or embedded player.`);
  };

  const materials = [
    { id: 1, title: "Algebra Fundamentals - Chapter 5", subject: "Mathematics", type: "PDF", uploadedBy: "Nimal Silva", date: "April 15, 2026" },
    { id: 2, title: "Chemical Reactions Explained", subject: "Science", type: "YouTube", uploadedBy: "Amara Dias", date: "April 14, 2026" },
    { id: 3, title: "English Grammar Rules", subject: "English", type: "PDF", uploadedBy: "Kamala Fernando", date: "April 12, 2026" },
    { id: 4, title: "Photosynthesis Process", subject: "Science", type: "YouTube", uploadedBy: "Amara Dias", date: "April 10, 2026" },
    { id: 5, title: "Trigonometry Notes", subject: "Mathematics", type: "PDF", uploadedBy: "Nimal Silva", date: "April 8, 2026" },
    { id: 6, title: "World War II Summary", subject: "History", type: "PDF", uploadedBy: "Sunil Bandara", date: "April 5, 2026" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="student" />
      <div className="flex-1">
        <TopNavbar userName="Kamal Perera" role="Student - Grade 10A" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Study Materials</h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Subject</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Uploaded By</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {material.type === "PDF" ? (
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <Youtube className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <span className="text-sm text-gray-900">{material.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {material.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        material.type === "PDF"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {material.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{material.uploadedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{material.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {material.type === "PDF" ? (
                          <>
                            <button onClick={() => handleViewPDF(material)} className="p-2 text-[#1e40af] hover:bg-blue-50 rounded-lg transition-colors" title="View PDF">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDownloadPDF(material)} className="p-2 text-[#fbbf24] hover:bg-yellow-50 rounded-lg transition-colors" title="Download PDF">
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => handleWatchVideo(material)} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs">
                            Watch
                          </button>
                        )}
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
