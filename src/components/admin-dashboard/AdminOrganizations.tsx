"use client";

import React from "react";

interface Org {
  id: string;
  name: string;
  status: "active" | "suspended";
  users: number;
}

export function AdminOrganizations({ orgs }: { orgs: Org[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Organizations</h3>
        <span className="text-xs text-gray-500">Overview</span>
      </div>
      <div className="divide-y">
        {orgs.map((o) => (
          <div key={o.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{o.name}</div>
              <div className="text-xs text-gray-500">{o.users} users</div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                o.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
