import { Metadata } from "next";
import { ClientDashboard } from "@/components/client-dashboard/ClientDashboard";

export const metadata: Metadata = {
  title: "Dashboard - AFRIHACKBOX MSSP Platform",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Client Dashboard
              </h1>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Active
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <ClientDashboard />
      </div>
    </div>
  );
}
