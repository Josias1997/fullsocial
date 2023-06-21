import axiosInstance from "../config/axiosInstance";

export const addNewPost = async (formData: FormData, token: string) => {
  return await axiosInstance.post("/posts/store", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data",
    },
  });
};
