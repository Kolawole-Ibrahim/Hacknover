"use client";

import React from "react";

interface ClientSummaryProps {
  protectedDevices: number;
  threatsBlockedToday: number;
  lastIncidentAgo: string;
  systemHealth: "optimal" | "degraded" | "critical";
}

export function ClientSummary({
  protectedDevices,
  threatsBlockedToday,
  lastIncidentAgo,
  systemHealth,
}: ClientSummaryProps) {
  const healthColor =
    systemHealth === "optimal"
      ? "text-green-700 bg-green-100"
      : systemHealth === "degraded"
      ? "text-yellow-700 bg-yellow-100"
      : "text-red-700 bg-red-100";

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-600 text-sm">Protected Devices</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{protectedDevices}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-600 text-sm">Threats Blocked Today</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{threatsBlockedToday}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-600 text-sm">Last Security Incident</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{lastIncidentAgo}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-600 text-sm">System Health</p>
        <span className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${healthColor}`}>
          {systemHealth}
        </span>
      </div>
    </div>
  );
}


