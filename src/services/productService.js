import { axiosInstance, handleApiWithFallback } from "./api";
import { MOCK_PRODUCTS } from "../constants/mockData";

export const productService = {
  getProducts: async (params) => {
    // API expects pagination or category filtering
    // Let's perform the actual network call first
    return handleApiWithFallback(
      () => axiosInstance.get("/api/Products", { params }),
      // Mock Fallback Logic:
      (() => {
        let items = [...MOCK_PRODUCTS];
        // Filter by categoryProductId
        if (params?.categoryProductId) {
          items = items.filter(
            (p) => p.categoryProductId === parseInt(params.categoryProductId)
          );
        }
        // Filter by search string
        if (params?.search) {
          const s = params.search.toLowerCase();
          items = items.filter(
            (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
          );
        }
        // Handle sorting
        if (params?.sortPrice === "asc") {
          items.sort((a, b) => a.price - b.price);
        } else if (params?.sortPrice === "desc") {
          items.sort((a, b) => b.price - a.price);
        }

        // Handle simple client-side pagination mimic
        const page = parseInt(params?.page || 1);
        const pageSize = parseInt(params?.pageSize || 8);
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        const paginatedItems = items.slice(startIndex, endIndex);

        return {
          items: paginatedItems,
          currentPage: page,
          totalPages,
          pageSize,
          totalItems,
          hasPreviousPage: page > 1,
          hasNextPage: page < totalPages,
          startIndex: startIndex + 1,
          endIndex
        };
      })()
    );
  },

  getProductById: async (id) => {
    return handleApiWithFallback(
      () => axiosInstance.get(`/api/Products/${id}`),
      MOCK_PRODUCTS.find((p) => p.id === parseInt(id))
    );
  },

  getProductsByCategory: async (categoryProductId) => {
    return handleApiWithFallback(
      () => axiosInstance.get(`/api/Products/category/${categoryProductId}`),
      MOCK_PRODUCTS.filter((p) => p.categoryProductId === parseInt(categoryProductId))
    );
  }
};
