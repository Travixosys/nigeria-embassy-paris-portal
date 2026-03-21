"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { PASSPORT_TYPES, APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

export function ApplicationTable({ applications }: { applications: Application[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");

  const filtered = applications.filter((app) => {
    const matchesSearch =
      search === "" ||
      app.reference_number.toLowerCase().includes(search.toLowerCase()) ||
      app.first_name.toLowerCase().includes(search.toLowerCase()) ||
      app.last_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.current_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div className="px-6 py-3 border-b border-border flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name, reference, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
          className="rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Statuses</option>
          {Object.entries(APPLICATION_STATUSES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent/50">
              <th className="px-6 py-3 text-left font-medium text-text-muted">Reference</th>
              <th className="px-6 py-3 text-left font-medium text-text-muted">Applicant</th>
              <th className="px-6 py-3 text-left font-medium text-text-muted">Type</th>
              <th className="px-6 py-3 text-left font-medium text-text-muted">Status</th>
              <th className="px-6 py-3 text-left font-medium text-text-muted">Submitted</th>
              <th className="px-6 py-3 text-left font-medium text-text-muted">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                <td className="px-6 py-3">
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="font-mono text-primary hover:underline font-medium"
                  >
                    {app.reference_number}
                  </Link>
                </td>
                <td className="px-6 py-3">
                  <div className="font-medium">{app.first_name} {app.last_name}</div>
                  <div className="text-text-muted text-xs">{app.email}</div>
                </td>
                <td className="px-6 py-3">{PASSPORT_TYPES[app.passport_type]}</td>
                <td className="px-6 py-3"><StatusBadge status={app.current_status} /></td>
                <td className="px-6 py-3 text-text-muted">
                  {app.submitted_at ? formatDate(app.submitted_at) : "—"}
                </td>
                <td className="px-6 py-3 text-text-muted">{formatDate(app.updated_at)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-border text-sm text-text-muted">
        Showing {filtered.length} of {applications.length} applications
      </div>
    </div>
  );
}
