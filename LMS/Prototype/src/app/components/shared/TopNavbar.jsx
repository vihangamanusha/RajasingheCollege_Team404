import { Bell, LogOut, User } from "lucide-react";

export function TopNavbar({ userName, role }) {
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      window.location.href = '/';
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl text-gray-800">Welcome, {userName}</h1>
      <div className="flex items-center gap-4">
        <button onClick={() => alert('No new notifications')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#fbbf24] rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-[#1e40af] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
