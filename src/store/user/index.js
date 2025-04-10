import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const findUser = createAsyncThunk("user/findUser", async (values, {rejectWithValue}) => {
    try {
        const response = await api.get(
            `/api/v1/user/get/all/?page=${values?.page || 1}&limit=${values?.limit || 10}&role_id=${
                values?.role_id || ""
            }&company_id=${values?.company_id || ""}&deletedAt=null`,
        );
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const findUserWithoutFilter = createAsyncThunk(
    "user/findUserWithoutFilter",
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/v1/user/get/all/without_filter");
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getUser = createAsyncThunk("user/getUser", async (id, {rejectWithValue}) => {
    try {
        const response = await api.get(`/api/v1/user/get/${id}`);
        console.log("🌽 response", response);
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const createUser = createAsyncThunk("user/createUser", async (values, {rejectWithValue}) => {
    try {
        const response = await api.post("/api/v1/user/create", values);
        if (response?.status === 201) {
            return response?.data;
        }
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const editUser = createAsyncThunk(
    "user/editUser",
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/v1/user/update/${id}`, updatedData);
            return response?.data;
        } catch (error) {
            console.error("Error updating user:", error?.response?.data);
            toast.error(error?.response?.data?.message || "Failed to update user");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id, {rejectWithValue}) => {
    try {
        const response = await api.delete(`/api/v1/user/delete/${id}`);
        return response?.data;
    } catch (error) {
        console.error("Delete user error:", error);
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});
