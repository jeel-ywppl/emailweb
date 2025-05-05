import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
} from "recharts";
import {useAppDispatch, useAppSelector} from "../store";
import {useEffect, useState} from "react";
import {findChartData} from "../store/charts";
import {findClientWithoutFilter} from "../store/client";
import useCheckAccess from "../utils/useCheckAccess";

const timeOptions = [
    {label: "All", value: "all"},
    {label: "Day", value: "day"},
    {label: "Week", value: "week"},
    {label: "Month", value: "month"},
    {label: "Date Range", value: "range"},
];

export default function ChartWithFilters() {
    const dispatch = useAppDispatch();
    const checkAccess = useCheckAccess();
    const {chart, isLoading} = useAppSelector((state) => state.chart);
    const {noFilterClient} = useAppSelector((state) => state.client);

    const [timeFilter, setTimeFilter] = useState("all");
    const [client, setClient] = useState("");
    const [dates, setDates] = useState({start: "", end: ""});

    useEffect(() => {
        dispatch(findClientWithoutFilter());
    }, [dispatch]);

    useEffect(() => {
        const values = {
            filter: timeFilter,
            ...(timeFilter === "range" && {
                startDate: dates?.start,
                endDate: dates?.end,
            }),
            client,
        };

        dispatch(findChartData(values));
    }, [timeFilter, dates, client, dispatch]);

    let chartData = [];

    if (timeFilter === "all") {
        const totals = chart?.totals;
        if (totals?.length) {
            chartData = totals.map((item) => ({
                label: item.dbName,
                userGrowth: item.users,
                clientGrowth: item.clients,
            }));
        }
    } else {
        let chartKey = "daily";
        if (timeFilter === "week") chartKey = "daily";
        else if (timeFilter === "month") chartKey = "weekly";

        if (chart?.growth) {
            if (chart?.growth[chartKey]?.length > 0) {
                chartData = chart?.growth[chartKey];
            } else {
                chartData = [
                    {
                        label: "Total",
                        userGrowth: chart?.growth?.total?.userGrowth,
                        clientGrowth: chart?.growth?.total?.clientGrowth,
                    },
                ];
            }
        }
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <Typography>Growth Chart</Typography>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
                    <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="w-40 border px-2 py-1 rounded"
                    >
                        {timeOptions.map((t) => (
                            <option key={t?.value} value={t?.value}>
                                {t?.label}
                            </option>
                        ))}
                    </select>

                    {timeFilter === "range" && (
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                className="border px-2 py-1 rounded"
                                value={dates?.start}
                                onChange={(e) =>
                                    setDates((prev) => ({...prev, start: e.target.value}))
                                }
                                max={dates?.end || undefined}
                            />
                            <span>-</span>
                            <input
                                type="date"
                                className="border px-2 py-1 rounded"
                                value={dates?.end}
                                onChange={(e) =>
                                    setDates((prev) => ({...prev, end: e.target.value}))
                                }
                                min={dates?.start || undefined}
                            />
                        </div>
                    )}

                    {checkAccess("home", "create") && (
                        <select
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            className="w-48 border px-2 py-1 rounded"
                        >
                            <option value="">All Clients</option>
                            {noFilterClient.map((c) => (
                                <option key={c?._id} value={c?._id}>
                                    {c?.company_name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="w-full h-72">
                    {isLoading ? (
                        <p>Loading chart...</p>
                    ) : chartData.length === 0 ? (
                        <p>No chart data available.</p>
                    ) : (
                        <ResponsiveContainer>
                            <LineChart data={chartData}>
                                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="userGrowth"
                                    stroke="#1A365D"
                                    strokeWidth={2}
                                    dot={{r: 4}}
                                    name="User Growth"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="clientGrowth"
                                    stroke="#F97316"
                                    strokeWidth={2}
                                    dot={{r: 4}}
                                    name="Client Growth"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
