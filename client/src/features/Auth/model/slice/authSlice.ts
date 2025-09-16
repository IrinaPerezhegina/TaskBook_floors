import { USER_LOCALSTORAGE_KEY } from "@/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initAuthUser } from "../../model/services/initAuthUser/initAuthUser";
import { registerUser } from "../../model/services/registerUser/registerUser";
import { AuthResponse } from "../../model/types/auth";
import { AuthSchema } from "../../model/types/authSchema";
import { loginUser } from "../services/loginUser/loginUser";

const initialState: AuthSchema = {
  user: undefined,
  token: "",
  login: "",
  password: "",
  firstName: "",
  lastName: "",
  middleName: "",
  managerId: null,
  status: "idle",
  loading: false,
  loadingLogin: false,
  loadingRegister: false,
  error: undefined,
  errorRegister: undefined,
  errorLogin: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.status = "idle";
      state.error = undefined;
      state.errorRegister = undefined;
      state.errorLogin = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
    resetUser: (state) => {
      state.login = "";
      state.password = "";
      state.firstName = "";
      state.lastName = "";
      state.middleName = "";
      state.managerId = null;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setMiddleName: (state, action: PayloadAction<string>) => {
      state.middleName = action.payload;
    },
    setManagerId: (state, action: PayloadAction<number>) => {
      state.managerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.errorLogin = undefined;
        state.loadingLogin = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.loadingLogin = false;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorLogin = action.payload as string;
        state.loadingLogin = false;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.errorRegister = undefined;
        state.loadingRegister = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.loadingRegister = false;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorRegister = action.payload as string;
        state.loadingRegister = false;
      })
      .addCase(initAuthUser.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
        state.loading = true;
      })
      .addCase(
        initAuthUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.loading = false;
        }
      )
      .addCase(initAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
