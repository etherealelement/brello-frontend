import { FileOptions } from "@supabase/storage-js";

import { client } from "../../client";
import { checkError } from "../common";

export const createUpload =
  ({ bucket }: { bucket: string }) =>
  ({
    filePath,
    fileOptions,
  }: {
    filePath: string;
    fileOptions?: FileOptions;
  }) =>
  async ({ file }: { file: File }): Promise<string> => {
    const fileExtension = file.name.split(".").pop();
    const { data, error } = await client.storage
      .from(bucket)
      .upload(`${filePath}.${fileExtension}`, file, fileOptions);

    checkError(error);

    const { path } = data;
    const {
      data: { publicUrl },
    } = client.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
  };
