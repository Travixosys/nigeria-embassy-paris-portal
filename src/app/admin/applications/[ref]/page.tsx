"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ApplicationReview } from "@/components/admin/application-review";
import { useDemoData, useHydrated } from "@/lib/demo-store";

export default function ApplicationDetailPage() {
  const { ref } = useParams<{ ref: string }>();
  const hydrated = useHydrated();
  const { applications, documents, notes } = useDemoData();

  if (!hydrated) return null;

  const application = applications.find((a) => a.reference_number === ref);

  if (!application) {
    return (
      <div className="bg-surface rounded-lg border border-border shadow-sm px-6 py-12 text-center">
        <p className="text-text font-medium">Application not found</p>
        <p className="text-sm text-text-muted mt-1">No application matches reference {ref}.</p>
        <Link href="/admin" className="inline-block mt-4 text-sm text-primary hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <ApplicationReview
      key={application.id}
      application={application}
      documents={documents
        .filter((d) => d.application_id === application.id)
        .sort((a, b) => a.uploaded_at.localeCompare(b.uploaded_at))}
      notes={notes
        .filter((n) => n.application_id === application.id)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))}
    />
  );
}
