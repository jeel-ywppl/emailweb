import {createSlice} from "@reduxjs/toolkit";
import {findUser, findUserWithoutFilter} from "./index";

const initialState = {
    data: [],
    noFilterData: [],
    selecteduser: null,
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLimit: (state, action) => {
            state.limit = action?.payload?.limit;
            state.status = "idle";
        },
        setSkip: (state, action) => {
            state.skip = action?.payload?.skip;
            state.status = "idle";
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action?.payload?.currentPage;
        },
        setStatus: (state, action) => {
            state.status = action?.payload?.status;
        },
        reset: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(findUser.pending, (state) => {
            state.isLoading = true;
            state.isError = true;
            state.status = "pending";
        });
        builder.addCase(findUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action?.payload?.data;
            state.totalRecords = action?.payload?.pagination?.totalData;
            state.status = "success";
        });
        builder.addCase(findUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });

        builder.addCase(findUserWithoutFilter.pending, (state) => {
            state.isLoading = true;
            state.isError = true;
            state.status = "pending";
        });
        builder.addCase(findUserWithoutFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.noFilterData = action?.payload?.data;
            state.totalRecords = action?.payload?.data?.length;
            state.status = "success";
        });
        builder.addCase(findUserWithoutFilter.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setSkip, setStatus} = userSlice.actions;
export default userSlice.reducer;
