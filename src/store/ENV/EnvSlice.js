import {createSlice} from "@reduxjs/toolkit";
import {findEnv} from "./index";

const initialState = {
    env: [],
    status: "idle",
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const envSlice = createSlice({
    name: "env",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(findEnv.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.status = "pending";
        });
        builder.addCase(findEnv.fulfilled, (state, action) => {
            state.isLoading = false;
            state.env = action?.payload?.data;
            console.log("🥑  state.env ",  state.env );

            state.status = "success";
        });
        builder.addCase(findEnv.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.status = "fail";
        });
    },
});

export default envSlice.reducer;
