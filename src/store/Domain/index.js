import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const findDomain = createAsyncThunk(
    "subDomain/findSubDomain",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/subdomain/get/all/?page=${values?.page || 1}&limit=${values?.limit || 10}`,
            );
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const findDomainWithoutFilter = createAsyncThunk(
    "subDomain/findSubDomainWithoutFilter",
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/v1/domain/get/all/without_filter");
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getDomain = createAsyncThunk(
    "subDomain/getSubDomain",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/v1/subdomain/get/${id}`);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const createDomain = createAsyncThunk(
    "subDomain/createSubDomain",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/subdomain/create", values);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteDomain = createAsyncThunk(
    "subDomain/deleteSubDomain",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.post(`/api/v1/subdomain/delete/${id}`);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
