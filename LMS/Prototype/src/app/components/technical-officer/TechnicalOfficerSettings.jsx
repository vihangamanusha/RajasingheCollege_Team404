import { Sidebar } from "../shared/Sidebar";
import { TopNavbar } from "../shared/TopNavbar";
import { Save, Database, Shield, Server, HardDrive } from "lucide-react";
import { useState } from "react";

export function TechnicalOfficerSettings() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const handleSaveSettings = () => {
    alert(`System settings saved successfully!\n\nAuto Backup: ${autoBackup ? 'Enabled' : 'Disabled'}\nMaintenance Mode: ${maintenanceMode ? 'Enabled' : 'Disabled'}\n2FA: ${twoFactorAuth ? 'Enabled' : 'Disabled'}`);
  };

  const handleBackupNow = () => {
    alert('Starting database backup...\n\nEstimated time: 5 minutes\nBackup location: /backups/2026-04-22/');
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear system cache? This may affect performance temporarily.')) {
      alert('System cache cleared successfully!');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar role="technical-officer" />
      <div className="flex-1">
        <TopNavbar userName="Technical Officer" role="Technical Officer" />
        <div className="p-6">
          <h2 className="text-2xl mb-6 text-gray-800">Technical Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Database Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">Auto Backup</p>
                    <p className="text-xs text-gray-500">Daily at 2:00 AM</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoBackup}
                      onChange={(e) => setAutoBackup(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
                <button onClick={handleBackupNow} className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  Backup Database Now
                </button>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Last Backup</p>
                  <p className="text-sm text-gray-900 mt-1">April 22, 2026 - 2:00 AM</p>
                  <p className="text-xs text-green-600 mt-1">✓ Successful</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Security Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Required for all admin users</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
                <button className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  View Security Logs
                </button>
                <button className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  Reset Failed Login Attempts
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">System Maintenance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Restrict system access</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e40af] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e40af]"></div>
                  </label>
                </div>
                <button onClick={handleClearCache} className="w-full px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-left">
                  Clear System Cache
                </button>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">System Status</p>
                  <p className="text-sm text-green-700 mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    All services operational
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <HardDrive className="w-6 h-6 text-[#1e40af]" />
                <h3 className="text-lg text-gray-800">Storage & Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="text-sm text-gray-900">12.4 GB / 50 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1e40af] h-2 rounded-full" style={{ width: '24.8%' }}></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Server Load</p>
                  <p className="text-sm text-gray-900 mt-1">CPU: 35% | RAM: 62%</p>
                </div>
                <button className="w-full px-4 py-3 bg-blue-50 text-[#1e40af] rounded-lg hover:bg-blue-100 transition-colors text-left">
                  View Performance Metrics
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
