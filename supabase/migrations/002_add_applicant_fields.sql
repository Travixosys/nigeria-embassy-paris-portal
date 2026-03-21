-- ============================================
-- Migration 002: Add differentiating applicant fields
-- ============================================

create type gender_type as enum ('male', 'female');

alter table applications
  add column date_of_birth date,
  add column gender gender_type,
  add column nationality text not null default 'Nigerian',
  add column place_of_birth text;
