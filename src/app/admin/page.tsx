"use client";

import { DashboardCards } from "@/components/admin/dashboard-cards";
import { ApplicationTable } from "@/components/admin/application-table";
import { useDemoData, useHydrated } from "@/lib/demo-store";
import type { DashboardCounts } from "@/types";

export default function AdminDashboardPage() {
  const hydrated = useHydrated();
  const { applications } = useDemoData();

  const apps = [...applications].sort((a, b) => b.updated_at.localeCompare(a.updated_at));

  const counts: DashboardCounts = {
    new_submissions: apps.filter((a) => a.current_status === "submitted").length,
    waiting_review: apps.filter((a) => a.current_status === "under_review").length,
    missing_docs: apps.filter((a) => a.current_status === "additional_documents_required").length,
    ready_for_collection: apps.filter((a) => a.current_status === "ready_for_collection").length,
    total: apps.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">Overview of consular applications</p>
      </div>

      {hydrated && (
        <>
          <DashboardCards counts={counts} />

          <div className="bg-surface rounded-lg border border-border shadow-sm">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-medium text-text">All Applications</h2>
            </div>
            <ApplicationTable applications={apps} />
          </div>
        </>
      )}
    </div>
  );
}
