import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { client } from "../client";
import { UserId, checkError } from "./common";
import { uploadAvatar } from "./storage";

export interface Workspace {
  id: string;
  userId: UserId;
  name: string;
  slug: string | null;
  description: string | null;
  avatarUrl: string | null;
}

export const workspaceExistsFx = createEffect<
  { userId: UserId },
  boolean,
  PostgrestError
>(async ({ userId }) => {
  const { data: workspaces, error } = await client
    .from("workspaces")
    .select()
    .eq("user_id", userId);

  checkError(error);

  if (workspaces === null || workspaces.length === 0) {
    return false;
  }

  return true;
});

export const workspaceCreateFx = createEffect<
  { workspace: Omit<Workspace, "id" | "avatarUrl"> },
  void,
  PostgrestError
>(async ({ workspace }) => {
  const { userId, name, description, slug } = workspace;
  const { error } = await client.from("workspaces").insert({
    user_id: userId,
    name,
    description,
    slug,
  });

  checkError(error);

  return;
});

export const workspaceGetFx = createEffect<
  { workspaceId: Workspace["id"] },
  Workspace | null,
  PostgrestError
>(async ({ workspaceId }) => {
  const { data: workspace, error } = await client
    .from("workspaces")
    .select()
    .eq("id", workspaceId)
    .single();

  checkError(error);

  if (workspace === null) {
    return null;
  }

  const { id, name, slug, description, avatar_url, user_id } = workspace;

  return {
    id,
    userId: user_id,
    name,
    slug,
    description,
    avatarUrl: avatar_url,
  };
});

export const workspaceGetForUserFx = createEffect<
  { userId: UserId },
  Workspace | null,
  PostgrestError
>(async ({ userId }) => {
  const { data, error } = await client
    .from("workspaces")
    .select()
    .eq("user_id", userId);

  checkError(error);

  if (data === null) {
    return null;
  }

  const workspace = data[0];
  const { id, name, slug, description, avatar_url } = workspace;

  return {
    id,
    userId,
    name,
    slug,
    description,
    avatarUrl: avatar_url,
  };
});

export const workspaceUpdateFx = createEffect<
  { workspace: Workspace },
  void,
  PostgrestError
>(async ({ workspace }) => {
  const { id, userId, name, description, slug, avatarUrl } = workspace;
  const { error } = await client
    .from("workspaces")
    .update({
      user_id: userId,
      name,
      description,
      slug,
      avatar_url: avatarUrl,
    })
    .eq("id", id)
    .eq("user_id", userId);

  checkError(error);

  return;
});

export const workspaceUploadAvatarFx = createEffect<
  { workspaceId: string; file: File },
  string,
  PostgrestError
>(async ({ workspaceId, file }) => {
  const upload = uploadAvatar({
    filePath: `workspaces/${workspaceId}`,
    fileOptions: {
      upsert: true,
      contentType: "image/*",
    },
  });
  const avatarUrl = await upload({ file });

  const { error } = await client
    .from("workspaces")
    .update({
      avatar_url: avatarUrl,
    })
    .eq("id", workspaceId);

  checkError(error);

  return avatarUrl;
});
