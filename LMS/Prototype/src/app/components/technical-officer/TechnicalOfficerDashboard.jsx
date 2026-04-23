import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Users, BookOpen, BarChart3, Globe, TrendingUp, Activity } from "lucide-react";

export function TechnicalOfficerDashboard() {
  const stats = [
    { label: "Total Users", value: "1,332", icon: Users },
    { label: "Active Classes", value: "42", icon: BookOpen },
    { label: "Reports Generated", value: "156", icon: BarChart3 },
    { label: "Website Updates", value: "24", icon: Globe },
  ];

  const recentUpdates = [
    { title: "User permissions updated", date: "April 20, 2026" },
    { title: "New class added - Grade 12C", date: "April 19, 2026" },
    { title: "Monthly report generated", date: "April 18, 2026" },
    { title: "Website content updated", date: "April 17, 2026" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="technical-officer" />
      <div className="flex-1">
        <TopNavbar userName="Technical Officer" role="Technical Officer" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Technical Officer Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-[#1e40af]" />
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">System Management</h3>
              <div className="space-y-3">
                <button onClick={() => window.location.href = '/users'} className="w-full flex items-center gap-3 px-4 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </button>
                <button onClick={() => window.location.href = '/classes'} className="w-full flex items-center gap-3 px-4 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                  <BookOpen className="w-5 h-5" />
                  <span>Manage Classes</span>
                </button>
                <button onClick={() => alert('Report generation feature coming soon!')} className="w-full flex items-center gap-3 px-4 py-3 bg-[#fbbf24] text-[#1e40af] rounded-lg hover:bg-[#f59e0b] transition-colors">
                  <BarChart3 className="w-5 h-5" />
                  <span>Generate Reports</span>
                </button>
                <button onClick={() => alert('Website content management feature coming soon!')} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span>Update Website Content</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg mb-4 text-gray-800">Recent Updates</h3>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <Activity className="w-5 h-5 text-[#1e40af] mt-1" />
                    <div>
                      <p className="text-sm text-gray-900">{update.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
