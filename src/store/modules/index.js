import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const findModules = createAsyncThunk("modules/findModules", async (_, {rejectWithValue}) => {
    try {
        const response = await api.get("/api/v1/module/get/all");
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const createModule = createAsyncThunk(
    "modules/createModule",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/module/add", values);
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

export const editModule = createAsyncThunk(
    "modules/editModule",
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/v1/module/update/${id}`, updatedData);
            return response?.data;
        } catch (error) {
            console.error("Error updating modules:", error?.response?.data);
            toast.error(error?.response?.data?.message || "Failed to update modules");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteModule = createAsyncThunk(
    "modules/deleteModule",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/v1/module/delete/${id}`);
            return response?.data;
        } catch (error) {
            console.error("Delete modules error:", error);
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);


