"use client";

import React from "react";

interface EventItem {
  id: string;
  message: string;
  level: "info" | "warning" | "error";
  ago: string;
}

export function AdminEvents({ events }: { events: EventItem[] }) {
  const color = (lvl: EventItem["level"]) =>
    lvl === "warning"
      ? "text-yellow-700"
      : lvl === "error"
      ? "text-red-700"
      : "text-gray-700";
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-semibold text-gray-900 mb-3">Events Stream</h3>
      <div className="space-y-2">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between text-sm border rounded-lg p-2"
          >
            <div className={`truncate ${color(e.level)}`}>{e.message}</div>
            <span className="text-xs text-gray-500">{e.ago} ago</span>
          </div>
        ))}
      </div>
    </div>
  );
}
