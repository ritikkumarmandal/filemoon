import {api} from "./api";

export const uploadFiles = async (
  formData: FormData,
  onUploadProgress?: (progress: number) => void
) => {
  const { data } = await api.post(
    "/files/upload",
    formData,
    {
      onUploadProgress: (event) => {
        if (!event.total) return;

        const progress = Math.round(
          (event.loaded * 100) / event.total
        );

        onUploadProgress?.(progress);
      },
    }
  );

  return data;
};


export const createTransfer = async (payload: {
  fileIds: string[];
  senderName: string;
  senderEmail: string;
  receiverName?: string;
  receiverEmail: string;
  subject?: string;
  message?: string;
}) => {
  const { data } = await api.post("/transfer", payload);
  return data;
};

export const getTransfer = async (
  token: string
) => {
  const { data } = await api.get(
    `/transfer/${token}`
  );

  return data;
};