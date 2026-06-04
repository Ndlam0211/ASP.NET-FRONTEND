import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

const storedUser = localStorage.getItem("customer_user")
  ? JSON.parse(localStorage.getItem("customer_user"))
  : null;

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
  isAuthenticated: !!storedUser
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      // Save to localStorage
      localStorage.setItem("customer_user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      // Auto login after registered
      if (data.customer) {
        const sessionUser = {
          id: data.customer.id,
          fullName: data.customer.fullName,
          email: data.customer.email,
          phone: data.customer.phone,
          address: data.customer.address,
          token: "offline-mock-token-session"
        };
        localStorage.setItem("customer_user", JSON.stringify(sessionUser));
        return sessionUser;
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("customer_user");
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
