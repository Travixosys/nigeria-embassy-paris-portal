-- ============================================
-- Seed data: 20 realistic cases across all statuses
-- Run this AFTER creating a staff user via Supabase Auth
-- ============================================

-- NOTE: Replace 'STAFF_USER_UUID' with the actual UUID of your staff user

insert into applications (id, reference_number, first_name, last_name, email, phone, passport_type, current_status, submitted_at, created_at, updated_at) values
  ('a1000000-0000-0000-0000-000000000001', 'NGA-PAR-2026-0001', 'Chioma', 'Okafor', 'chioma.okafor@email.com', '+33 6 12 34 56 78', 'new', 'submitted', '2026-03-15 10:00:00+01', '2026-03-15 09:30:00+01', '2026-03-15 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000002', 'NGA-PAR-2026-0002', 'Emeka', 'Eze', 'emeka.eze@email.com', '+33 6 23 45 67 89', 'renewal', 'under_review', '2026-03-12 14:00:00+01', '2026-03-12 13:00:00+01', '2026-03-14 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000003', 'NGA-PAR-2026-0003', 'Amina', 'Bello', 'amina.bello@email.com', '+33 7 34 56 78 90', 'new', 'additional_documents_required', '2026-03-10 08:00:00+01', '2026-03-10 07:30:00+01', '2026-03-13 11:00:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'NGA-PAR-2026-0004', 'Oluwaseun', 'Adeyemi', 'seun.adeyemi@email.com', '+33 6 45 67 89 01', 'new', 'ready_for_appointment', '2026-03-08 16:00:00+01', '2026-03-08 15:00:00+01', '2026-03-12 14:00:00+01'),
  ('a1000000-0000-0000-0000-000000000005', 'NGA-PAR-2026-0005', 'Fatima', 'Ibrahim', 'fatima.ibrahim@email.com', '+33 7 56 78 90 12', 'child', 'processing', '2026-03-05 09:00:00+01', '2026-03-05 08:30:00+01', '2026-03-11 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000006', 'NGA-PAR-2026-0006', 'Tunde', 'Bakare', 'tunde.bakare@email.com', '+33 6 67 89 01 23', 'renewal', 'ready_for_collection', '2026-03-01 11:00:00+01', '2026-03-01 10:00:00+01', '2026-03-10 16:00:00+01'),
  ('a1000000-0000-0000-0000-000000000007', 'NGA-PAR-2026-0007', 'Ngozi', 'Nwosu', 'ngozi.nwosu@email.com', '+33 7 78 90 12 34', 'new', 'closed', '2026-02-20 13:00:00+01', '2026-02-20 12:00:00+01', '2026-03-05 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000008', 'NGA-PAR-2026-0008', 'Yusuf', 'Abubakar', 'yusuf.abubakar@email.com', '+33 6 89 01 23 45', 'replacement', 'submitted', '2026-03-18 15:00:00+01', '2026-03-18 14:30:00+01', '2026-03-18 15:00:00+01'),
  ('a1000000-0000-0000-0000-000000000009', 'NGA-PAR-2026-0009', 'Blessing', 'Okonkwo', 'blessing.okonkwo@email.com', '+33 7 90 12 34 56', 'new', 'under_review', '2026-03-16 10:00:00+01', '2026-03-16 09:00:00+01', '2026-03-17 11:00:00+01'),
  ('a1000000-0000-0000-0000-000000000010', 'NGA-PAR-2026-0010', 'Adebayo', 'Ojo', 'adebayo.ojo@email.com', '+33 6 01 23 45 67', 'renewal', 'submitted', '2026-03-19 09:00:00+01', '2026-03-19 08:30:00+01', '2026-03-19 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000011', 'NGA-PAR-2026-0011', 'Hauwa', 'Musa', 'hauwa.musa@email.com', '+33 7 12 34 56 78', 'child', 'additional_documents_required', '2026-03-14 12:00:00+01', '2026-03-14 11:00:00+01', '2026-03-16 14:00:00+01'),
  ('a1000000-0000-0000-0000-000000000012', 'NGA-PAR-2026-0012', 'Chukwudi', 'Nnamdi', 'chukwudi.nnamdi@email.com', '+33 6 23 45 67 80', 'new', 'ready_for_appointment', '2026-03-07 10:00:00+01', '2026-03-07 09:00:00+01', '2026-03-11 16:00:00+01'),
  ('a1000000-0000-0000-0000-000000000013', 'NGA-PAR-2026-0013', 'Aisha', 'Suleiman', 'aisha.suleiman@email.com', '+33 7 34 56 78 91', 'replacement', 'processing', '2026-03-03 14:00:00+01', '2026-03-03 13:00:00+01', '2026-03-09 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000014', 'NGA-PAR-2026-0014', 'Obinna', 'Uche', 'obinna.uche@email.com', '+33 6 45 67 89 02', 'new', 'ready_for_collection', '2026-02-28 11:00:00+01', '2026-02-28 10:00:00+01', '2026-03-08 15:00:00+01'),
  ('a1000000-0000-0000-0000-000000000015', 'NGA-PAR-2026-0015', 'Zainab', 'Abdullahi', 'zainab.abdullahi@email.com', '+33 7 56 78 90 13', 'renewal', 'closed', '2026-02-15 09:00:00+01', '2026-02-15 08:00:00+01', '2026-03-01 12:00:00+01'),
  ('a1000000-0000-0000-0000-000000000016', 'NGA-PAR-2026-0016', 'Ifeanyi', 'Okoro', 'ifeanyi.okoro@email.com', '+33 6 67 89 01 24', 'new', 'draft', '2026-03-20 10:00:00+01', '2026-03-20 10:00:00+01', '2026-03-20 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000017', 'NGA-PAR-2026-0017', 'Funke', 'Afolabi', 'funke.afolabi@email.com', '+33 7 78 90 12 35', 'child', 'submitted', '2026-03-20 14:00:00+01', '2026-03-20 13:30:00+01', '2026-03-20 14:00:00+01'),
  ('a1000000-0000-0000-0000-000000000018', 'NGA-PAR-2026-0018', 'Musa', 'Danjuma', 'musa.danjuma@email.com', '+33 6 89 01 23 46', 'new', 'under_review', '2026-03-17 09:00:00+01', '2026-03-17 08:30:00+01', '2026-03-18 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000019', 'NGA-PAR-2026-0019', 'Kemi', 'Olayinka', 'kemi.olayinka@email.com', '+33 7 90 12 34 57', 'renewal', 'additional_documents_required', '2026-03-11 15:00:00+01', '2026-03-11 14:00:00+01', '2026-03-15 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000020', 'NGA-PAR-2026-0020', 'Usman', 'Garba', 'usman.garba@email.com', '+33 6 01 23 45 68', 'replacement', 'ready_for_appointment', '2026-03-09 10:00:00+01', '2026-03-09 09:00:00+01', '2026-03-13 14:00:00+01');

-- Seed documents for ALL applications
insert into documents (application_id, document_type, file_url, file_name, review_status, rejection_reason, uploaded_at, reviewed_at) values
  -- 0001 Chioma (submitted, new) — 5 docs, all pending
  ('a1000000-0000-0000-0000-000000000001', 'passport_photo', '/placeholder-doc.pdf', 'chioma_photo.jpg', 'pending', null, '2026-03-15 09:45:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'birth_certificate', '/placeholder-doc.pdf', 'chioma_birth_cert.pdf', 'pending', null, '2026-03-15 09:46:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'proof_of_identity', '/placeholder-doc.pdf', 'chioma_national_id.pdf', 'pending', null, '2026-03-15 09:47:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'proof_of_address', '/placeholder-doc.pdf', 'chioma_edf_bill.pdf', 'pending', null, '2026-03-15 09:48:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'payment_receipt', '/placeholder-doc.pdf', 'chioma_receipt.pdf', 'pending', null, '2026-03-15 09:49:00+01', null),

  -- 0002 Emeka (under_review, renewal) — 4 docs, 3 approved, 1 pending
  ('a1000000-0000-0000-0000-000000000002', 'passport_photo', '/placeholder-doc.pdf', 'emeka_photo.jpg', 'approved', null, '2026-03-12 13:30:00+01', '2026-03-14 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000002', 'previous_passport', '/placeholder-doc.pdf', 'emeka_old_passport.pdf', 'approved', null, '2026-03-12 13:31:00+01', '2026-03-14 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000002', 'proof_of_address', '/placeholder-doc.pdf', 'emeka_address.pdf', 'pending', null, '2026-03-12 13:32:00+01', null),
  ('a1000000-0000-0000-0000-000000000002', 'payment_receipt', '/placeholder-doc.pdf', 'emeka_receipt.pdf', 'approved', null, '2026-03-12 13:33:00+01', '2026-03-14 09:10:00+01'),

  -- 0003 Amina (additional_documents_required, new) — 4 docs, 2 approved, 1 rejected, 1 pending
  ('a1000000-0000-0000-0000-000000000003', 'passport_photo', '/placeholder-doc.pdf', 'amina_photo.jpg', 'approved', null, '2026-03-10 07:45:00+01', '2026-03-11 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000003', 'birth_certificate', '/placeholder-doc.pdf', 'amina_birth_cert.pdf', 'approved', null, '2026-03-10 07:46:00+01', '2026-03-11 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000003', 'proof_of_identity', '/placeholder-doc.pdf', 'amina_id_blurry.pdf', 'rejected', 'Image too blurry — please re-upload a clear scan of your National ID', '2026-03-10 07:47:00+01', '2026-03-11 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000003', 'proof_of_address', '/placeholder-doc.pdf', 'amina_address_old.pdf', 'rejected', 'Document is older than 3 months. Please provide a recent utility bill or bank statement', '2026-03-10 07:48:00+01', '2026-03-11 10:12:00+01'),

  -- 0004 Oluwaseun (ready_for_appointment, new) — 5 docs, all approved
  ('a1000000-0000-0000-0000-000000000004', 'passport_photo', '/placeholder-doc.pdf', 'seun_photo.jpg', 'approved', null, '2026-03-08 15:30:00+01', '2026-03-10 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'birth_certificate', '/placeholder-doc.pdf', 'seun_birth_cert.pdf', 'approved', null, '2026-03-08 15:31:00+01', '2026-03-10 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'proof_of_identity', '/placeholder-doc.pdf', 'seun_national_id.pdf', 'approved', null, '2026-03-08 15:32:00+01', '2026-03-10 09:10:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'proof_of_address', '/placeholder-doc.pdf', 'seun_edf_facture.pdf', 'approved', null, '2026-03-08 15:33:00+01', '2026-03-10 09:15:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'payment_receipt', '/placeholder-doc.pdf', 'seun_receipt.pdf', 'approved', null, '2026-03-08 15:34:00+01', '2026-03-10 09:20:00+01'),

  -- 0005 Fatima (processing, child) — 5 docs, all approved
  ('a1000000-0000-0000-0000-000000000005', 'passport_photo', '/placeholder-doc.pdf', 'fatima_child_photo.jpg', 'approved', null, '2026-03-05 08:40:00+01', '2026-03-06 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000005', 'birth_certificate', '/placeholder-doc.pdf', 'fatima_birth_cert.pdf', 'approved', null, '2026-03-05 08:41:00+01', '2026-03-06 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000005', 'proof_of_identity', '/placeholder-doc.pdf', 'fatima_parent_id.pdf', 'approved', null, '2026-03-05 08:42:00+01', '2026-03-06 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000005', 'proof_of_address', '/placeholder-doc.pdf', 'fatima_address.pdf', 'approved', null, '2026-03-05 08:43:00+01', '2026-03-06 10:15:00+01'),
  ('a1000000-0000-0000-0000-000000000005', 'payment_receipt', '/placeholder-doc.pdf', 'fatima_receipt.pdf', 'approved', null, '2026-03-05 08:44:00+01', '2026-03-06 10:20:00+01'),

  -- 0006 Tunde (ready_for_collection, renewal) — 4 docs, all approved
  ('a1000000-0000-0000-0000-000000000006', 'passport_photo', '/placeholder-doc.pdf', 'tunde_photo.jpg', 'approved', null, '2026-03-01 10:15:00+01', '2026-03-02 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000006', 'previous_passport', '/placeholder-doc.pdf', 'tunde_old_passport.pdf', 'approved', null, '2026-03-01 10:16:00+01', '2026-03-02 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000006', 'proof_of_address', '/placeholder-doc.pdf', 'tunde_address.pdf', 'approved', null, '2026-03-01 10:17:00+01', '2026-03-02 09:10:00+01'),
  ('a1000000-0000-0000-0000-000000000006', 'payment_receipt', '/placeholder-doc.pdf', 'tunde_receipt.pdf', 'approved', null, '2026-03-01 10:18:00+01', '2026-03-02 09:15:00+01'),

  -- 0007 Ngozi (closed, new) — 5 docs, all approved
  ('a1000000-0000-0000-0000-000000000007', 'passport_photo', '/placeholder-doc.pdf', 'ngozi_photo.jpg', 'approved', null, '2026-02-20 12:15:00+01', '2026-02-21 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000007', 'birth_certificate', '/placeholder-doc.pdf', 'ngozi_birth_cert.pdf', 'approved', null, '2026-02-20 12:16:00+01', '2026-02-21 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000007', 'proof_of_identity', '/placeholder-doc.pdf', 'ngozi_id.pdf', 'approved', null, '2026-02-20 12:17:00+01', '2026-02-21 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000007', 'proof_of_address', '/placeholder-doc.pdf', 'ngozi_address.pdf', 'approved', null, '2026-02-20 12:18:00+01', '2026-02-21 10:15:00+01'),
  ('a1000000-0000-0000-0000-000000000007', 'payment_receipt', '/placeholder-doc.pdf', 'ngozi_receipt.pdf', 'approved', null, '2026-02-20 12:19:00+01', '2026-02-21 10:20:00+01'),

  -- 0008 Yusuf (submitted, replacement) — 4 docs, all pending
  ('a1000000-0000-0000-0000-000000000008', 'passport_photo', '/placeholder-doc.pdf', 'yusuf_photo.jpg', 'pending', null, '2026-03-18 14:45:00+01', null),
  ('a1000000-0000-0000-0000-000000000008', 'birth_certificate', '/placeholder-doc.pdf', 'yusuf_birth_cert.pdf', 'pending', null, '2026-03-18 14:46:00+01', null),
  ('a1000000-0000-0000-0000-000000000008', 'proof_of_identity', '/placeholder-doc.pdf', 'yusuf_drivers_license.pdf', 'pending', null, '2026-03-18 14:47:00+01', null),
  ('a1000000-0000-0000-0000-000000000008', 'proof_of_address', '/placeholder-doc.pdf', 'yusuf_rent_receipt.pdf', 'pending', null, '2026-03-18 14:48:00+01', null),

  -- 0009 Blessing (under_review, new) — 5 docs, 2 approved, 3 pending
  ('a1000000-0000-0000-0000-000000000009', 'passport_photo', '/placeholder-doc.pdf', 'blessing_photo.jpg', 'approved', null, '2026-03-16 09:15:00+01', '2026-03-17 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000009', 'birth_certificate', '/placeholder-doc.pdf', 'blessing_birth_cert.pdf', 'approved', null, '2026-03-16 09:16:00+01', '2026-03-17 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000009', 'proof_of_identity', '/placeholder-doc.pdf', 'blessing_id.pdf', 'pending', null, '2026-03-16 09:17:00+01', null),
  ('a1000000-0000-0000-0000-000000000009', 'proof_of_address', '/placeholder-doc.pdf', 'blessing_address.pdf', 'pending', null, '2026-03-16 09:18:00+01', null),
  ('a1000000-0000-0000-0000-000000000009', 'payment_receipt', '/placeholder-doc.pdf', 'blessing_receipt.pdf', 'pending', null, '2026-03-16 09:19:00+01', null),

  -- 0010 Adebayo (submitted, renewal) — 4 docs, all pending
  ('a1000000-0000-0000-0000-000000000010', 'passport_photo', '/placeholder-doc.pdf', 'adebayo_photo.jpg', 'pending', null, '2026-03-19 08:40:00+01', null),
  ('a1000000-0000-0000-0000-000000000010', 'previous_passport', '/placeholder-doc.pdf', 'adebayo_old_passport.pdf', 'pending', null, '2026-03-19 08:41:00+01', null),
  ('a1000000-0000-0000-0000-000000000010', 'proof_of_address', '/placeholder-doc.pdf', 'adebayo_address.pdf', 'pending', null, '2026-03-19 08:42:00+01', null),
  ('a1000000-0000-0000-0000-000000000010', 'payment_receipt', '/placeholder-doc.pdf', 'adebayo_receipt.pdf', 'pending', null, '2026-03-19 08:43:00+01', null),

  -- 0011 Hauwa (additional_documents_required, child) — 3 docs, 1 approved, 1 rejected, 1 pending
  ('a1000000-0000-0000-0000-000000000011', 'passport_photo', '/placeholder-doc.pdf', 'hauwa_child_photo.jpg', 'approved', null, '2026-03-14 11:15:00+01', '2026-03-15 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000011', 'birth_certificate', '/placeholder-doc.pdf', 'hauwa_birth_cert_incomplete.pdf', 'rejected', 'Birth certificate is missing page 2. Please upload the complete document', '2026-03-14 11:16:00+01', '2026-03-15 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000011', 'proof_of_identity', '/placeholder-doc.pdf', 'hauwa_parent_id.pdf', 'pending', null, '2026-03-14 11:17:00+01', null),

  -- 0012 Chukwudi (ready_for_appointment, new) — 5 docs, all approved
  ('a1000000-0000-0000-0000-000000000012', 'passport_photo', '/placeholder-doc.pdf', 'chukwudi_photo.jpg', 'approved', null, '2026-03-07 09:15:00+01', '2026-03-09 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000012', 'birth_certificate', '/placeholder-doc.pdf', 'chukwudi_birth_cert.pdf', 'approved', null, '2026-03-07 09:16:00+01', '2026-03-09 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000012', 'proof_of_identity', '/placeholder-doc.pdf', 'chukwudi_id.pdf', 'approved', null, '2026-03-07 09:17:00+01', '2026-03-09 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000012', 'proof_of_address', '/placeholder-doc.pdf', 'chukwudi_address.pdf', 'approved', null, '2026-03-07 09:18:00+01', '2026-03-09 10:15:00+01'),
  ('a1000000-0000-0000-0000-000000000012', 'payment_receipt', '/placeholder-doc.pdf', 'chukwudi_receipt.pdf', 'approved', null, '2026-03-07 09:19:00+01', '2026-03-09 10:20:00+01'),

  -- 0013 Aisha (processing, replacement) — 4 docs, all approved
  ('a1000000-0000-0000-0000-000000000013', 'passport_photo', '/placeholder-doc.pdf', 'aisha_photo.jpg', 'approved', null, '2026-03-03 13:15:00+01', '2026-03-04 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000013', 'birth_certificate', '/placeholder-doc.pdf', 'aisha_birth_cert.pdf', 'approved', null, '2026-03-03 13:16:00+01', '2026-03-04 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000013', 'proof_of_identity', '/placeholder-doc.pdf', 'aisha_id.pdf', 'approved', null, '2026-03-03 13:17:00+01', '2026-03-04 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000013', 'payment_receipt', '/placeholder-doc.pdf', 'aisha_receipt.pdf', 'approved', null, '2026-03-03 13:18:00+01', '2026-03-04 10:15:00+01'),

  -- 0014 Obinna (ready_for_collection, new) — 5 docs, all approved
  ('a1000000-0000-0000-0000-000000000014', 'passport_photo', '/placeholder-doc.pdf', 'obinna_photo.jpg', 'approved', null, '2026-02-28 10:15:00+01', '2026-03-01 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000014', 'birth_certificate', '/placeholder-doc.pdf', 'obinna_birth_cert.pdf', 'approved', null, '2026-02-28 10:16:00+01', '2026-03-01 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000014', 'proof_of_identity', '/placeholder-doc.pdf', 'obinna_national_id.pdf', 'approved', null, '2026-02-28 10:17:00+01', '2026-03-01 09:10:00+01'),
  ('a1000000-0000-0000-0000-000000000014', 'proof_of_address', '/placeholder-doc.pdf', 'obinna_address.pdf', 'approved', null, '2026-02-28 10:18:00+01', '2026-03-01 09:15:00+01'),
  ('a1000000-0000-0000-0000-000000000014', 'payment_receipt', '/placeholder-doc.pdf', 'obinna_receipt.pdf', 'approved', null, '2026-02-28 10:19:00+01', '2026-03-01 09:20:00+01'),

  -- 0015 Zainab (closed, renewal) — 4 docs, all approved
  ('a1000000-0000-0000-0000-000000000015', 'passport_photo', '/placeholder-doc.pdf', 'zainab_photo.jpg', 'approved', null, '2026-02-15 08:15:00+01', '2026-02-16 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000015', 'previous_passport', '/placeholder-doc.pdf', 'zainab_old_passport.pdf', 'approved', null, '2026-02-15 08:16:00+01', '2026-02-16 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000015', 'proof_of_address', '/placeholder-doc.pdf', 'zainab_address.pdf', 'approved', null, '2026-02-15 08:17:00+01', '2026-02-16 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000015', 'payment_receipt', '/placeholder-doc.pdf', 'zainab_receipt.pdf', 'approved', null, '2026-02-15 08:18:00+01', '2026-02-16 10:15:00+01'),

  -- 0016 Ifeanyi (draft, new) — 2 docs started, pending
  ('a1000000-0000-0000-0000-000000000016', 'passport_photo', '/placeholder-doc.pdf', 'ifeanyi_photo.jpg', 'pending', null, '2026-03-20 10:05:00+01', null),
  ('a1000000-0000-0000-0000-000000000016', 'birth_certificate', '/placeholder-doc.pdf', 'ifeanyi_birth_cert.pdf', 'pending', null, '2026-03-20 10:06:00+01', null),

  -- 0017 Funke (submitted, child) — 5 docs, all pending
  ('a1000000-0000-0000-0000-000000000017', 'passport_photo', '/placeholder-doc.pdf', 'funke_child_photo.jpg', 'pending', null, '2026-03-20 13:35:00+01', null),
  ('a1000000-0000-0000-0000-000000000017', 'birth_certificate', '/placeholder-doc.pdf', 'funke_birth_cert.pdf', 'pending', null, '2026-03-20 13:36:00+01', null),
  ('a1000000-0000-0000-0000-000000000017', 'proof_of_identity', '/placeholder-doc.pdf', 'funke_parent_id.pdf', 'pending', null, '2026-03-20 13:37:00+01', null),
  ('a1000000-0000-0000-0000-000000000017', 'proof_of_address', '/placeholder-doc.pdf', 'funke_address.pdf', 'pending', null, '2026-03-20 13:38:00+01', null),
  ('a1000000-0000-0000-0000-000000000017', 'payment_receipt', '/placeholder-doc.pdf', 'funke_receipt.pdf', 'pending', null, '2026-03-20 13:39:00+01', null),

  -- 0018 Musa (under_review, new) — 5 docs, 3 approved, 2 pending
  ('a1000000-0000-0000-0000-000000000018', 'passport_photo', '/placeholder-doc.pdf', 'musa_photo.jpg', 'approved', null, '2026-03-17 08:35:00+01', '2026-03-18 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000018', 'birth_certificate', '/placeholder-doc.pdf', 'musa_birth_cert.pdf', 'approved', null, '2026-03-17 08:36:00+01', '2026-03-18 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000018', 'proof_of_identity', '/placeholder-doc.pdf', 'musa_id.pdf', 'approved', null, '2026-03-17 08:37:00+01', '2026-03-18 09:10:00+01'),
  ('a1000000-0000-0000-0000-000000000018', 'proof_of_address', '/placeholder-doc.pdf', 'musa_address.pdf', 'pending', null, '2026-03-17 08:38:00+01', null),
  ('a1000000-0000-0000-0000-000000000018', 'payment_receipt', '/placeholder-doc.pdf', 'musa_receipt.pdf', 'pending', null, '2026-03-17 08:39:00+01', null),

  -- 0019 Kemi (additional_documents_required, renewal) — 3 docs, 1 approved, 1 rejected, 1 pending
  ('a1000000-0000-0000-0000-000000000019', 'passport_photo', '/placeholder-doc.pdf', 'kemi_photo.jpg', 'approved', null, '2026-03-11 14:15:00+01', '2026-03-12 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000019', 'previous_passport', '/placeholder-doc.pdf', 'kemi_expired_passport.pdf', 'rejected', 'Only the data page was uploaded — please scan all pages including the cover', '2026-03-11 14:16:00+01', '2026-03-12 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000019', 'proof_of_address', '/placeholder-doc.pdf', 'kemi_address.pdf', 'pending', null, '2026-03-11 14:17:00+01', null),

  -- 0020 Usman (ready_for_appointment, replacement) — 5 docs, all approved
  ('a1000000-0000-0000-0000-000000000020', 'passport_photo', '/placeholder-doc.pdf', 'usman_photo.jpg', 'approved', null, '2026-03-09 09:15:00+01', '2026-03-10 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000020', 'birth_certificate', '/placeholder-doc.pdf', 'usman_birth_cert.pdf', 'approved', null, '2026-03-09 09:16:00+01', '2026-03-10 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000020', 'proof_of_identity', '/placeholder-doc.pdf', 'usman_id.pdf', 'approved', null, '2026-03-09 09:17:00+01', '2026-03-10 10:10:00+01'),
  ('a1000000-0000-0000-0000-000000000020', 'proof_of_address', '/placeholder-doc.pdf', 'usman_address.pdf', 'approved', null, '2026-03-09 09:18:00+01', '2026-03-10 10:15:00+01'),
  ('a1000000-0000-0000-0000-000000000020', 'payment_receipt', '/placeholder-doc.pdf', 'usman_receipt.pdf', 'approved', null, '2026-03-09 09:19:00+01', '2026-03-10 10:20:00+01');

-- Seed a few notes (these reference a staff user, so only uncomment after creating one)
-- Replace 'STAFF_USER_UUID' with the actual UUID of your staff user from step 5/6 of setup
-- insert into application_notes (application_id, staff_user_id, note, created_at) values
--   ('a1000000-0000-0000-0000-000000000002', 'STAFF_USER_UUID', 'Proof of address needs to be less than 3 months old. Waiting for re-upload.', '2026-03-14 09:15:00+01'),
--   ('a1000000-0000-0000-0000-000000000003', 'STAFF_USER_UUID', 'ID photo is too blurry. Requested new copy via email.', '2026-03-11 10:15:00+01'),
--   ('a1000000-0000-0000-0000-000000000004', 'STAFF_USER_UUID', 'All documents verified. Applicant notified for biometric appointment.', '2026-03-12 14:30:00+01'),
--   ('a1000000-0000-0000-0000-000000000011', 'STAFF_USER_UUID', 'Birth certificate incomplete. Contacted mother by phone to request full document.', '2026-03-15 09:10:00+01'),
--   ('a1000000-0000-0000-0000-000000000019', 'STAFF_USER_UUID', 'Previous passport scan incomplete — only data page uploaded. Email sent requesting all pages.', '2026-03-12 10:10:00+01');
