import {toast} from "react-toastify";
import {api} from "../../utils/api";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllRoles = createAsyncThunk(
    "roles/getAllRoles",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/role/get/all?deletedAt=null&page=${values?.page || 1}&limit=${
                    values?.limit || 10
                }&company_id=${values?.company_id || ""}`,
            );
            if (response?.data?.message) return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const getRoleById = createAsyncThunk("roles/getRoleById", async (id, {rejectWithValue}) => {
    try {
        const response = await api.get(`/api/v1/role/get/${id}`);
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const findRoleWithoutFilter = createAsyncThunk(
    "user/findRoleWithoutFilter",
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/v1/role/get/all/without_filter");
            console.log("🦜 response", response);

            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const createRoles = createAsyncThunk(
    "roles/createRoles",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/role/add/roles", values);
            if (response?.status === 201) {
                return response?.data;
            }
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const editRole = createAsyncThunk(
    "roles/editRole",
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/v1/role/update/${id}`, updatedData);
            return response?.data;
        } catch (error) {
            console.error("Error updating roles:", error?.response?.data);
            toast.error(error?.response?.data?.message || "Failed to update roles");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteRole = createAsyncThunk("roles/deleteRole", async (id, {rejectWithValue}) => {
    try {
        const response = await api.delete(`/api/v1/role/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Delete roles error:", error);
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});
