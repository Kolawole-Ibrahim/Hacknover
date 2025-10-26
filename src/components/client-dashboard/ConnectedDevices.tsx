"use client";

import React from "react";

type Rating = "A" | "B" | "C" | "D";

interface ConnectedDevice {
  name: string;
  ip: string;
  rating: Rating;
  blocked?: boolean;
}

interface ConnectedDevicesProps {
  devices: ConnectedDevice[];
}

function badgeForRating(r: Rating) {
  switch (r) {
    case "A":
      return "bg-green-100 text-green-700";
    case "B":
      return "bg-blue-100 text-blue-700";
    case "C":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-red-100 text-red-700";
  }
}

export function ConnectedDevices({ devices }: ConnectedDevicesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Connected Devices</h3>
        <span className="text-xs text-gray-500">
          Security ratings & controls
        </span>
      </div>
      <div className="divide-y">
        {devices.map((d) => (
          <div key={d.ip} className="py-3 flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {d.name}
              </div>
              <div className="text-xs text-gray-500">{d.ip}</div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${badgeForRating(
                  d.rating
                )}`}
              >
                Rating {d.rating}
              </span>
              <button
                className={`px-3 py-1 rounded text-sm border ${
                  d.blocked
                    ? "bg-red-600 text-white border-red-600"
                    : "text-red-600 border-red-300 hover:bg-red-50"
                }`}
              >
                {d.blocked ? "Blocked" : "Block"}
              </button>
              <button className="px-3 py-1 rounded text-sm border text-gray-700 border-gray-300 hover:bg-gray-50">
                Set limit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
