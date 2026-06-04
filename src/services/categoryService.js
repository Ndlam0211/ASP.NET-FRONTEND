import { axiosInstance } from "./api";

export const categoryService = {
  getCategories: async () => {
    return axiosInstance.get("/api/CategoriesProducts");
  }
};
