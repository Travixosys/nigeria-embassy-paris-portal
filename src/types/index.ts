import type { ApplicationStatus, DocumentType, DocumentReviewStatus, PassportType } from "@/lib/constants";

export interface Application {
  id: string;
  reference_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  passport_type: PassportType;
  current_status: ApplicationStatus;
  embassy_location: string;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  application_id: string;
  document_type: DocumentType;
  file_url: string;
  file_name: string;
  review_status: DocumentReviewStatus;
  rejection_reason: string | null;
  uploaded_at: string;
  reviewed_at: string | null;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "officer";
}

export interface ApplicationNote {
  id: string;
  application_id: string;
  staff_user_id: string;
  note: string;
  created_at: string;
  staff_user?: StaffUser;
}

export interface ApplicationWithDocuments extends Application {
  documents: Document[];
  application_notes: ApplicationNote[];
}

export interface DashboardCounts {
  new_submissions: number;
  waiting_review: number;
  missing_docs: number;
  ready_for_collection: number;
  total: number;
}
