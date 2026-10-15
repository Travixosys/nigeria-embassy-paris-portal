// Browser-only data store for the demo. Replaces Supabase: no account, no server,
// data lives in localStorage and stays in sync across open tabs.
import { useSyncExternalStore } from "react";
import { SEED_APPLICATIONS, SEED_DOCUMENTS, SEED_NOTES } from "@/lib/demo-seed";
import { generateReferenceNumber } from "@/lib/utils";
import type { ApplicationStatus, DocumentReviewStatus, DocumentType, PassportType } from "@/lib/constants";
import type { Application, ApplicationNote, Document, StaffUser } from "@/types";

const STORAGE_KEY = "nga-paris-portal-demo-v1";

// Seed timestamps are anchored just after the last seeded event (20 March 2026)
// and shifted by whole days so the cases always look recent.
const SEED_ANCHOR = new Date("2026-03-21T00:00:00+01:00").getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

export const DEMO_OFFICER: StaffUser = {
  id: "demo-officer",
  name: "Consular Officer",
  email: "officer@consular-demo.ng",
  role: "officer",
};

export interface DemoData {
  applications: Application[];
  documents: Document[];
  notes: ApplicationNote[];
}

const EMPTY: DemoData = { applications: [], documents: [], notes: [] };

function buildSeed(): DemoData {
  const offset = Math.floor((Date.now() - SEED_ANCHOR) / DAY_MS) * DAY_MS;
  const shift = (date: string | null) => (date ? new Date(new Date(date).getTime() + offset).toISOString() : null);

  return {
    applications: SEED_APPLICATIONS.map((a) => ({
      ...a,
      submitted_at: shift(a.submitted_at),
      created_at: shift(a.created_at)!,
      updated_at: shift(a.updated_at)!,
    })),
    documents: SEED_DOCUMENTS.map((d) => ({
      ...d,
      uploaded_at: shift(d.uploaded_at)!,
      reviewed_at: shift(d.reviewed_at),
    })),
    notes: SEED_NOTES.map((n) => ({ ...n, created_at: shift(n.created_at)!, staff_user: DEMO_OFFICER })),
  };
}

let cache: DemoData | null = null;
const listeners = new Set<() => void>();

function read(): DemoData {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) cache = JSON.parse(raw) as DemoData;
  } catch {
    // Private mode or corrupted data: fall back to a fresh seed
  }
  if (!cache) {
    cache = buildSeed();
    persist(cache);
  }
  return cache;
}

function persist(data: DemoData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable: the demo still works for this tab
  }
}

function write(update: (data: DemoData) => DemoData) {
  cache = update(read());
  persist(cache);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function onStorage(e: StorageEvent) {
    if (e.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  }
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useDemoData(): DemoData {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

const noopSubscribe = () => () => {};

/** False during server render and hydration, true once the browser data is readable. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// ---------- Applicant actions ----------

export interface NewApplicationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  gender: "male" | "female" | null;
  place_of_birth: string | null;
  passport_type: PassportType;
}

export function createApplication(input: NewApplicationInput): Application {
  const taken = new Set(read().applications.map((a) => a.reference_number));
  let reference = generateReferenceNumber();
  while (taken.has(reference)) reference = generateReferenceNumber();

  const now = new Date().toISOString();
  const application: Application = {
    ...input,
    id: crypto.randomUUID(),
    reference_number: reference,
    nationality: "Nigerian",
    current_status: "draft",
    embassy_location: "Paris",
    submitted_at: null,
    created_at: now,
    updated_at: now,
  };

  write((data) => ({ ...data, applications: [application, ...data.applications] }));
  return application;
}

export function submitApplication(applicationId: string, files: { type: DocumentType; name: string }[]) {
  const now = new Date().toISOString();
  const documents: Document[] = files.map(({ type, name }) => ({
    id: crypto.randomUUID(),
    application_id: applicationId,
    document_type: type,
    file_url: "",
    file_name: name,
    review_status: "pending",
    rejection_reason: null,
    uploaded_at: now,
    reviewed_at: null,
  }));

  write((data) => ({
    ...data,
    documents: [...data.documents, ...documents],
    applications: data.applications.map((a) =>
      a.id === applicationId ? { ...a, current_status: "submitted", submitted_at: now, updated_at: now } : a
    ),
  }));
}

// ---------- Staff actions ----------

export function updateApplicationStatus(applicationId: string, status: ApplicationStatus) {
  const now = new Date().toISOString();
  write((data) => ({
    ...data,
    applications: data.applications.map((a) =>
      a.id === applicationId ? { ...a, current_status: status, updated_at: now } : a
    ),
  }));
}

export function reviewDocument(documentId: string, status: DocumentReviewStatus) {
  const now = new Date().toISOString();
  write((data) => ({
    ...data,
    documents: data.documents.map((d) => (d.id === documentId ? { ...d, review_status: status, reviewed_at: now } : d)),
  }));
}

export function addNote(applicationId: string, note: string) {
  const entry: ApplicationNote = {
    id: crypto.randomUUID(),
    application_id: applicationId,
    staff_user_id: DEMO_OFFICER.id,
    note,
    created_at: new Date().toISOString(),
    staff_user: DEMO_OFFICER,
  };
  write((data) => ({ ...data, notes: [entry, ...data.notes] }));
}

export function resetDemo() {
  write(() => buildSeed());
}
