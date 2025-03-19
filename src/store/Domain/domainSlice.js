import {createSlice} from "@reduxjs/toolkit";
import {findDomain, findDomainWithoutFilter} from "./index";

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

const domainSlice = createSlice({
    name: "domain",
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
        builder.addCase(findDomain.pending, (state) => {
            state.isLoading = true;
            state.isError = true;
            state.status = "pending";
        });
        builder.addCase(findDomain.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload?.data;
            state.totalRecords = action.payload?.pagination?.totalData 
            state.currentPage = action.payload?.pagination?.pageNumber
            state.limit = action.payload?.pagination?.pageSize
            state.status = "success";
        });
        builder.addCase(findDomain.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });

        builder.addCase(findDomainWithoutFilter.pending, (state) => {
            state.isLoading = true;
            state.isError = true;
            state.status = "pending";
        });
        builder.addCase(findDomainWithoutFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.noFilterData = action.payload?.data;
            state.totalRecords = action.payload?.data?.length;
            state.status = "success";
        });
        builder.addCase(findDomainWithoutFilter.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setSkip, setStatus} = domainSlice.actions;
export default domainSlice.reducer;
