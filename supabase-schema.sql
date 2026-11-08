-- Supabase SQL Editor에서 실행. Storage 버킷은 private으로 생성.
create extension if not exists pgcrypto;
create table if not exists public.shared_documents (
 id uuid primary key default gen_random_uuid(),
 title text not null check(char_length(title) between 3 and 90),
 description text not null check(char_length(description) between 8 and 600),
 category text not null default '기타',
 file_type text not null check(file_type in ('xlsx','hwpx')),
 file_size integer not null check(file_size between 1 and 2097152),
 storage_path text not null unique,
 status text not null default 'published' check(status in ('published','hidden','deleted')),
 verification_status text not null default 'unverified' check(verification_status in ('unverified','reviewing','verified','rejected')),
 downloads integer not null default 0,
 likes integer not null default 0,
 created_at timestamptz not null default now()
);
create table if not exists public.share_reports (
 id bigint generated always as identity primary key,
 document_id uuid not null references public.shared_documents(id) on delete cascade,
 reason text not null check(char_length(reason) between 8 and 500),
 created_at timestamptz not null default now()
);
alter table public.shared_documents enable row level security;
alter table public.share_reports enable row level security;
-- 익명/로그인 클라이언트에 직접 접근 정책 없음. API 서버의 service_role만 사용.
create or replace function public.share_download(doc_id uuid) returns void language sql security definer set search_path = public as $$
 update public.shared_documents set downloads=downloads+1 where id=doc_id and status='published';
$$;
create or replace function public.share_like(doc_id uuid) returns void language sql security definer set search_path = public as $$
 update public.shared_documents set likes=likes+1 where id=doc_id and status='published';
$$;
revoke all on function public.share_download(uuid) from public, anon, authenticated;
revoke all on function public.share_like(uuid) from public, anon, authenticated;
grant execute on function public.share_download(uuid) to service_role;
grant execute on function public.share_like(uuid) to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('shared-documents','shared-documents',false,2097152,array['application/octet-stream'])
 on conflict(id) do update set public=false,file_size_limit=2097152,allowed_mime_types=array['application/octet-stream'];
