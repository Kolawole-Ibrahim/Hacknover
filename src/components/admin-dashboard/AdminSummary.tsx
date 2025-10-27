"use client";

import React from "react";

export function AdminSummary({
  totalOrgs,
  totalUsers,
  totalAlerts,
}: {
  totalOrgs: number;
  totalUsers: number;
  totalAlerts: number;
}) {
  const Card = ({
    title,
    value,
  }: {
    title: string;
    value: string | number;
  }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="text-gray-600 text-sm">{title}</div>
      <div className="text-3xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card title="Organizations" value={totalOrgs} />
      <Card title="Users" value={totalUsers} />
      <Card title="Open Alerts" value={totalAlerts} />
    </div>
  );
}
