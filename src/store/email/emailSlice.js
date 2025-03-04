import {createSlice} from "@reduxjs/toolkit";
import { getAllEmailbyUser, getSinglMail} from "./index";

const initialState = {
    emails: [],
    selectedEmail: null,
    totalEmails: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 100,
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
            state.limit = action.payload;
            state.status = "idle";
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
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
            state.emails = action?.payload?.data;
            state.totalEmails = action?.payload?.totalEmails;
            state.totalPages = action?.payload?.totalPages;
            state.currentPage = action?.payload?.currentPage;
            state.limit = action?.payload?.limit;
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
        })
        builder.addCase(getSinglMail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedEmail = action.payload;
        })
        builder.addCase(getSinglMail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });
    },
});

export const {setCurrentPage, setLimit, setStatus, reset} = emailSlice.actions;
export default emailSlice.reducer;
