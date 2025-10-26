"use client";

import React from "react";

interface DeviceTraffic {
  name: string;
  ip: string;
  trafficGb: number;
}

interface TopDevicesProps {
  devices: DeviceTraffic[];
}

export function TopDevices({ devices }: TopDevicesProps) {
  const sorted = [...devices].sort((a, b) => b.trafficGb - a.trafficGb).slice(0, 5);
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <h3 className="font-semibold text-gray-900 mb-3">Top Devices by Traffic</h3>
      <div className="space-y-3">
        {sorted.map((d) => (
          <div key={d.ip} className="flex items-center">
            <div className="w-40 text-sm text-gray-700 truncate">{d.name}</div>
            <div className="ml-2 text-xs text-gray-500">{d.ip}</div>
            <div className="flex-1 ml-3 bg-gray-100 rounded h-2">
              <div className="bg-blue-600 h-2 rounded" style={{ width: `${Math.min(100, (d.trafficGb / (sorted[0]?.trafficGb || 1)) * 100)}%` }} />
            </div>
            <div className="ml-3 w-16 text-right text-sm text-gray-700">{d.trafficGb.toFixed(1)} GB</div>
          </div>
        ))}
      </div>
    </div>
  );
}


