"use client";

import React from "react";

interface RecentThreatsProps {
  malwareBlocked: number;
  phishingAttempts: number;
  suspiciousLogins: number;
  intrusionAttempts: number;
}

export function RecentThreats({
  malwareBlocked,
  phishingAttempts,
  suspiciousLogins,
  intrusionAttempts,
}: RecentThreatsProps) {
  const items = [
    {
      label: "Malware Blocked",
      value: malwareBlocked,
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Phishing Attempts",
      value: phishingAttempts,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Suspicious logins",
      value: suspiciousLogins,
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Intrusion Attempt",
      value: intrusionAttempts,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Recent Threats (24h)</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div key={i.label} className="border rounded-lg p-4">
            <div className="text-sm text-gray-600">{i.label}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">{i.value}</div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${i.color}`}>
                24h
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
