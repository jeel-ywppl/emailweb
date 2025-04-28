import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

export const getAllDraftsbyUser = createAsyncThunk(
    "draft/getAllDraftsbyUser",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/mail/draft/get?page=${values?.page}&limit=${values?.limit}`,
            );
            if (response?.data?.message) 
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch drafts");
            return rejectWithValue(error?.response?.data || "Failed to fetch drafts");
        }
    },
);

export const updateDraft = createAsyncThunk(
    "draft/updateDraft",
    async (formData, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/mail/draft/save", formData);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send draft");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getDraftById = createAsyncThunk(
    "draft/getDraftById",
    async (draft_id, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/v1/mail/draft/get/${draft_id}`);
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch draft");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const deleteDraft = createAsyncThunk(
    "draft/deleteDraft",
    async ({draft_ids}, {rejectWithValue}) => {
        try {
            const response = await api.delete("/api/v1/mail/draft/delete", {
                data: {draft_ids},
            });

            // toast.success(response?.data?.message || "Backup deleted successfully!");
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete draft!");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
