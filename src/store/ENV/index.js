import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const findEnv = createAsyncThunk("env/findEnv", async (values, {rejectWithValue}) => {
    try {
        const response = await api.get("/api/v1/env/get/all");
        return response?.data;
    } catch (error) {
        console.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const createEnv = createAsyncThunk("env/createEnv", async (values, {rejectWithValue}) => {
    try {
        const response = await api.post("/api/v1/env/create", values);
        return response?.data;
    } catch (error) {
        console.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const deleteEnv = createAsyncThunk("env/deleteEnv", async (key, {rejectWithValue}) => {
    try {
        const response = await api.delete(`/api/v1/env/delete/${key}`);
        return response?.data;
    } catch (error) {
        console.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const updateEnv = createAsyncThunk("env/updateEnv", async (values, {rejectWithValue}) => {
    try {
        const response = await api.put("/api/v1/env/update", values);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const restartPm = createAsyncThunk("env/restartPm", async (_, {rejectWithValue}) => {
    try {
        const response = await api.post("/api/v1/env/restart/pm2");
        console.log("🐷 response", response);

        return response?.data;
    } catch (error) {
        console.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});
