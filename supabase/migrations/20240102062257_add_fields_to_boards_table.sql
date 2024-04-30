alter table "public"."boards" add column "author_id" uuid not null;

alter table "public"."boards" add column "deleted_at" timestamp with time zone;

alter table "public"."boards" add column "workspace_id" uuid not null;

alter table "public"."boards" add constraint "boards_author_id_fkey" FOREIGN KEY (author_id) REFERENCES auth.users(id) not valid;

alter table "public"."boards" validate constraint "boards_author_id_fkey";

alter table "public"."boards" add constraint "boards_workspace_id_fkey" FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE not valid;

alter table "public"."boards" validate constraint "boards_workspace_id_fkey";


