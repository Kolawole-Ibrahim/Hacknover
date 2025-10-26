"use client";

import React, { useEffect, useRef, useState } from "react";

export function LiveBandwidth() {
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 40 }, () => Math.random())
  );
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      setPoints((prev) => {
        const next = prev.slice(1);
        next.push(Math.max(0.05, Math.min(1, prev[prev.length - 1] + (Math.random() - 0.5) * 0.25)));
        return next;
      });
      animRef.current = window.setTimeout(tick, 500);
    }
    animRef.current = window.setTimeout(tick, 500);
    return () => {
      if (animRef.current) window.clearTimeout(animRef.current);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Live Bandwidth</h3>
        <span className="text-xs text-gray-500">Last 20s</span>
      </div>
      <div className="h-32 w-full flex items-end space-x-1">
        {points.map((v, i) => (
          <div
            key={i}
            className="bg-blue-500/70 rounded-t"
            style={{ height: `${v * 100}%`, width: `${100 / points.length}%` }}
          />)
        )}
      </div>
      <div className="mt-3 text-xs text-gray-600">Simulated traffic (Mbps)</div>
    </div>
  );
}


