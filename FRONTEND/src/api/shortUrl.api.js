import axiosInstance from "../utils/axiosInstance";

// Create short URL
export const createShortUrl = async (url, slug) => {
  const { data } = await axiosInstance.post("/api/create", { url, slug });
  return data.shortUrl;
};

// Get all URLs of the current user
export const getAllUserUrls = async () => {
  const { data } = await axiosInstance.post("/api/user/urls");
  return data;
};
