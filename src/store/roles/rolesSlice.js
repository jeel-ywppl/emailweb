import {createSlice} from "@reduxjs/toolkit";
import {findRoleWithoutFilter, getAllRoles} from "./index";

const initialState = {
    roles: [],
    noFilterRole: [],
    totalData: 0,
    totalPages: 0,
    pageNumber: 1,
    pageSize: 10,
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setLimit: (state, action) => {
            state.pageSize = action.payload.pageSize;
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
        builder.addCase(getAllRoles.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(getAllRoles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.roles = action?.payload?.data;
            console.log("🦜 state.roles", state.roles);

            state.totalData = action?.payload?.pagination?.totalData;
            state.totalPages = action?.payload?.pagination?.totalPages;
            state.pageNumber = action?.payload?.pagination?.pageNumber;
            state.pageSize = action?.payload?.pagination?.pageSize;
            state.status = "success";
        });
        builder.addCase(getAllRoles.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
        builder.addCase(findRoleWithoutFilter.pending, (state) => {
            state.isLoading = true;
            state.isError = true;
            state.status = "pending";
        });
        builder.addCase(findRoleWithoutFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.noFilterRole = action?.payload?.data;
            console.log("🌭 state.noFilterRole", state.noFilterRole);

            state.totalData = action?.payload?.data?.length;
            state.status = "success";
        });
        builder.addCase(findRoleWithoutFilter.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export const {setCurrentPage, setLimit, setStatus, setSkip, totalData, totalPages, reset} =
    roleSlice.actions;
export default roleSlice.reducer;
