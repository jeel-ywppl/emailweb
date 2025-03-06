import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const getAllEmailbyUser = createAsyncThunk(
    "email/getAllEmailbyUser",
    async (
        {
            page = 1,
            limit = 10,
            star_status,
            archive_status,
            received_status,
            send_status,
            trash_status,
        },
        {rejectWithValue},
    ) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);
            params.append("limit", limit);
            if (star_status !== undefined) params.append("star_status", star_status);
            if (archive_status !== undefined) params.append("archive_status", archive_status);
            if (received_status !== undefined) params.append("received_status", received_status);
            if (send_status !== undefined) params.append("send_status", send_status);
            if (trash_status !== undefined) params.append("trash_status", trash_status);

            const response = await api.get(`/api/v1/mail/get/sent/by_user?${params.toString()}`);
            console.log("API Response:", response);
            if (response?.data?.message) {
                toast.success(response.data.message);
            }
            return response.data;
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
        toast.success("Email sent successfully!");
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
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error) {
            console.error("Error changing email status:", error?.response?.data);
            toast.error(error?.response?.data?.message || "Failed to change email status");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
