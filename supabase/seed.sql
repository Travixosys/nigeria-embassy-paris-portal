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

-- Seed documents for various applications
insert into documents (application_id, document_type, file_url, file_name, review_status, uploaded_at, reviewed_at) values
  -- Chioma (submitted) - all docs uploaded, pending review
  ('a1000000-0000-0000-0000-000000000001', 'passport_photo', '/placeholder-doc.pdf', 'chioma_photo.jpg', 'pending', '2026-03-15 09:45:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'birth_certificate', '/placeholder-doc.pdf', 'chioma_birth_cert.pdf', 'pending', '2026-03-15 09:46:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'proof_of_identity', '/placeholder-doc.pdf', 'chioma_id.pdf', 'pending', '2026-03-15 09:47:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'proof_of_address', '/placeholder-doc.pdf', 'chioma_address.pdf', 'pending', '2026-03-15 09:48:00+01', null),
  ('a1000000-0000-0000-0000-000000000001', 'payment_receipt', '/placeholder-doc.pdf', 'chioma_receipt.pdf', 'pending', '2026-03-15 09:49:00+01', null),

  -- Emeka (under review) - all docs, some reviewed
  ('a1000000-0000-0000-0000-000000000002', 'passport_photo', '/placeholder-doc.pdf', 'emeka_photo.jpg', 'approved', '2026-03-12 13:30:00+01', '2026-03-14 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000002', 'previous_passport', '/placeholder-doc.pdf', 'emeka_old_passport.pdf', 'approved', '2026-03-12 13:31:00+01', '2026-03-14 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000002', 'proof_of_address', '/placeholder-doc.pdf', 'emeka_address.pdf', 'pending', '2026-03-12 13:32:00+01', null),
  ('a1000000-0000-0000-0000-000000000002', 'payment_receipt', '/placeholder-doc.pdf', 'emeka_receipt.pdf', 'approved', '2026-03-12 13:33:00+01', '2026-03-14 09:10:00+01'),

  -- Amina (additional docs required) - missing proof of address, one rejected
  ('a1000000-0000-0000-0000-000000000003', 'passport_photo', '/placeholder-doc.pdf', 'amina_photo.jpg', 'approved', '2026-03-10 07:45:00+01', '2026-03-11 10:00:00+01'),
  ('a1000000-0000-0000-0000-000000000003', 'birth_certificate', '/placeholder-doc.pdf', 'amina_birth_cert.pdf', 'approved', '2026-03-10 07:46:00+01', '2026-03-11 10:05:00+01'),
  ('a1000000-0000-0000-0000-000000000003', 'proof_of_identity', '/placeholder-doc.pdf', 'amina_id_blurry.pdf', 'rejected', '2026-03-10 07:47:00+01', '2026-03-11 10:10:00+01'),

  -- Oluwaseun (ready for appointment) - all approved
  ('a1000000-0000-0000-0000-000000000004', 'passport_photo', '/placeholder-doc.pdf', 'seun_photo.jpg', 'approved', '2026-03-08 15:30:00+01', '2026-03-10 09:00:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'birth_certificate', '/placeholder-doc.pdf', 'seun_birth_cert.pdf', 'approved', '2026-03-08 15:31:00+01', '2026-03-10 09:05:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'proof_of_identity', '/placeholder-doc.pdf', 'seun_id.pdf', 'approved', '2026-03-08 15:32:00+01', '2026-03-10 09:10:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'proof_of_address', '/placeholder-doc.pdf', 'seun_address.pdf', 'approved', '2026-03-08 15:33:00+01', '2026-03-10 09:15:00+01'),
  ('a1000000-0000-0000-0000-000000000004', 'payment_receipt', '/placeholder-doc.pdf', 'seun_receipt.pdf', 'approved', '2026-03-08 15:34:00+01', '2026-03-10 09:20:00+01'),

  -- Yusuf (submitted) - partial docs
  ('a1000000-0000-0000-0000-000000000008', 'passport_photo', '/placeholder-doc.pdf', 'yusuf_photo.jpg', 'pending', '2026-03-18 14:45:00+01', null),
  ('a1000000-0000-0000-0000-000000000008', 'proof_of_identity', '/placeholder-doc.pdf', 'yusuf_id.pdf', 'pending', '2026-03-18 14:46:00+01', null),
  ('a1000000-0000-0000-0000-000000000008', 'birth_certificate', '/placeholder-doc.pdf', 'yusuf_birth_cert.pdf', 'pending', '2026-03-18 14:47:00+01', null);

-- Seed a few notes (these reference a staff user, so only uncomment after creating one)
-- insert into application_notes (application_id, staff_user_id, note, created_at) values
--   ('a1000000-0000-0000-0000-000000000002', 'STAFF_USER_UUID', 'Proof of address needs to be less than 3 months old. Waiting for re-upload.', '2026-03-14 09:15:00+01'),
--   ('a1000000-0000-0000-0000-000000000003', 'STAFF_USER_UUID', 'ID photo is too blurry. Requested new copy via email.', '2026-03-11 10:15:00+01'),
--   ('a1000000-0000-0000-0000-000000000004', 'STAFF_USER_UUID', 'All documents verified. Applicant notified for biometric appointment.', '2026-03-12 14:30:00+01');
