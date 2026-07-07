"use client";

import { uploadFile } from "@/services/file";

export default function Upload() {
  async function upload(e: any) {
    const formData = new FormData();

    formData.append(
      "file",
      e.target.files[0]
    );

    await uploadFile(formData);

    location.reload();
  }

  return (
    <input
      type="file"
      onChange={upload}
    />
  );
}