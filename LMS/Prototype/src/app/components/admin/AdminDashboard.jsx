import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Users, GraduationCap, BookOpen, FileText, UserPlus, UserCog, Settings } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "1,245", icon: Users, color: "bg-blue-500" },
    { label: "Total Teachers", value: "87", icon: GraduationCap, color: "bg-yellow-500" },
    { label: "Total Classes", value: "42", icon: BookOpen, color: "bg-green-500" },
    { label: "Total Subjects", value: "15", icon: FileText, color: "bg-purple-500" },
  ];

  const recentActivities = [
    { action: "New student enrolled", name: "Kamal Perera", time: "2 hours ago" },
    { action: "Teacher assigned to class", name: "Nimal Silva - Grade 10A", time: "3 hours ago" },
    { action: "Marks uploaded", name: "Mathematics - Grade 9B", time: "5 hours ago" },
    { action: "New study material added", name: "Science - Grade 11", time: "1 day ago" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="admin" />
      <div className="flex-1">
        <TopNavbar userName="Admin User" role="Administrator" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-[#1e40af] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.name}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => window.location.href = '/users'} className="w-full flex items-center gap-3 px-4 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                  <UserPlus className="w-5 h-5" />
                  <span>Add Student</span>
                </button>
                <button onClick={() => window.location.href = '/users'} className="w-full flex items-center gap-3 px-4 py-3 bg-[#fbbf24] text-[#1e40af] rounded-lg hover:bg-[#f59e0b] transition-colors">
                  <UserCog className="w-5 h-5" />
                  <span>Add Teacher</span>
                </button>
                <button onClick={() => window.location.href = '/classes'} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Manage Classes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
