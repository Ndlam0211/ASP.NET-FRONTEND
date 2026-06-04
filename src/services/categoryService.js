import { axiosInstance, handleApiWithFallback } from "./api";
import { MOCK_CATEGORIES } from "../constants/mockData";

export const categoryService = {
  getCategories: async () => {
    return handleApiWithFallback(
      () => axiosInstance.get("/api/CategoriesProducts"),
      MOCK_CATEGORIES
    );
  }
};
