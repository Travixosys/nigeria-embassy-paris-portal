"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/shared/header";
import { useDemoData, useHydrated } from "@/lib/demo-store";
import { StatusBadge, DocStatusBadge } from "@/components/shared/status-badge";
import { APPLICATION_STATUSES, DOCUMENT_TYPES, type ApplicationStatus } from "@/lib/constants";
import { PASSPORT_TYPES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Search, FileText, AlertCircle, CheckCircle, Clock, Upload, X } from "lucide-react";

const STATUS_INSTRUCTIONS: Partial<Record<ApplicationStatus, string>> = {
  submitted: "Your application has been received. It will be reviewed by our consular staff shortly.",
  under_review: "Your application is currently being reviewed. We will contact you if any additional information is needed.",
  additional_documents_required: "Additional documents are required. Please upload the missing or corrected documents below.",
  ready_for_appointment: "Your documents have been approved. Please contact the consular section to schedule your biometric appointment.",
  processing: "Your application has been forwarded to the Nigeria Immigration Service for processing.",
  ready_for_collection: "Your passport is ready for collection. Please visit the consular section with a valid ID.",
  closed: "This application has been closed. If you have questions, please contact the consular section.",
};

function TrackContent() {
  const searchParams = useSearchParams();
  const data = useDemoData();
  const hydrated = useHydrated();

  const [refNumber, setRefNumber] = useState(searchParams.get("ref") || "");
  const [emailInput, setEmailInput] = useState("");
  // Auto-search when arriving with ?ref= (skip email check for demo)
  const [searchedRef, setSearchedRef] = useState(searchParams.get("ref")?.trim().toUpperCase() || "");
  const searched = searchedRef !== "";

  // Derived from the demo store, so status changes made by staff in another tab show up live
  const application = hydrated && searched
    ? data.applications.find((a) => a.reference_number === searchedRef) ?? null
    : null;
  const documents = application
    ? data.documents
        .filter((d) => d.application_id === application.id)
        .sort((a, b) => a.uploaded_at.localeCompare(b.uploaded_at))
    : [];
  const error = hydrated && searched && !application
    ? "No application found with that reference number. Please check and try again."
    : "";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // In production, also verify email matches
    setSearchedRef(refNumber.trim().toUpperCase());
  }

  const missingDocs = documents.filter((d) => d.review_status === "rejected");
  const approvedDocs = documents.filter((d) => d.review_status === "approved");
  const pendingDocs = documents.filter((d) => d.review_status === "pending");

  return (
    <main className="flex-1 py-12">
      <div className="mx-auto max-w-2xl px-4">
        {/* Search Form */}
        <div className="bg-surface rounded-lg border border-border shadow-sm p-8 mb-6">
          <h1 className="text-2xl font-semibold text-text mb-2">Track Your Application</h1>
          <p className="text-sm text-text-muted mb-6">
            Enter your reference number to check the current status of your application.
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Reference Number *</label>
              <input
                type="text"
                required
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                placeholder="NGA-PAR-2026-0001"
                className="w-full rounded-md border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email Address</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-text-muted mt-1">Optional for demo — required in production</p>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-md py-3 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Track Application
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-danger bg-red-50 rounded-md px-4 py-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {application && (
          <div className="space-y-4">
            {/* Status Card */}
            <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-text-muted">Reference</p>
                  <p className="font-mono font-bold text-primary">{application.reference_number}</p>
                </div>
                <StatusBadge status={application.current_status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="text-text-muted">Applicant</p>
                  <p className="font-medium">{application.first_name} {application.last_name}</p>
                </div>
                <div>
                  <p className="text-text-muted">Type</p>
                  <p className="font-medium">{PASSPORT_TYPES[application.passport_type]}</p>
                </div>
                <div>
                  <p className="text-text-muted">Submitted</p>
                  <p className="font-medium">{application.submitted_at ? formatDate(application.submitted_at) : "Not yet"}</p>
                </div>
                <div>
                  <p className="text-text-muted">Last Updated</p>
                  <p className="font-medium">{formatDate(application.updated_at)}</p>
                </div>
              </div>

              {/* Next step instructions */}
              {STATUS_INSTRUCTIONS[application.current_status] && (
                <div className="bg-accent rounded-md px-4 py-3 text-sm">
                  <p className="font-medium text-text mb-1">Next Step</p>
                  <p className="text-text-muted">{STATUS_INSTRUCTIONS[application.current_status]}</p>
                </div>
              )}
            </div>

            {/* Status Timeline */}
            <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
              <h2 className="text-base font-medium text-text mb-4">Application Progress</h2>
              <div className="space-y-3">
                {Object.entries(APPLICATION_STATUSES).map(([key, { label }]) => {
                  const statusOrder = Object.keys(APPLICATION_STATUSES);
                  const currentIndex = statusOrder.indexOf(application.current_status);
                  const thisIndex = statusOrder.indexOf(key);
                  const isActive = key === application.current_status;
                  const isPast = thisIndex < currentIndex;

                  if (key === "closed" && application.current_status !== "closed") return null;

                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isActive ? "bg-primary text-white" :
                        isPast ? "bg-success text-white" :
                        "bg-border text-text-muted"
                      }`}>
                        {isPast ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : isActive ? (
                          <Clock className="h-3.5 w-3.5" />
                        ) : (
                          <span className="w-2 h-2 bg-current rounded-full" />
                        )}
                      </div>
                      <span className={`text-sm ${isActive ? "font-medium text-text" : isPast ? "text-text-muted" : "text-text-muted/50"}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
              <h2 className="text-base font-medium text-text mb-4">
                Documents ({approvedDocs.length} approved, {pendingDocs.length} pending{missingDocs.length > 0 ? `, ${missingDocs.length} rejected` : ""})
              </h2>
              {documents.length > 0 ? (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-accent rounded-md px-4 py-3">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-text-muted" />
                        <span>{DOCUMENT_TYPES[doc.document_type]}</span>
                      </div>
                      <DocStatusBadge status={doc.review_status} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted text-center py-4">No documents uploaded.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-text-muted">Loading...</div>}>
        <TrackContent />
      </Suspense>
    </div>
  );
}
