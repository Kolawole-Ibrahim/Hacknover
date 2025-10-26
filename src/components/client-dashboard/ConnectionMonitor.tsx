"use client";

import React, { useEffect, useState } from "react";

interface Connection {
  id: string;
  device: string;
  destination: string;
  status: "established" | "blocked" | "pending";
}

const seeds: Connection[] = [
  { id: "1", device: "Laptop-01", destination: "8.8.8.8:443", status: "established" },
  { id: "2", device: "Phone-Emeka", destination: "api.service.com:443", status: "established" },
  { id: "3", device: "Tablet-Admin", destination: "unknown.cn:80", status: "blocked" },
];

export function ConnectionMonitor() {
  const [items, setItems] = useState<Connection[]>(seeds);

  useEffect(() => {
    const t = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        if (Math.random() < 0.4) {
          next.unshift({
            id: String(Date.now()),
            device: Math.random() < 0.5 ? "Laptop-01" : "Phone-Sopefoluwa",
            destination: Math.random() < 0.5 ? "cdn.global.net:443" : "suspicious.ru:8080",
            status: Math.random() < 0.8 ? "established" : "blocked",
          });
          if (next.length > 6) next.pop();
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const badge = (s: Connection["status"]) =>
    s === "established"
      ? "bg-green-100 text-green-700"
      : s === "blocked"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <h3 className="font-semibold text-gray-900 mb-3">Real-time Connection Monitor</h3>
      <div className="space-y-2">
        {items.map((c) => (
          <div key={c.id} className="flex items-center justify-between text-sm border rounded-lg p-2">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-800">{c.device}</span>
              <span className="text-gray-500">→</span>
              <span className="text-gray-700">{c.destination}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full ${badge(c.status)}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


