import { createSlice } from "@reduxjs/toolkit";
import { findCompany, findCompanyWithoutFilter } from ".";

const initialState = {
    data: [],
    noFilterData: [],
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

const companySlice = createSlice({
    name: "Company",
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
        builder.addCase(findCompany.pending, (state) => {
            state.isLoading = true;
            state.isError = false; 
            state.status = "pending";
        });
        builder.addCase(findCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false; 
            state.data = action.payload.data;
            state.totalRecords = action.payload.pagination.totalData;
            state.currentPage = action.payload.pagination.pageNumber;
            state.limit = action.payload.pagination.pageSize; 
            console.log("Companies fetched successfully:", action.payload.data);
            state.status = "success";
        });
        builder.addCase(findCompany.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });

        builder.addCase(findCompanyWithoutFilter.pending, (state) => {
            state.isLoading = true;
            state.isError = false; 
            state.status = "pending";
        });
        builder.addCase(findCompanyWithoutFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.noFilterData = action.payload.data; 
            state.totalRecords = action.payload.data.length; 
            state.status = "success";
        });
        builder.addCase(findCompanyWithoutFilter.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const { setCurrentPage, setLimit, setSkip, setStatus } = companySlice.actions;
export default companySlice.reducer;
