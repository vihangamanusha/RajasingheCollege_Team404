import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Upload, FileText, Youtube } from "lucide-react";
import { useState } from "react";

export function UploadStudyMaterials() {
  const [materialType, setMaterialType] = useState("pdf");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title || !subject || !grade) {
      alert('Please fill in all required fields (Title, Subject, Grade)');
      return;
    }
    if (materialType === "youtube" && !youtubeLink) {
      alert('Please enter a YouTube link');
      return;
    }
    alert(`Study material uploaded successfully!\nTitle: ${title}\nSubject: ${subject}\nGrade: ${grade}\nType: ${materialType === "pdf" ? "PDF File" : "YouTube Video"}`);
    setTitle("");
    setSubject("");
    setGrade("");
    setYoutubeLink("");
    setDescription("");
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="teacher" />
      <div className="flex-1">
        <TopNavbar userName="Nimal Silva" role="Teacher" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Upload Study Materials</h2>

          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Material Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter material title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Subject</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]">
                    <option value="">Choose Subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="sinhala">Sinhala</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Grade</label>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]">
                    <option value="">Choose Grade</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Material Type</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setMaterialType("pdf")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                      materialType === "pdf"
                        ? "border-[#1e40af] bg-blue-50 text-[#1e40af]"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span>PDF File</span>
                  </button>
                  <button
                    onClick={() => setMaterialType("youtube")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                      materialType === "youtube"
                        ? "border-[#1e40af] bg-blue-50 text-[#1e40af]"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <Youtube className="w-5 h-5" />
                    <span>YouTube Link</span>
                  </button>
                </div>
              </div>

              {materialType === "pdf" ? (
                <div onClick={() => alert('File picker would open here. You can select a PDF file to upload.')} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1e40af] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload PDF file</p>
                  <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">YouTube Link</label>
                  <input
                    type="url"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a brief description of the material"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                ></textarea>
              </div>

              <button onClick={handleSubmit} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
                <Upload className="w-5 h-5" />
                Upload Material
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
