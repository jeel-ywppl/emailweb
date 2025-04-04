import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const findBackupEmails = createAsyncThunk(
    "backup/findBackupEmails",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/mail/get/backup?${values?.status}&user_email=${values?.userEmail}&limit=${
                    values?.limit || 10
                }&page=${values?.page || 1}`,
            );
            return response?.data;
        } catch (error) {
            console.error("Error fetching backup emails:", error);
            toast.error(error?.response?.data?.message || "Failed to fetch backup emails");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const backupData = createAsyncThunk(
    "backup/backupData",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.put("/api/v1/mail/backup", values);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteBackupData = createAsyncThunk(
    "backup/deleteBackupData",
    async ({backup_email}, {rejectWithValue}) => {
        try {
            const response = await api.delete("/api/v1/mail/delete/backup", {
                data: {backup_email}, 
            });
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete backup!");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
