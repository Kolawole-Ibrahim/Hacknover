import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard - AFRIHACKBOX MSSP Platform',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">MSSP Dashboard</h1>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Acme Corporation</span>
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
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="text-green-600 text-2xl">💻</div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm">22 Online</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Security Events</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="text-orange-600 text-2xl">⚠️</div>
            </div>
            <div className="mt-2">
              <span className="text-orange-600 text-sm">1 Critical</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Compliance Score</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
              <div className="text-blue-600 text-2xl">📊</div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm">NDPR Ready</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Last Backup</p>
                <p className="text-2xl font-bold text-gray-900">2h</p>
              </div>
              <div className="text-purple-600 text-2xl">💾</div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm">Successful</span>
            </div>
          </div>
        </div>

        {/* Security Modules Status */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Endpoint Protection</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600">24 devices protected</p>
              <p className="text-xs text-gray-500 mt-1">Last scan: 5 min ago</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Email Security</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600">156 emails scanned</p>
              <p className="text-xs text-gray-500 mt-1">Last scan: 2 min ago</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Web Security</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600">1,234 requests filtered</p>
              <p className="text-xs text-gray-500 mt-1">Last scan: 1 min ago</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Backup & Recovery</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600">2.4 GB backed up</p>
              <p className="text-xs text-gray-500 mt-1">Last backup: 2h ago</p>
            </div>
          </div>
        </div>

        {/* Recent Security Events */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Security Events</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Malware Detected</p>
                  <p className="text-sm text-gray-600">Endpoint: LAPTOP-001</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">2 hours ago</p>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  Critical
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Phishing Email Blocked</p>
                  <p className="text-sm text-gray-600">From: suspicious@example.com</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">4 hours ago</p>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                  High
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Suspicious Website Blocked</p>
                  <p className="text-sm text-gray-600">malware-site.com</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">6 hours ago</p>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
