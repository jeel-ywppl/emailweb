import {createSlice} from "@reduxjs/toolkit";
import {getRolePermissions} from "./index";

const initialState = {
    permissions: [],
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const permissionSlice = createSlice({
    name: "permissions",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getRolePermissions.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(getRolePermissions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.permissions = action?.payload?.data || [];
            state.status = "success";
        });
        builder.addCase(getRolePermissions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
            state.errorMessage = action.payload || "Failed to fetch permissions";
        });
    },
});

export default permissionSlice.reducer;
