import { api } from "@/lib/api";


export const uploadFile = (data: FormData) => {
  return api.post("/files/upload", data);
};

export const getFiles = () => {
  return api.get("/files");
};

export const deleteFile = (id: string) => {
  return api.delete(`/files/${id}`);
};

export const createShareLink = (data: { fileId: string }) => {
  return api.post("/files/share", data);
};


