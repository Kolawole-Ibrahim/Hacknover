"use client";

import React from "react";
import { ClientSummary } from "./ClientSummary";
import { LiveBandwidth } from "./LiveBandwidth";
import { TopDevices } from "./TopDevices";
import { ConnectionMonitor } from "./ConnectionMonitor";
import { UsageByDevice } from "./UsageByDevice";
import { RecentThreats } from "./RecentThreats";
import { ConnectedDevices } from "./ConnectedDevices";

export function ClientDashboard() {
  // Mock data provided by user
  const protectedDevices = 1;
  const threatsBlockedToday = 50;
  const lastIncidentAgo = "4 hours ago";
  const systemHealth = "optimal" as const;

  const recent = {
    malwareBlocked: 5,
    phishingAttempts: 2,
    suspiciousLogins: 3,
    intrusionAttempts: 10,
  };

  // Placeholder lists to visualize UI components
  const topDevices = [
    { name: "Laptop-01", ip: "192.168.1.12", trafficGb: 8.5 },
    { name: "Phone-Emeka", ip: "192.168.1.33", trafficGb: 5.2 },
    { name: "Tablet-Admin", ip: "192.168.1.44", trafficGb: 3.9 },
  ];

  const usage = [
    { name: "Laptop-01", usageGb: 12.3 },
    { name: "Phone-Emeka", usageGb: 7.8 },
    { name: "Tablet-Admin", usageGb: 4.1 },
  ];

  const connected = [
    { name: "Laptop-01", ip: "192.168.1.12", rating: "A" as const },
    { name: "Phone-Emeka", ip: "192.168.1.33", rating: "B" as const },
    { name: "Tablet-Admin", ip: "192.168.1.44", rating: "B" as const },
  ];

  return (
    <div>
      <ClientSummary
        protectedDevices={protectedDevices}
        threatsBlockedToday={threatsBlockedToday}
        lastIncidentAgo={lastIncidentAgo}
        systemHealth={systemHealth}
      />

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <LiveBandwidth />
        <TopDevices devices={topDevices} />
        <ConnectionMonitor />
        <UsageByDevice usage={usage} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentThreats {...recent} />
        <ConnectedDevices devices={connected} />
      </div>
    </div>
  );
}
