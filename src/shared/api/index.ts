import * as auth from "./rest/auth";
import * as boards from "./rest/boards";
import * as profiles from "./rest/profiles";
import * as workspaces from "./rest/workspaces";

export type { User } from "./rest/common";
export { Visibility } from "./rest/boards";
export type { Workspace } from "./rest/workspaces";

export const api = {
  auth,
  boards,
  profiles,
  workspaces,
};
