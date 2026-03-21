"use client";

import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import type { DashboardCounts } from "@/types";

const cards = [
  { key: "new_submissions" as const, label: "New Submissions", icon: FileText, color: "text-info" },
  { key: "waiting_review" as const, label: "Waiting Review", icon: Clock, color: "text-warning" },
  { key: "missing_docs" as const, label: "Missing Documents", icon: AlertTriangle, color: "text-danger" },
  { key: "ready_for_collection" as const, label: "Ready for Collection", icon: CheckCircle, color: "text-success" },
];

export function DashboardCards({ counts }: { counts: DashboardCounts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <div
          key={key}
          className="bg-surface rounded-lg border border-border shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">{label}</p>
              <p className="text-3xl font-bold text-text mt-1">{counts[key]}</p>
            </div>
            <Icon className={`h-10 w-10 ${color} opacity-70`} />
          </div>
        </div>
      ))}
    </div>
  );
}
