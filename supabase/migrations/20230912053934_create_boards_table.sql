create table "public"."boards" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "color" character varying,
    "background_url" character varying,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."boards" enable row level security;

CREATE UNIQUE INDEX boards_pkey ON public.boards USING btree (id);

alter table "public"."boards" add constraint "boards_pkey" PRIMARY KEY using index "boards_pkey";


