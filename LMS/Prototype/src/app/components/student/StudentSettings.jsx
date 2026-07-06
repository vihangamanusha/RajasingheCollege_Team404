import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Save, User, Bell, Lock, Palette } from "lucide-react";
import { useState } from "react";

export function StudentSettings() {
  const [fullName, setFullName] = useState("Kamal Perera");
  const [email, setEmail] = useState("kamal@school.lk");
  const [phone, setPhone] = useState("+94 77 123 4567");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marksNotifications, setMarksNotifications] = useState(true);
  const [materialsNotifications, setMaterialsNotifications] = useState(false);

  const handleSaveSettings = () => {
    alert(`Settings saved successfully!\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}`);
  };

  const handleChangePassword = () => {
    alert('Change Password\n\nYou would be prompted to enter your current password and new password.');
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="student" />
      <div className="flex-1">
        <TopNavbar userName="Kamal Perera" role="Student - Grade 10A" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Profile Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Student ID</p>
                      <p className="text-gray-900">STU2026001</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Grade</p>
                      <p className="text-gray-900">Grade 10A</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Medium</p>
                      <p className="text-gray-900">English</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Academic Year</p>
                      <p className="text-gray-900">2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive general updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">New Marks Available</p>
                    <p className="text-xs text-gray-500">Notify when marks are uploaded</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marksNotifications}
                      onChange={(e) => setMarksNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">New Study Materials</p>
                    <p className="text-xs text-gray-500">Notify when materials are added</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={materialsNotifications}
                      onChange={(e) => setMaterialsNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Security</h3>
              </div>
              <div className="space-y-3">
                <button onClick={handleChangePassword} className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  Change Password
                </button>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="text-sm text-gray-900 mt-1">April 22, 2026 at 8:15 AM</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Appearance</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Theme</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]">
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]">
                    <option value="en">English</option>
                    <option value="si">Sinhala</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
