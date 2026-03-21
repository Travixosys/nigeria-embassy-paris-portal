export const APPLICATION_STATUSES = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700" },
  under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-700" },
  additional_documents_required: { label: "Additional Documents Required", color: "bg-orange-100 text-orange-700" },
  ready_for_appointment: { label: "Ready for Appointment", color: "bg-purple-100 text-purple-700" },
  processing: { label: "Sent to NIS / Processing", color: "bg-indigo-100 text-indigo-700" },
  ready_for_collection: { label: "Ready for Collection", color: "bg-green-100 text-green-700" },
  closed: { label: "Closed", color: "bg-gray-200 text-gray-600" },
} as const;

export type ApplicationStatus = keyof typeof APPLICATION_STATUSES;

export const DOCUMENT_TYPES = {
  passport_photo: "Passport Photograph",
  birth_certificate: "Birth Certificate",
  proof_of_identity: "Proof of Identity (National ID / Driver's License)",
  proof_of_address: "Proof of Address in France",
  previous_passport: "Previous Passport (copy)",
  payment_receipt: "Payment Receipt",
  other: "Other Supporting Document",
} as const;

export type DocumentType = keyof typeof DOCUMENT_TYPES;

export const DOCUMENT_REVIEW_STATUSES = {
  pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Approved", color: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
} as const;

export type DocumentReviewStatus = keyof typeof DOCUMENT_REVIEW_STATUSES;

export const PASSPORT_TYPES = {
  new: "New Passport",
  renewal: "Passport Renewal",
  replacement: "Replacement (Lost/Damaged)",
  child: "Child Passport",
} as const;

export type PassportType = keyof typeof PASSPORT_TYPES;

export const REQUIRED_DOCUMENTS: Record<PassportType, DocumentType[]> = {
  new: ["passport_photo", "birth_certificate", "proof_of_identity", "proof_of_address", "payment_receipt"],
  renewal: ["passport_photo", "previous_passport", "proof_of_address", "payment_receipt"],
  replacement: ["passport_photo", "birth_certificate", "proof_of_identity", "proof_of_address", "payment_receipt"],
  child: ["passport_photo", "birth_certificate", "proof_of_identity", "proof_of_address", "payment_receipt"],
};
