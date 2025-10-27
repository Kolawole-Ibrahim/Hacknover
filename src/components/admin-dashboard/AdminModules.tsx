"use client";

import React from "react";

interface ModuleStatus {
  name: string;
  active: number;
  issues: number;
}

export function AdminModules({ modules }: { modules: ModuleStatus[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-semibold text-gray-900 mb-3">Modules Overview</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m) => (
          <div key={m.name} className="border rounded-lg p-4">
            <div className="text-sm font-medium text-gray-900">{m.name}</div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
              <span>
                Active: <strong>{m.active}</strong>
              </span>
              <span>
                Issues:{" "}
                <strong
                  className={m.issues ? "text-red-600" : "text-green-600"}
                >
                  {m.issues}
                </strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
