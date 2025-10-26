"use client";

import React from "react";

interface UsageItem {
  name: string;
  usageGb: number;
}

interface UsageByDeviceProps {
  usage: UsageItem[];
}

export function UsageByDevice({ usage }: UsageByDeviceProps) {
  const max = Math.max(1, ...usage.map((u) => u.usageGb));
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <h3 className="font-semibold text-gray-900 mb-3">Data Usage by Device</h3>
      <div className="space-y-3">
        {usage.map((u) => (
          <div key={u.name} className="flex items-center">
            <div className="w-44 text-sm text-gray-700 truncate">{u.name}</div>
            <div className="flex-1 ml-3 bg-gray-100 rounded h-2">
              <div className="bg-indigo-600 h-2 rounded" style={{ width: `${(u.usageGb / max) * 100}%` }} />
            </div>
            <div className="ml-3 w-16 text-right text-sm text-gray-700">{u.usageGb.toFixed(1)} GB</div>
          </div>
        ))}
      </div>
    </div>
  );
}


