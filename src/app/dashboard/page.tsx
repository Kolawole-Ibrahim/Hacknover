import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - AFRIHACKBOX MSSP Platform",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                MSSP Dashboard
              </h1>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Organization Name</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Security Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Devices</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="text-green-600 text-2xl">💻</div>
            </div>
            <div className="mt-2">
              <span className="text-gray-400 text-sm">-- Online</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Security Events</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="text-orange-600 text-2xl">⚠️</div>
            </div>
            <div className="mt-2">
              <span className="text-gray-400 text-sm">-- Critical</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Compliance Score</p>
                <p className="text-2xl font-bold text-gray-900">--%</p>
              </div>
              <div className="text-blue-600 text-2xl">📊</div>
            </div>
            <div className="mt-2">
              <span className="text-gray-400 text-sm">-- Ready</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Last Backup</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <div className="text-purple-600 text-2xl">💾</div>
            </div>
            <div className="mt-2">
              <span className="text-gray-400 text-sm">-- Status</span>
            </div>
          </div>
        </div>

        {/* Security Modules Status */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Security Modules
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  Endpoint Protection
                </h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  Inactive
                </span>
              </div>
              <p className="text-sm text-gray-600">-- devices protected</p>
              <p className="text-xs text-gray-500 mt-1">Last scan: --</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Email Security</h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  Inactive
                </span>
              </div>
              <p className="text-sm text-gray-600">-- emails scanned</p>
              <p className="text-xs text-gray-500 mt-1">Last scan: --</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Web Security</h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  Inactive
                </span>
              </div>
              <p className="text-sm text-gray-600">-- requests filtered</p>
              <p className="text-xs text-gray-500 mt-1">Last scan: --</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Backup & Recovery</h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  Inactive
                </span>
              </div>
              <p className="text-sm text-gray-600">-- GB backed up</p>
              <p className="text-xs text-gray-500 mt-1">Last backup: --</p>
            </div>
          </div>
        </div>

        {/* Recent Security Events */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Security Events
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">No Events</p>
                  <p className="text-sm text-gray-600">
                    No security events detected
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">--</p>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  --
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">No Events</p>
                  <p className="text-sm text-gray-600">
                    No security events detected
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">--</p>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  --
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">No Events</p>
                  <p className="text-sm text-gray-600">
                    No security events detected
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">--</p>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  --
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
