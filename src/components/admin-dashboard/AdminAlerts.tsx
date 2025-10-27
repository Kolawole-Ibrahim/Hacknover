"use client";

import React from "react";

interface AlertItem {
  id: string;
  title: string;
  severity: "info" | "warning" | "error" | "critical";
  org: string;
  ago: string;
}

export function AdminAlerts({ alerts }: { alerts: AlertItem[] }) {
  const color = (s: AlertItem["severity"]) =>
    s === "critical"
      ? "bg-red-100 text-red-700"
      : s === "warning"
      ? "bg-yellow-100 text-yellow-700"
      : s === "error"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700";
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Active Alerts</h3>
        <span className="text-xs text-gray-500">Last 24h</span>
      </div>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {a.title}
              </div>
              <div className="text-xs text-gray-500">
                {a.org} • {a.ago} ago
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${color(
                a.severity
              )}`}
            >
              {a.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
