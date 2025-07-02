import { createAsyncThunk } from "@reduxjs/toolkit";

import { TParamsGetRoles } from "@/types/role";
import { getAllRole } from "@/service/role";

export const getAllRolesAsync = createAsyncThunk(
  "role/get-all",
  async (data: { params: TParamsGetRoles }) => {
    const response = await getAllRole(data);
    return response.data;
  }
);
