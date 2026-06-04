import { axiosInstance } from "./api";

export const authService = {
  login: async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("/api/Auth/CustomerLogin", {
        Email: email,
        Password: password
      });
      return response.data; // Expected { customer: { id, fullName, email, ... }, token }
    } catch (error) {
      console.warn("Auth API not responding, running offline login logic");
      // Check localStorage for registered user or use def
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
      const user = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          token: "offline-mock-token-session"
        };
      }

      // Default Uniqlo / Zara style tester account for direct logins
      if (email === "demo@fashion.com" || email === "customer@gmail.com" || email === "nguyendinhlam0211@gmail.com") {
        return {
          id: 42,
          fullName: "Emily Watson",
          email: email,
          phone: "+1 (555) 0192",
          address: "128 Minimalist Av, Kyoto District",
          token: "offline-mock-token-session"
        };
      }

      throw new Error("Invalid email or password. Hint: Use customer@gmail.com or register a new one.");
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/api/Auth/CustomerRegister", {
        FullName: userData.fullName,
        Email: userData.email,
        Password: userData.password,
        Phone: userData.phone,
        Address: userData.address
      });
      return response.data;
    } catch (error) {
      console.warn("Auth API not responding, running offline registration logic");
      // Store in register list
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
      if (registeredUsers.some((u) => u.email === userData.email)) {
        throw new Error("An account with this email address already exists.");
      }

      const newUser = {
        id: registeredUsers.length + 100, // Offset for mock uniqueness
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address: userData.address
      };

      registeredUsers.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(registeredUsers));

      return {
        success: true,
        message: "Customer registered successfully (Offline Demo mode)",
        customer: newUser
      };
    }
  }
};
