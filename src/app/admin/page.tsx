import { createClient } from "@/lib/supabase/server";
import { DashboardCards } from "@/components/admin/dashboard-cards";
import { ApplicationTable } from "@/components/admin/application-table";
import type { Application, DashboardCounts } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .order("updated_at", { ascending: false });

  const apps = (applications ?? []) as Application[];

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

      <DashboardCards counts={counts} />

      <div className="bg-surface rounded-lg border border-border shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-medium text-text">All Applications</h2>
        </div>
        <ApplicationTable applications={apps} />
      </div>
    </div>
  );
}
