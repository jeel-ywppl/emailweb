import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const getAllEmailbyUser = createAsyncThunk(
    "email/getAllEmailbyUser",
    async (values,{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/v1/mail/get/sent/by_user?page=${values.page}&limit=${values.limit}&received_status=${values.received_status}`);
            console.log("API Response:", response);
            if (response?.data?.message) {
                toast.success(response?.data?.message);
            }
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch emails");
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

export const sendMail = createAsyncThunk(
    "email/sendMail",
    async (mailData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/mail/send', mailData);
            toast.success("Email sent successfully!");
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send email");
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);