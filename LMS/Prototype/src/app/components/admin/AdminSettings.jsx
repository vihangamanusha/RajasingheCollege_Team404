import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Save, School, Calendar, Bell, Shield } from "lucide-react";
import { useState } from "react";

export function AdminSettings() {
  const [schoolName, setSchoolName] = useState("Rajasinha Central College");
  const [academicYear, setAcademicYear] = useState("2026");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveSettings = () => {
    alert(`Settings saved successfully!\n\nSchool Name: ${schoolName}\nAcademic Year: ${academicYear}\nEmail Notifications: ${emailNotifications ? 'Enabled' : 'Disabled'}\nSMS Notifications: ${smsNotifications ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="admin" />
      <div className="flex-1">
        <TopNavbar userName="Admin User" role="Administrator" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">System Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <School className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">School Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">School Name</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="Main Street, Colombo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    defaultValue="+94 11 234 5678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="info@rajasinha.lk"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Academic Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Number of Terms</label>
                  <select
                    defaultValue="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  >
                    <option value="2">2 Terms</option>
                    <option value="3">3 Terms</option>
                    <option value="4">4 Terms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Grading System</label>
                  <select
                    defaultValue="letter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                  >
                    <option value="letter">Letter Grades (A, B, C...)</option>
                    <option value="percentage">Percentage</option>
                    <option value="gpa">GPA (4.0 scale)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Notification Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
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
                    <p className="text-sm text-gray-900">SMS Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Security Settings</h3>
              </div>
              <div className="space-y-4">
                <button className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  Change Admin Password
                </button>
                <button className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  Manage User Permissions
                </button>
                <button className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  Backup Database
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-md">
              <Save className="w-5 h-5" />
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
