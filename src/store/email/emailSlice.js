import {createSlice} from "@reduxjs/toolkit";
import {getAllEmailbyUser, getSinglMail} from "./index";

const initialState = {
    emails: [],
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

const emailSlice = createSlice({
    name: "emails",
    initialState,
    reducers: {
        setLimit: (state, action) => {
            state.limit = action.payload.limit;
            state.status = "idle";
        },
        setSkip: (state, action) => {
            state.skip = action.payload.skip;
            state.status = "idle";
        },
        setCurrentPage: (state, action) => {
            state.pageNumber = action.payload.pageNumber;
        },
        setStatus: (state, action) => {
            state.status = action.payload.status;
        },

        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEmailbyUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(getAllEmailbyUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.emails = action?.payload?.data || [];
            state.totalEmails = action?.payload?.pagination?.totalData;
            state.totalPages = action?.payload?.pagination?.totalPages;
            state.currentPage = action?.payload?.pagination?.pageNumber;
            state.limit = action?.payload?.pagination?.pageSize;
            state.status = "success";
        });
        builder.addCase(getAllEmailbyUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
        builder.addCase(getSinglMail.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getSinglMail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedEmail = action?.payload?.data?.email;
        });
        builder.addCase(getSinglMail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action?.payload || "Failed to fetch email";
        });
    },
});

export const {setCurrentPage, setLimit, setStatus, setSkip, totalEmails, totalPages, reset} =
    emailSlice.actions;
export default emailSlice.reducer;
