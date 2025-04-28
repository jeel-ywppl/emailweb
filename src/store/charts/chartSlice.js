import {createSlice} from "@reduxjs/toolkit";
import {findChartData} from ".";

const initialState = {
    chart: [],
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

const chartSlice = createSlice({
    name: "chart",
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
        builder.addCase(findChartData.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(findChartData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.chart = action?.payload?.data || []; 
            state.totalRecords = action?.payload?.data?.pagination?.totalData || 0;
            state.currentPage = action?.payload?.data?.pagination?.pageNumber || 0;
            state.limit = action?.payload?.data?.pagination?.pageSize || 10;
            state.status = "success";
        });

        builder.addCase(findChartData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setSkip, setStatus} = chartSlice.actions;
export default chartSlice.reducer;
