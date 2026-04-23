import { Home, Users, BookOpen, FileText, BarChart3, Settings, GraduationCap, Upload, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router";

export function Sidebar({ role }) {
  const location = useLocation();

  const menuItems = {
    admin: [
      { icon: Home, label: "Dashboard", path: "/admin" },
      { icon: Users, label: "Students", path: "/users?role=student" },
      { icon: GraduationCap, label: "Teachers", path: "/users?role=teacher" },
      { icon: BookOpen, label: "Classes", path: "/classes" },
      { icon: FileText, label: "Reports", path: "/admin/reports" },
      { icon: Settings, label: "Settings", path: "/admin/settings" },
    ],
    "technical-officer": [
      { icon: Home, label: "Dashboard", path: "/technical-officer" },
      { icon: Users, label: "Manage Users", path: "/users" },
      { icon: BookOpen, label: "Manage Classes", path: "/classes" },
      { icon: BarChart3, label: "Reports", path: "/technical-officer/reports" },
      { icon: Settings, label: "Settings", path: "/technical-officer/settings" },
    ],
    teacher: [
      { icon: Home, label: "Dashboard", path: "/teacher" },
      { icon: BookOpen, label: "My Subjects", path: "/teacher/subjects" },
      { icon: GraduationCap, label: "My Classes", path: "/teacher/classes" },
      { icon: Upload, label: "Upload Marks", path: "/upload-marks" },
      { icon: FolderOpen, label: "Materials", path: "/upload-materials" },
      { icon: BarChart3, label: "Reports", path: "/teacher/reports" },
    ],
    student: [
      { icon: Home, label: "Dashboard", path: "/student" },
      { icon: FileText, label: "My Marks", path: "/student/marks" },
      { icon: BarChart3, label: "My Report", path: "/student/report" },
      { icon: FolderOpen, label: "Study Materials", path: "/student/materials" },
      { icon: Settings, label: "Settings", path: "/student/settings" },
    ],
  };

  const items = menuItems[role];

  return (
    <div className="w-64 bg-[#1e40af] min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#1e3a8a]">
        <div className="w-16 h-16 bg-[#fbbf24] rounded-lg flex items-center justify-center mb-3 overflow-hidden">
          {/* Replace 'school-logo.png' with your actual logo filename */}
          <img
            src="/src/assets/school-logo.png"
            alt="School Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to icon if logo not found
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <GraduationCap className="w-10 h-10 text-[#1e40af] hidden" />
        </div>
        <h2 className="text-white">Rajasinghe LMS</h2>
        <p className="text-sm text-blue-200 mt-1">Rajasinha Central College</p>
      </div>
      <nav className="flex-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-[#fbbf24] text-[#1e40af]"
                  : "text-white hover:bg-[#1e3a8a]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
