import { axiosInstance, handleApiWithFallback } from "./api";
import { MOCK_BLOG_POSTS } from "../constants/mockData";

export const postService = {
  getPosts: async (params) => {
    return handleApiWithFallback(
      () => axiosInstance.get("/api/Posts", { params }),
      MOCK_BLOG_POSTS
    );
  },

  getPostById: async (id) => {
    return handleApiWithFallback(
      () => axiosInstance.get(`/api/Posts/${id}`),
      MOCK_BLOG_POSTS.find((p) => p.id === parseInt(id))
    );
  }
};
