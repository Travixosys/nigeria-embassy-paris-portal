import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ApplicationReview } from "@/components/admin/application-review";
import type { Application, Document, ApplicationNote } from "@/types";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const supabase = await createClient();

  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("reference_number", ref)
    .single();

  if (!application) notFound();

  const appId = application.id;

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("application_id", appId)
    .order("uploaded_at", { ascending: true });

  const { data: notes } = await supabase
    .from("application_notes")
    .select("*, staff_user:staff_users(*)")
    .eq("application_id", appId)
    .order("created_at", { ascending: false });

  return (
    <ApplicationReview
      application={application as Application}
      documents={(documents ?? []) as Document[]}
      notes={(notes ?? []) as ApplicationNote[]}
    />
  );
}
