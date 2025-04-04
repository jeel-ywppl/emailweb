import {createSlice} from "@reduxjs/toolkit";
import {findModules} from "./index";

const initialState = {
    modules: [],
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const moduleSlice = createSlice({
    name: "modules",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(findModules.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(findModules.fulfilled, (state, action) => {
            state.isLoading = false;
            state.modules = action?.payload?.data;
            console.log("🍅  state.module",  state.modules);

            state.status = "success";
        });
        builder.addCase(findModules.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export default moduleSlice.reducer;
