import {createSlice} from "@reduxjs/toolkit";
import {findBackupEmails} from ".";

const initialState = {
    data: [],
    selectedEmail: null,
    totalEmails: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const backupSlice = createSlice({
    name: "backup",
    initialState,
    reducers: {
        setLimit: (state, action) => {
            state.limit = action?.payload?.limit;

            state.status = "idle";
        },
        setSkip: (state, action) => {
            state.skip = action?.payload;

            state.status = "idle";
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action?.payload;
        },
        setStatus: (state, action) => {
            state.status = action?.payload?.status;
        },

        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(findBackupEmails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(findBackupEmails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action?.payload?.data || [];
            state.totalEmails = action?.payload?.pagination?.totalData;
            state.totalPages = action?.payload?.pagination?.totalPages;
            state.currentPage = action?.payload?.pagination?.pageNumber;
            state.limit = action?.payload?.pagination?.pageSize;
            state.status = "success";
        });
        builder.addCase(findBackupEmails.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setStatus, setSkip, totalEmails, totalPages, reset} =
    backupSlice.actions;
export default backupSlice.reducer;
