import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const getAllEmailbyUser = createAsyncThunk(
    "email/getAllEmailbyUser",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/mail/get/sent/by_user?page=${values?.page}&limit=${values?.limit}&${values?.status}`,
            );
            if (response?.data?.message) return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch emails");
            return rejectWithValue(error?.response?.data || "Failed to fetch emails");
        }
    },
);

export const getSinglMail = createAsyncThunk(
    "email/getSinglMail",
    async (email_id, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/v1/mail/get/${email_id}`);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const sendMail = createAsyncThunk("email/sendMail", async (mailData, {rejectWithValue}) => {
    try {
        const response = await api.post("/api/v1/mail/send", mailData);
        // toast.success("Email sent successfully!");
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to send email");
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const changeEmailStatus = createAsyncThunk(
    "email/changeStatus",
    async (payload, {rejectWithValue}) => {
        try {
            const response = await api.put("/api/v1/mail/status_change", payload);
            // toast.success(response?.data?.message);
            return response?.data;
        } catch (error) {
            console.error("Error changing email status:", error?.response?.data);
            toast.error(error?.response?.data?.message || "Failed to change email status");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const replyMail = createAsyncThunk(
    "email/replyMail",
    async (mailData, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/mail/replyOrForward", mailData);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send email");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
