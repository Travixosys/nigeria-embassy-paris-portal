"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/shared/header";
import { createClient } from "@/lib/supabase/client";
import { PASSPORT_TYPES, REQUIRED_DOCUMENTS, DOCUMENT_TYPES, type PassportType, type DocumentType } from "@/lib/constants";
import { generateReferenceNumber } from "@/lib/utils";
import { FileUp, CheckCircle, Upload, X } from "lucide-react";

interface FileUpload {
  type: DocumentType;
  file: File | null;
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [step, setStep] = useState<"form" | "upload" | "done">("form");
  const [loading, setLoading] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const initialType = (searchParams.get("type") as PassportType) || "new";
  const [passportType, setPassportType] = useState<PassportType>(
    Object.keys(PASSPORT_TYPES).includes(initialType) ? initialType : "new"
  );

  // Upload state
  const [applicationId, setApplicationId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [files, setFiles] = useState<FileUpload[]>([]);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const refNumber = generateReferenceNumber();

    const { data, error } = await supabase
      .from("applications")
      .insert({
        reference_number: refNumber,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        date_of_birth: dateOfBirth || null,
        gender: gender || null,
        place_of_birth: placeOfBirth || null,
        passport_type: passportType,
        current_status: "draft",
      })
      .select()
      .single();

    if (error || !data) {
      alert("Error creating application. Please try again.");
      setLoading(false);
      return;
    }

    setApplicationId(data.id);
    setReferenceNumber(refNumber);

    // Initialize file upload slots based on passport type
    const required = REQUIRED_DOCUMENTS[passportType];
    setFiles(required.map((type) => ({ type, file: null })));

    setStep("upload");
    setLoading(false);
  }

  function handleFileChange(index: number, file: File | null) {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, file } : f)));
  }

  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const filesToUpload = files.filter((f) => f.file);

    for (const { type, file } of filesToUpload) {
      if (!file) continue;

      const filePath = `${applicationId}/${type}_${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      await supabase.from("documents").insert({
        application_id: applicationId,
        document_type: type,
        file_url: publicUrl,
        file_name: file.name,
        review_status: "pending",
      });
    }

    // Update status to submitted
    await supabase
      .from("applications")
      .update({ current_status: "submitted", submitted_at: new Date().toISOString() })
      .eq("id", applicationId);

    console.log(`[EMAIL] Confirmation sent to ${email}: Application ${referenceNumber} submitted successfully.`);

    setStep("done");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-2xl px-4">
          {step === "form" && (
            <div className="bg-surface rounded-lg border border-border shadow-sm p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-text">Start Your Application</h1>
                <p className="text-sm text-text-muted mt-2">
                  Fill in your details below. You will be able to upload required documents on the next step.
                </p>
              </div>

              {/* Type-specific info box */}
              <div className="mb-6 rounded-md border border-primary/20 bg-primary/5 px-5 py-4">
                <p className="text-sm font-medium text-primary mb-1">
                  {PASSPORT_TYPES[passportType]}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  {{
                    new: "For Nigerian citizens applying for a passport for the first time. You will need your birth certificate, a valid national ID, proof of address in France, a passport photograph, and proof of payment.",
                    renewal: "For renewing an expired or soon-to-expire Nigerian passport. You will need a copy of your current/previous passport, a passport photograph, proof of address in France, and proof of payment.",
                    replacement: "For replacing a lost, stolen, or damaged passport. You will need a police declaration (if stolen), your birth certificate, a valid national ID, proof of address in France, a passport photograph, and proof of payment.",
                    child: "For Nigerian children under 16 years old. You will need the child's birth certificate, a parent's valid national ID, proof of address in France, a passport-sized photograph of the child, and proof of payment.",
                  }[passportType]}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 XX XX XX XX"
                    className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Gender *</label>
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female")}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Place of Birth</label>
                  <input
                    type="text"
                    value={placeOfBirth}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    placeholder="e.g. Lagos, Nigeria"
                    className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Passport Service Type *</label>
                  <select
                    value={passportType}
                    onChange={(e) => setPassportType(e.target.value as PassportType)}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(PASSPORT_TYPES).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white rounded-md py-3 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Creating Application..." : "Continue to Document Upload"}
                </button>
              </form>
            </div>
          )}

          {step === "upload" && (
            <div className="bg-surface rounded-lg border border-border shadow-sm p-8">
              <div className="mb-6">
                <div className="bg-primary/5 border border-primary/20 rounded-md px-4 py-3 mb-6">
                  <p className="text-sm text-primary font-medium">Reference Number: {referenceNumber}</p>
                  <p className="text-xs text-text-muted mt-1">Save this number to track your application.</p>
                </div>
                <h1 className="text-2xl font-semibold text-text">Upload Documents</h1>
                <p className="text-sm text-text-muted mt-2">
                  Upload the required documents for your {PASSPORT_TYPES[passportType].toLowerCase()} application.
                </p>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {files.map((fileUpload, index) => (
                  <div key={fileUpload.type} className="border border-border rounded-md p-4">
                    <label className="block text-sm font-medium text-text mb-2">
                      {DOCUMENT_TYPES[fileUpload.type]} *
                    </label>
                    {fileUpload.file ? (
                      <div className="flex items-center justify-between bg-accent rounded-md px-3 py-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="truncate">{fileUpload.file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleFileChange(index, null)}
                          className="p-1 hover:bg-border rounded cursor-pointer"
                        >
                          <X className="h-4 w-4 text-text-muted" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-md py-6 text-sm text-text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <span>Click to upload</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading || files.every((f) => !f.file)}
                  className="w-full bg-primary text-white rounded-md py-3 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileUp className="h-4 w-4" />
                  {loading ? "Uploading..." : "Submit Application"}
                </button>
              </form>
            </div>
          )}

          {step === "done" && (
            <div className="bg-surface rounded-lg border border-border shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h1 className="text-2xl font-semibold text-text">Application Submitted</h1>
              <p className="text-sm text-text-muted mt-3 max-w-md mx-auto">
                Your application has been submitted successfully. You will receive a confirmation email shortly.
              </p>

              <div className="bg-accent border border-border rounded-lg px-6 py-4 mt-8 inline-block">
                <p className="text-sm text-text-muted">Your Reference Number</p>
                <p className="text-2xl font-bold font-mono text-primary mt-1">{referenceNumber}</p>
              </div>

              <p className="text-xs text-text-muted mt-6">
                Use this reference number to track your application status.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`/track?ref=${referenceNumber}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary-light transition-colors"
                >
                  Track My Application
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-text-muted">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  );
}
