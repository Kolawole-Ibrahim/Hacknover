"use client";

import React from "react";
import type { SecurityMetrics } from "@/types/security";

interface StatsCardsProps {
  metrics: SecurityMetrics | null;
}

export function StatsCards({ metrics }: StatsCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Devices</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics?.devicesProtected ?? "--"}
            </p>
          </div>
          <div className="text-green-600 text-2xl">💻</div>
        </div>
        <div className="mt-2">
          <span className="text-gray-400 text-sm">
            {metrics ? `${metrics.devicesProtected} Protected` : "-- Online"}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Security Events</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics?.totalThreatsBlocked ?? "--"}
            </p>
          </div>
          <div className="text-orange-600 text-2xl">⚠️</div>
        </div>
        <div className="mt-2">
          <span className="text-gray-400 text-sm">
            Trend: {metrics?.threatTrend ?? "--"}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Compliance Score</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics?.complianceScore != null ? `${metrics.complianceScore}%` : "--%"}
            </p>
          </div>
          <div className="text-blue-600 text-2xl">📊</div>
        </div>
        <div className="mt-2">
          <span className="text-gray-400 text-sm">
            Last Scan: {metrics?.lastScanTime ? new Date(metrics.lastScanTime).toLocaleString() : "--"}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Active Protections</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics?.activeProtections ?? "--"}
            </p>
          </div>
          <div className="text-purple-600 text-2xl">🛡️</div>
        </div>
        <div className="mt-2">
          <span className="text-gray-400 text-sm">Modules running</span>
        </div>
      </div>
    </div>
  );
}


