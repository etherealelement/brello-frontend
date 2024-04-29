import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { client } from "../client.ts";
import { Email, UserId, checkError } from "./common.ts";

export interface Profile {
  userId: UserId;
  firstName: string;
  lastName?: string | null;
  avatarUrl?: string | null;
}

export interface ProfileCurrent extends Profile {
  email: Email;
}

export const profileExistsFx = createEffect<
  { userId: UserId },
  boolean,
  PostgrestError
>(async ({ userId }) => {
  const { data: profiles, error } = await client
    .from("profiles")
    .select()
    .eq("user_id", userId);

  checkError(error);

  if (profiles === null || profiles.length === 0) {
    return false;
  }

  return true;
});

export const profileCreateFx = createEffect<
  { profile: Profile },
  void,
  PostgrestError
>(async ({ profile }) => {
  const { userId, firstName, lastName } = profile;
  const { error } = await client.from("profiles").insert({
    user_id: userId,
    first_name: firstName,
    last_name: lastName,
  });

  checkError(error);

  return;
});

export const profileGetFx = createEffect<
  { userId: UserId },
  ProfileCurrent | null,
  PostgrestError
>(async ({ userId }) => {
  const { data, error } = await client
    .from("users")
    .select(
      `
    email,
    profiles (
      first_name,
      last_name,
      avatar_url
    )
  `,
    )
    .eq("user_id", userId);

  checkError(error);

  if (data === null) {
    return null;
  }

  const { email, profiles } = data[0];

  if (profiles === null) {
    return null;
  }

  return {
    userId,
    email,
    firstName: profiles.first_name as string,
    lastName: profiles.last_name,
    avatarUrl: profiles.avatar_url,
  };
});
