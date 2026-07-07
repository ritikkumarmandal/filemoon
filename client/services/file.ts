import {api} from "./api";

export const uploadFile = (formData: FormData) =>
  api.post("/files/upload", formData);

export const getFiles = () =>
  api.get("/files");

export const deleteFile = (id: string) =>
  api.delete(`/files/${id}`);

export const shareFile = (id: string) =>
  api.post("/files/share", {
    fileId: id,
  });