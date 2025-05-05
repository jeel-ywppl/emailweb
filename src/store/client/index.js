import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const findClient = createAsyncThunk(
    "client/findClient",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/v1/superadmin/clients/get/all", values);
            return response?.data;
        } catch (error) {
            console.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getClient = createAsyncThunk("client/getClient", async (id, {rejectWithValue}) => {
    try {
        const response = await api.get(`/api/v1/superadmin/clients/data/${id}`);
        return response?.data;
    } catch (error) {
        console.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const findClientWithoutFilter = createAsyncThunk(
    "company/findClientWithoutFilter",
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/v1/superadmin/clients/get/nofilter");
            return response?.data;
        } catch (error) {
            console.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const createClient = createAsyncThunk(
    "client/createClient",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/superadmin/clients/create", values);
            return response?.data;
        } catch (error) {
            console.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteClient = createAsyncThunk(
    "client/deleteClient",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/v1/superadmin/clients/delete/${id}`);
            return response?.data;
        } catch (error) {
            console.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const editClient = createAsyncThunk(
    "client/editClient",
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/v1/superadmin/clients/update/${id}`, updatedData);
            return response?.data;
        } catch (error) {
            console.error("Error updating user:", error?.response?.data);
            console.error(error?.response?.data?.message || "Failed to update user");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
