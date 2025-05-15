import { createAsyncThunk } from "@reduxjs/toolkit";

import { registerAuth, updateAuthMe } from "@/service/auth";

export const registerAuthAsync = createAsyncThunk("auth/register", async (data: any) => {
        const response = await registerAuth(data);
        if (response?.data) {
            return response.data;
        }
        return {
            data: null,
            message: response?.response?.data?.message,
            typeError: response?.respones?.data?.typeError,
        };
    }
  );
export const updateAuthMeAsync = createAsyncThunk("auth/update-me", async (data: any) => {
    const response = await updateAuthMe(data);
    if (response?.data) {
        return response.data;
    }
    return {
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.respones?.data?.typeError,
    };
}
);