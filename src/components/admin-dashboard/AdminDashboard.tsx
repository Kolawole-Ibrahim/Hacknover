"use client";

import React from "react";
import { AdminSummary } from "./AdminSummary";
import { AdminAlerts } from "./AdminAlerts";
import { AdminOrganizations } from "./AdminOrganizations";
import { AdminModules } from "./AdminModules";
import { AdminEvents } from "./AdminEvents";

export function AdminDashboard() {
  const orgs = [
    { id: "org_1", name: "Acme Ltd.", status: "active", users: 24 },
    { id: "org_2", name: "Blue Retail", status: "suspended", users: 11 },
    { id: "org_3", name: "Kora Foods", status: "active", users: 7 },
  ];

  const modules = [
    { name: "Endpoint", active: 3, issues: 1 },
    { name: "Email", active: 3, issues: 0 },
    { name: "Web", active: 2, issues: 2 },
    { name: "Backup", active: 2, issues: 0 },
  ];

  const alerts = [
    {
      id: "a1",
      title: "Ransomware blocked",
      severity: "critical",
      org: "Acme Ltd.",
      ago: "5m",
    },
    {
      id: "a2",
      title: "Spike in phishing",
      severity: "warning",
      org: "Blue Retail",
      ago: "19m",
    },
  ];

  const events = [
    {
      id: "e1",
      message: "Endpoint scan finished (Acme)",
      level: "info",
      ago: "1m",
    },
    {
      id: "e2",
      message: "New device registered (Kora)",
      level: "info",
      ago: "3m",
    },
    {
      id: "e3",
      message: "Firewall rule updated (Blue)",
      level: "warning",
      ago: "7m",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminSummary
        totalOrgs={orgs.length}
        totalUsers={42}
        totalAlerts={alerts.length}
      />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminAlerts alerts={alerts} />
          <AdminModules modules={modules} />
        </div>
        <div className="space-y-6">
          <AdminOrganizations orgs={orgs} />
          <AdminEvents events={events} />
        </div>
      </div>
    </div>
  );
}
