import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const findDomain = createAsyncThunk(
    "domain/findDomain",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/domain/get/all/?deletedAt=null&page=${values?.page || 1}&limit=${values?.limit || 10}`,
            );
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const findDomainWithoutFilter = createAsyncThunk(
    "domain/findDomainWithoutFilter",
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

export const getDomain = createAsyncThunk("domain/getDomain", async (id, {rejectWithValue}) => {
    try {
        const response = await api.get(`/api/v1/domain/get/${id}`);
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const createDomain = createAsyncThunk(
    "domain/createDomain",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/domain/create", values);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteDomain = createAsyncThunk(
    "domain/deleteDomain",
    async ({id, dns_id}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/v1/domain/delete/${id}`,{
                data:{dns_id}
            });
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const updateDomain = createAsyncThunk(
    "domain/updateDomain",
    async ({domainId, records}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/v1/domain/update/${domainId}`, records);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    },
);

export const getDomainById = createAsyncThunk(
    "domain/getDomainById",
    async ({_id}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/v1/domain/get/${_id}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    },
);
