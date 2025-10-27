import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard - AFRIHACKBOX MSSP Platform",
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Monitoring Dashboard
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </div>
    </div>
  );
}
