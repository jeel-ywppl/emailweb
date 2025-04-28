import {createSlice} from "@reduxjs/toolkit";
import {getAllDraftsbyUser} from "./index";

const initialState = {
    drafts: [],
    totalData: 0,
    totalPages: 0,
    pageNumber: 1,
    limit: 10,
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const draftSlice = createSlice({
    name: "drafts",
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
        builder.addCase(getAllDraftsbyUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(getAllDraftsbyUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.drafts = action?.payload?.data || [];
            state.totalData = action?.payload?.pagination?.totalData;
            state.totalPages = action?.payload?.pagination?.totalPages;
            state.pageNumber = action?.payload?.pagination?.pageNumber;
            state.pageSize = action?.payload?.pagination?.pageSize;
            state.status = "success";
        });
        builder.addCase(getAllDraftsbyUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setStatus, setSkip, totalEmails, totalPages, reset} =
    draftSlice.actions;
export default draftSlice.reducer;
