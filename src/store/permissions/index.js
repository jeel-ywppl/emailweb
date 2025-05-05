import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const addUpdatePermissions = createAsyncThunk(
    "permissions/addUpdatePermissions",
    async ({role_id, user_id, permissions}, {rejectWithValue}) => {
        try {
            const response = await api.post(
                `/api/v1/users/add_or_update/permissions?role_id=${role_id || ""}&user_id=${
                    user_id || ""
                }`,
                {
                    permissions,
                },
            );

            return response?.data;
        } catch (error) {
            console.error("Error updating roles:", error?.response?.data);
            console.error(error?.response?.data?.message || "Failed to update roles");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getRolePermissions = createAsyncThunk(
    "permissions/getRolePermissions",
    async (data, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/users/get/permissions?role_id=${data?.role_id || ""}&user_id=${
                    data?.user_id || ""
                }`,
            );
            return response?.data;
        } catch (error) {
            console.error("Error fetching permissions:", error?.response?.data);
            console.error(error?.response?.data?.message || "Failed to fetch permissions");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const resetUserPermissions = createAsyncThunk(
    "permissions/resetUserPermissions",
    async (userId, {rejectWithValue}) => {
        try {
            const response = await api.post(`/api/v1/users/reset/permissions/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error resetting permissions:", error?.response?.data);
            return rejectWithValue(error?.response?.data?.message || "Failed to reset permissions");
        }
    },
);
