import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

export const findChartData = createAsyncThunk(
    "chart/findChartData",
    async ({filter, startDate, endDate, client}, {rejectWithValue}) => {
        try {
            const response = await api.get(
                `/api/v1/superadmin/dashboard/growth?filter=${filter || "all"}&client_id=${
                    client || ""
                }${startDate ? `&startDate=${startDate}` : ""}${
                    endDate ? `&endDate=${endDate}` : ""
                }`,
            );
            return response?.data;
        } catch (error) {
            console.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);
