"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, User, Mail, Phone, FileText, CheckCircle,
  XCircle, Clock, Send, StickyNote, Eye
} from "lucide-react";
import { StatusBadge, DocStatusBadge } from "@/components/shared/status-badge";
import { APPLICATION_STATUSES, type ApplicationStatus, DOCUMENT_TYPES, PASSPORT_TYPES } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Application, Document, ApplicationNote } from "@/types";

interface Props {
  application: Application;
  documents: Document[];
  notes: ApplicationNote[];
}

export function ApplicationReview({ application, documents, notes: initialNotes }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<ApplicationStatus>(application.current_status);
  const [saving, setSaving] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleStatusUpdate() {
    setSaving(true);
    await supabase
      .from("applications")
      .update({ current_status: status })
      .eq("id", application.id);

    showToast(`Status updated to "${APPLICATION_STATUSES[status].label}"`);
    console.log(`[EMAIL] Notification sent to ${application.email}: Status changed to ${APPLICATION_STATUSES[status].label}`);
    setSaving(false);

    // Redirect to dashboard after brief delay so they see the toast
    setTimeout(() => router.push("/admin"), 1200);
  }

  async function handleDocReview(docId: string, reviewStatus: "approved" | "rejected") {
    await supabase
      .from("documents")
      .update({ review_status: reviewStatus, reviewed_at: new Date().toISOString() })
      .eq("id", docId);

    showToast(`Document ${reviewStatus}`);
    router.refresh();
  }

  async function handleAddNote() {
    if (!noteText.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("application_notes")
      .insert({
        application_id: application.id,
        staff_user_id: user.id,
        note: noteText.trim(),
      })
      .select("*, staff_user:staff_users(*)")
      .single();

    if (data) {
      setNotes([data as ApplicationNote, ...notes]);
    }
    setNoteText("");
    showToast("Note added");
  }

  function handleSendUpdate() {
    console.log(`[EMAIL] Update sent to ${application.email}: Your application ${application.reference_number} status is now "${APPLICATION_STATUSES[status].label}"`);
    showToast(`Email notification sent to ${application.email}`);
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-8" onClick={() => setPreviewUrl(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Document Preview</h3>
              <button onClick={() => setPreviewUrl(null)} className="text-text-muted hover:text-text cursor-pointer">Close</button>
            </div>
            <div className="bg-accent rounded-lg p-8 text-center text-text-muted">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-40" />
              <p>Document preview placeholder</p>
              <p className="text-xs mt-1">In production, the uploaded document would display here</p>
            </div>
          </div>
        </div>
      )}

      {/* Back link + title */}
      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-text-muted hover:text-text transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-text font-mono">{application.reference_number}</h1>
          <p className="text-sm text-text-muted">{application.first_name} {application.last_name} &middot; Last updated: {formatDateTime(application.updated_at)}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Applicant info + documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-base font-medium text-text mb-4">Applicant Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-muted" />
                <span className="text-text-muted">Name:</span>
                <span className="font-medium">{application.first_name} {application.last_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-text-muted" />
                <span className="text-text-muted">Email:</span>
                <span className="font-medium">{application.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-muted" />
                <span className="text-text-muted">Phone:</span>
                <span className="font-medium">{application.phone || "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-text-muted" />
                <span className="text-text-muted">Type:</span>
                <span className="font-medium">{PASSPORT_TYPES[application.passport_type]}</span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-surface rounded-lg border border-border shadow-sm">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-base font-medium text-text">Uploaded Documents ({documents.length})</h2>
            </div>
            {documents.length === 0 ? (
              <div className="px-6 py-12 text-center text-text-muted text-sm">
                No documents uploaded yet.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {documents.map((doc) => (
                  <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-text-muted flex-shrink-0" />
                        <span className="font-medium text-sm truncate">{doc.file_name}</span>
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        {DOCUMENT_TYPES[doc.document_type]} &middot; {formatDateTime(doc.uploaded_at)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <DocStatusBadge status={doc.review_status} />
                      <button
                        onClick={() => setPreviewUrl(doc.file_url)}
                        className="p-1.5 rounded hover:bg-accent transition-colors cursor-pointer"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4 text-text-muted" />
                      </button>
                      {doc.review_status === "pending" && (
                        <>
                          <button
                            onClick={() => handleDocReview(doc.id, "approved")}
                            className="p-1.5 rounded hover:bg-green-50 transition-colors cursor-pointer"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4 text-success" />
                          </button>
                          <button
                            onClick={() => handleDocReview(doc.id, "rejected")}
                            className="p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4 text-danger" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Status + Notes */}
        <div className="space-y-6">
          {/* Status Update */}
          <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-base font-medium text-text mb-3">Update Status</h2>
            <div className="mb-3">
              <p className="text-xs text-text-muted mb-1.5">Current status</p>
              <StatusBadge status={status} />
            </div>
            <div className="mb-3">
              <p className="text-xs text-text-muted mb-1.5">Change to</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.entries(APPLICATION_STATUSES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleStatusUpdate}
                disabled={saving || status === application.current_status}
                className="flex-1 bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save & Update"}
              </button>
              <button
                onClick={handleSendUpdate}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-sm hover:bg-accent transition-colors cursor-pointer"
                title="Send email notification to applicant"
              >
                <Send className="h-3.5 w-3.5" />
                Notify
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2">Notify sends a status update email to the applicant.</p>
          </div>

          {/* Notes */}
          <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-base font-medium text-text mb-4 flex items-center gap-2">
              <StickyNote className="h-4 w-4" />
              Internal Notes
            </h2>
            <div className="space-y-3 mb-4">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <button
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                className="w-full bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer"
              >
                Add Note
              </button>
            </div>
            {notes.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="bg-accent rounded-md p-3 text-sm">
                    <p className="text-text">{note.note}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {note.staff_user?.name || "Staff"} &middot; {formatDateTime(note.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted text-center py-4">No notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
