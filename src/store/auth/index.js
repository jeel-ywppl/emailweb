import {createAsyncThunk} from "@reduxjs/toolkit";
import {logoutUserFromLoacal} from "./authSlice.js";
import {api, setAuthToken} from "../../utils/api.js";
import {getItem} from "../../utils/localStorage.js";
import {successToastHandler, toastHandler} from "../../utils/toastUtils.js";

export const authenticateUser = createAsyncThunk(
    "auth/authenticateUser",
    async (values, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/user/login", values);
            setAuthToken(response?.data?.token);
            successToastHandler(response.data?.message);
            return response?.data;
        } catch (error) {
            toastHandler(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const getUserInfo = createAsyncThunk(
    "auth/getUserInfo",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get("api/v1/user/info");
            return response?.data;
        } catch (error) {
            dispatch(logoutUserFromLoacal());
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const logOutUser = createAsyncThunk("auth/logOutUser", async (_, {rejectWithValue}) => {
    try {
        const token = getItem("AUTH_KEY");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await api.post("/api/v1/user/logout", {}, config);
        return response?.data;
    } catch (error) {
        toastHandler(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const verifyPasswordFor2FA = createAsyncThunk(
    "auth/verifyPasswordFor2FA",
    async ({password, onoffStatus}, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/user/verify_password", {
                password,
                onoff_status: onoffStatus,
            });
            console.log(response?.data?.message);
            return response?.data;
        } catch (error) {
            toastHandler(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const verifyOTPFor2FA = createAsyncThunk(
    "auth/verifyOTPFor2FA",
    async ({email, otp, tfaStatus}, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/user/verify_otp", {
                email,
                otp,
                tfa_status: tfaStatus,
            });
            console.log(response?.data?.message);
            return response?.data;
        } catch (error) {
            toastHandler(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const send2FARecoveryOTP = createAsyncThunk(
    "auth/send2FARecoveryOTP",
    async ({onoff_status}, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/user/2fa_recovery_send_otp", {onoff_status});
            console.log(response?.data?.message);
            return response?.data;
        } catch (error) {
            console.error(error?.response?.data?.message || "Failed to send OTP");
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const verify2FARecoveryOTP = createAsyncThunk(
    "auth/verify2FARecoveryOTP",
    async ({otp, onoff_status}, {rejectWithValue}) => {
        try {
            const response = await api.post("/api/v1/user/2fa_recovery_verify_otp", {
                otp,
                onoff_status,
            });
            return response.data;
        } catch (error) {
            console.error("API Error Response:", error.response?.data);
            return rejectWithValue(error.response?.data?.message || "OTP verification failed");
        }
    },
);
