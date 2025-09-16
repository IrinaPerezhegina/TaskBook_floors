import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersSubordinates } from "../../model/services/fetchUsersSubordinates";
import { fetchUsersForRegister } from "../services/fetchUsersForRegister";
import { User } from "../types/user";
import { usersSchema } from "../types/usersSchema";

const initialState: usersSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersForRegister.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchUsersForRegister.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUsersForRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersSubordinates.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchUsersSubordinates.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUsersSubordinates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
