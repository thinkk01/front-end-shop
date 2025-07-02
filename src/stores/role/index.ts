import axios from "axios";
import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllRolesAsync } from "./actions";

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  //general
  isLoading: false,
  typeError: "",
  //register
  isSuccess: true,
  isError: false,
  message: "",
  //update
  isSuccessUpdateMe: false,
  isErrorUpdateMe: true,
  messageUpdateMe: "",
  //changePassword
  isSuccessChangePassword: true,
  isErrorChangePassword: false,
  messageChangePassword: "",

  roles: {
    data: [],
    total: 0,
  }
};
export const roleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.isLoading = false;
      state.typeError = "";
      
      state.isSuccess = false;
      state.isError = true;
      state.message = "";

      state.isSuccessUpdateMe = false;
      state.isErrorUpdateMe = true;
      state.messageUpdateMe = "";

      state.isSuccessChangePassword = true;
      state.isErrorChangePassword = false;
      state.messageChangePassword = "";
      state.roles = {
        data: [],
        total: 0,
      };
    }
  },
  extraReducers: builder => {
    //get all role
    builder.addCase(getAllRolesAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRolesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roles.data = action.payload.roles;
      state.roles.total = action.payload.total;
    });
    builder.addCase(getAllRolesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.roles.data = [];
      state.roles.total = 0;
    });
  }
});
export const { resetInitialState } = roleSlice.actions;
export default roleSlice.reducer;
