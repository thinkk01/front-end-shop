import axios from "axios";
import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { changePasswordMeAsync, registerAuthAsync, updateAuthMeAsync } from "./actions";

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
};
export const authSlice = createSlice({
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
    }
  },
  extraReducers: builder => {
    //register
    builder.addCase(registerAuthAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = !!action.payload?.data?.email;
      state.isError = !action.payload?.data?.email;
      state.message = action.payload?.message;
      state.typeError = action.payload?.typeError;
    });
    builder.addCase(registerAuthAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = "";
      state.typeError = "";
    });
    //updateMe
    builder.addCase(updateAuthMeAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isSuccessUpdateMe = !!action.payload?.data?.email;
      state.isErrorUpdateMe = !action.payload?.data?.email;
      state.messageUpdateMe = action.payload?.message;
      state.typeError = action.payload?.typeError;
    });
    builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccessUpdateMe = false;
      state.isErrorUpdateMe = true;
      state.messageUpdateMe = "";
      state.typeError = "";
    });
    //change password
    builder.addCase(changePasswordMeAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changePasswordMeAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessChangePassword = !!action.payload?.data;
      state.isErrorChangePassword = !action.payload?.data;
      state.messageChangePassword = action.payload?.message;
      state.typeError = action.payload?.typeError;
    });
    builder.addCase(changePasswordMeAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccessChangePassword = false;
      state.isErrorChangePassword = true;
      state.messageChangePassword = "";
      state.typeError = "";
    });
  }
});
export const { resetInitialState } = authSlice.actions;
export default authSlice.reducer;
