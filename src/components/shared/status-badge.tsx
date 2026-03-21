import { APPLICATION_STATUSES, type ApplicationStatus, DOCUMENT_REVIEW_STATUSES, type DocumentReviewStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = APPLICATION_STATUSES[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.color)}>
      {config.label}
    </span>
  );
}

export function DocStatusBadge({ status }: { status: DocumentReviewStatus }) {
  const config = DOCUMENT_REVIEW_STATUSES[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.color)}>
      {config.label}
    </span>
  );
}
