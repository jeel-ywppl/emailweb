import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const findCompany = createAsyncThunk(
    "Company/findCompany",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/company/get/all?deletedAt=null&page=${values?.page || 1}&limit=${
                    values?.limit || 10
                }`,
            );
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const findCompanyWithoutFilter = createAsyncThunk(
    "Company/findCompanyWithoutFilter",
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/v1/company/get/all/without_filter");
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getCompany = createAsyncThunk("Company/getCompany", async (id, {rejectWithValue}) => {
    try {
        const response = await api.get(`/api/v1/company/get/${id}`);
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const createCompany = createAsyncThunk(
    "Company/createCompany",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/company/create", values);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteCompany = createAsyncThunk(
    "Company/deleteCompany",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/v1/company/delete/${id}`);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const editCompany = createAsyncThunk(
    "Company/editCompany",
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/v1/company/update/${id}`, updatedData);
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error) {
            console.error("Error updating user:", error?.response?.data);
            toast.error(error?.response?.data?.message || "Failed to update user");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
