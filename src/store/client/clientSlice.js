import {createSlice} from "@reduxjs/toolkit";
import {findClient, findClientWithoutFilter} from ".";

const initialState = {
    client: [],
    noFilterClient: [],
    skip: 0,
    limit: 10,
    totalRecords: 1,
    currentPage: 0,
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const clientSlice = createSlice({
    name: "client",
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
            state.currentPage = action.payload.currentPage;
        },
        setStatus: (state, action) => {
            state.status = action.payload.status;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(findClient.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(findClient.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.client = action?.payload?.data || [];
            state.totalRecords = action?.payload?.data?.pagination?.totalData || 0;
            state.currentPage = action?.payload?.data?.pagination?.pageNumber || 0;
            state.limit = action?.payload?.data?.pagination?.pageSize || 10;
            state.status = "success";
        });

        builder.addCase(findClient.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
        builder.addCase(findClientWithoutFilter.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(findClientWithoutFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.noFilterClient = action?.payload?.data;
            state.totalRecords = action?.payload?.data?.length;
            state.status = "success";
        });
        builder.addCase(findClientWithoutFilter.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setSkip, setStatus} = clientSlice.actions;
export default clientSlice.reducer;
