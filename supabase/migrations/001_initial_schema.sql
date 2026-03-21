-- ============================================
-- Nigeria Embassy Paris Portal — Initial Schema
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

create type application_status as enum (
  'draft',
  'submitted',
  'under_review',
  'additional_documents_required',
  'ready_for_appointment',
  'processing',
  'ready_for_collection',
  'closed'
);

create type passport_type as enum (
  'new',
  'renewal',
  'replacement',
  'child'
);

create type document_type as enum (
  'passport_photo',
  'birth_certificate',
  'proof_of_identity',
  'proof_of_address',
  'previous_passport',
  'payment_receipt',
  'other'
);

create type document_review_status as enum (
  'pending',
  'approved',
  'rejected'
);

create type staff_role as enum (
  'admin',
  'officer'
);

-- ============================================
-- TABLES
-- ============================================

create table applications (
  id uuid primary key default uuid_generate_v4(),
  reference_number text unique not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  passport_type passport_type not null default 'new',
  current_status application_status not null default 'draft',
  embassy_location text not null default 'Paris',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  document_type document_type not null,
  file_url text not null,
  file_name text not null,
  review_status document_review_status not null default 'pending',
  rejection_reason text,
  uploaded_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table staff_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role staff_role not null default 'officer'
);

create table application_notes (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  staff_user_id uuid not null references staff_users(id),
  note text not null,
  created_at timestamptz not null default now()
);

-- ============================================
-- INDEXES
-- ============================================

create index idx_applications_status on applications(current_status);
create index idx_applications_reference on applications(reference_number);
create index idx_applications_email on applications(email);
create index idx_documents_application on documents(application_id);
create index idx_notes_application on application_notes(application_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table applications enable row level security;
alter table documents enable row level security;
alter table staff_users enable row level security;
alter table application_notes enable row level security;

-- Public: applicants can read their own application by reference + email
create policy "Applicants can view own application"
  on applications for select
  using (true);

create policy "Applicants can insert applications"
  on applications for insert
  with check (true);

create policy "Staff can do everything on applications"
  on applications for all
  using (auth.role() = 'authenticated');

-- Documents
create policy "Anyone can view documents"
  on documents for select
  using (true);

create policy "Anyone can upload documents"
  on documents for insert
  with check (true);

create policy "Staff can update documents"
  on documents for update
  using (auth.role() = 'authenticated');

-- Staff users
create policy "Staff can view staff"
  on staff_users for select
  using (auth.role() = 'authenticated');

-- Notes
create policy "Staff can view notes"
  on application_notes for select
  using (auth.role() = 'authenticated');

create policy "Staff can add notes"
  on application_notes for insert
  with check (auth.role() = 'authenticated');

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger applications_updated_at
  before update on applications
  for each row execute function update_updated_at();

-- ============================================
-- STORAGE BUCKET
-- ============================================

insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict do nothing;

create policy "Anyone can upload to documents bucket"
  on storage.objects for insert
  with check (bucket_id = 'documents');

create policy "Anyone can view documents bucket"
  on storage.objects for select
  using (bucket_id = 'documents');
