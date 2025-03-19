import {createSlice} from "@reduxjs/toolkit";
import {getItem, removeItem, setItem} from "../../utils/localStorage";
import {authenticateUser, getUserInfo, verifyOTPFor2FA} from "./index"; // Import OTP action
import {setAuthToken} from "../../utils/api";

const user = {
    _id: "",
    fname: "",
    lname: "",
    role_id: {
        _id: "",
        role_id: null,
        role_name: "",
    },
    email: "",
    password: "",
    recovery: {
        recovery_email: "",
        recovery_otp: null,
        otp_expire_time: "",
    },
    loginAllowed: false,
    country: "",
    phone_number: "",
    avatar: "",
    twoFactorSecret: "",
    twoFactorStatus: false,
    active_status: false,
    fcm_token: "",
    deletedAt: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
};

const accessToken = getItem("AUTH_KEY");

const initialState = {
    accessToken: accessToken || "",
    user: user,
    isError: false,
    status: "idle",
    isLoading: false,
    isSuccess: false,
    isUserLoggedIn: !!accessToken,
    errorMessage: "",
    is2FAEnabled: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUserFromLoacal: (state) => {
            state.accessToken = "";
            state.isError = false;
            state.isLoading = false;
            state.user = user;
            state.isUserLoggedIn = false;
            state.is2FAEnabled = false;
            removeItem("AUTH_KEY");
        },
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.status = "pending";
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.accessToken = !action?.payload?.otpRequired ? action?.payload?.token : "";
            state.user = action.payload;
            state.is2FAEnabled = action.payload?.twoFactorStatus || false;
            if (!action?.payload?.otpRequired) {
                setItem("AUTH_KEY", action.payload?.token);
                setAuthToken(action.payload?.token);
            }
            state.isError = false;
            state.isSuccess = false;
            state.status = "succeeded";
        });
        builder.addCase(authenticateUser.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.status = "failed";
        });

        builder.addCase(verifyOTPFor2FA.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.status = "pending";
        });
        builder.addCase(verifyOTPFor2FA.fulfilled, (state, action) => {
            state.accessToken = action?.payload?.token;
            setItem("AUTH_KEY", action.payload?.token);
            setAuthToken(action.payload?.token);
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.status = "succeeded";
        });
        builder.addCase(verifyOTPFor2FA.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.status = "failed";
        });

        builder.addCase(getUserInfo.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.status = "pending";
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload?.data;
            state.is2FAEnabled = action.payload?.data?.twoFactorStatus || false;
            state.isUserLoggedIn = true;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.status = "succeeded";
        });
        builder.addCase(getUserInfo.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.status = "failed";
        });
    },
});

export const {logoutUserFromLoacal, login} = authSlice.actions;
export default authSlice.reducer;
