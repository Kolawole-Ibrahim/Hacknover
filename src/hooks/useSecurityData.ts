"use client";

import { useEffect, useState } from "react";
import type { SecurityMetrics, ThreatDetection, SecurityAlert } from "@/types/security";

export interface SecurityData {
  metrics: SecurityMetrics | null;
  threats: ThreatDetection[];
  alerts: SecurityAlert[];
}

export function useSecurityData() {
  const [data, setData] = useState<SecurityData>({ metrics: null, threats: [], alerts: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchAll() {
      try {
        setLoading(true);
        const res = await fetch("/api/security?type=all", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load security data (${res.status})`);
        const json = await res.json();
        if (!isMounted) return;
        setData({
          metrics: json.metrics ?? null,
          threats: Array.isArray(json.threats) ? json.threats : [],
          alerts: Array.isArray(json.alerts) ? json.alerts : [],
        });
        setError(null);
      } catch (e: any) {
        if (!isMounted) return;
        setError(e?.message ?? "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error } as const;
}


