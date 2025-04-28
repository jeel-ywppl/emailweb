import {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../../../store";
import {getClient} from "../../../store/client";
import {Card, CardHeader, Typography} from "@material-tailwind/react";
import {
    Building2,
    Database,
    Globe,
    Server,
    Users,
    Briefcase,
    Clock,
    Activity,
    ChevronLeft,
} from "lucide-react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {format} from "date-fns";
import {CardContent} from "@mui/material";
import Loader from "../../../componets/Loader";

const ClientDetail = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSingleClient = useCallback(
        async (ID) => {
            try {
                const response = await dispatch(getClient(ID)).unwrap();
                setClient(response?.data);
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        },
        [dispatch],
    );

    useEffect(() => {
        if (id) {
            getSingleClient(id);
        }
    }, [id, getSingleClient]);

    useEffect(() => {
        if (client) {
            setLoading(false);
        }
    }, [client]);

    return (
        <div className=" bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
            <div className="flex items-center mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Clients
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                    <Loader />
                </div>
            ) : (
                <div className="space-y-12">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden ">
                        <div className="bg-gradient-to-r from-[#131b2a] via-[#1e293b] to-[#334155] h-24" />
                        <div className="px-8 py-6 -mt-10">
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            {client?.client?.company_name}
                                        </h1>
                                        <p className="text-gray-500 flex items-center gap-2 text-sm">
                                            <Globe className="h-4 w-4" />
                                            {client?.client?.subdomain}
                                        </p>
                                    </div>
                                    <span
                                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                                            client?.client?.active_status
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        <Activity className="h-4 w-4" />
                                        {client?.client?.active_status ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border-none shadow-xl bg-gradient-to-br from-white to-purple-100 hover:shadow-2xl transition-all duration-300 transform  rounded-md">
                            <div className="pb-2 pt-6">
                                <div className="flex justify-between items-center mx-3">
                                    <h6 className=" font-medium text-gray-500 text-lg">
                                        Total Users
                                    </h6>
                                    <div className="bg-purple-200 rounded-full p-2  ">
                                        <Users className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                            <CardContent>
                                <div className="text-3xl font-bold text-purple-600">
                                    {client?.total_users}
                                </div>
                            </CardContent>
                        </div>

                        <div className="border-none shadow-xl bg-gradient-to-br from-white to-blue-100 hover:shadow-2xl transition-all duration-300 transform rounded-md">
                            <div className="pb-2 pt-6">
                                <div className="flex justify-between items-center mx-3">
                                    <h6 className="text-lg font-medium text-gray-500">
                                        Total Domains
                                    </h6>
                                    <div className="bg-blue-200 rounded-full p-2  ">
                                        <Globe className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-600">
                                    {client?.total_domains}
                                </div>
                            </CardContent>
                        </div>

                        <div className="border-none shadow-xl bg-gradient-to-br from-white to-[#d5fce8] hover:shadow-2xl transition-all duration-300 transform rounded-md">
                            <div className="pb-2 pt-6">
                                <div className="flex justify-between items-center mx-3">
                                    <h6 className="text-lg font-medium text-gray-500">
                                        Total Companies
                                    </h6>
                                    <div className="bg-[#c9f5de] rounded-full p-2">
                                        <Building2 className="h-5 w-5 text-emerald-600" />
                                    </div>
                                </div>
                            </div>
                            <CardContent>
                                <div className="text-3xl font-bold text-emerald-600">
                                    {client?.total_companies}
                                </div>
                            </CardContent>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 ">
                        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm lg:col-span-2">
                            <CardHeader className="p-4">
                                <Typography className="text-xl font-bold text-gray-800">
                                    Technical Details
                                </Typography>
                                <hr className="bg-indigo-100 container mx-auto " />
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-100 rounded-lg p-3 mt-1">
                                        <Database className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-800">
                                            MongoDB Name
                                        </p>
                                        <p className="text-sm text-gray-500 font-mono mt-1 bg-gray-50 p-2 rounded border border-gray-100 break-all">
                                            {client?.client?.mongoDbName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-200 rounded-lg p-3 mt-1">
                                        <Server className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-800">
                                            Port
                                        </p>
                                        <p className="text-sm text-gray-500 font-mono mt-1 bg-gray-50 p-1 rounded border border-gray-100">
                                            {client?.client?.port}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm lg:col-span-3">
                            <CardHeader className="p-4">
                                <Typography className="text-xl font-bold text-gray-800">
                                    Associated Companies
                                </Typography>
                                <hr className="bg-indigo-100 container mx-auto " />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {client?.companies.map((company) => (
                                        <div
                                            key={company?._id}
                                            className="p-5 rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="bg-gray-100 rounded-lg p-3 mt-1">
                                                    <Briefcase className="h-5 w-5 text-gray-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-semibold text-gray-800">
                                                            {company?.name}
                                                        </p>
                                                        <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full">
                                                            Default
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        Created on{" "}
                                                        {format(
                                                            new Date(company?.createdAt),
                                                            "PPP",
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDetail;
