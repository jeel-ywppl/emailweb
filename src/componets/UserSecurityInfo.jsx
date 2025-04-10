import {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../store";
import {getUser} from "../store/user";
import {useParams} from "react-router-dom";
import {Card, CardHeader, Typography} from "@material-tailwind/react";
import {CardContent} from "@mui/material";
import {Mail, Shield} from "lucide-react";
import {Key, AlertTriangle} from "lucide-react";

const UserSecurityInfo = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const [user, setUser] = useState(null);

    const getSingleUser = useCallback(
        async (ID) => {
            try {
                const response = await dispatch(getUser(ID)).unwrap();
                setUser(response.data);
                console.log("Fetched user data:", response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        },
        [dispatch],
    );

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id, getSingleUser]);

    return (
        <div className="grid grid-cols-1 gap-6 space-y-6">
            <Card>
                <CardHeader variant="gradient" color="gray">
                    <Typography
                        variant="h6"
                        color="white"
                        className="text-lg flex items-center gap-2 p-3"
                    >
                        <Shield className="h-5 w-5" />
                        Account Security
                    </Typography>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Login Status
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span
                                    className={`text-sm px-2 py-1 rounded-md text-white ${
                                        user?.loginAllowed ? "bg-green-500" : "bg-red-500"
                                    }`}
                                >
                                    {user?.loginAllowed ? "Allowed" : "Blocked"}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Two-Factor Authentication
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span
                                    className={`text-sm px-2 py-1 rounded-md text-white capitalize ${
                                        user?.twoFactorStatus ? "bg-blue-500" : "bg-gray-400"
                                    }`}
                                >
                                    {user?.twoFactorStatus ? "Enabled" : "Disabled"}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader variant="gradient" color="gray">
                    <Typography
                        variant="h6"
                        color="white"
                        className="text-lg flex items-center gap-2 p-3"
                    >
                        <Key className="h-5 w-5" />
                        Account Recovery
                    </Typography>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Recovery Email
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{user?.recovery_email || "Not set"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {!user?.active_status && (
                <Card className="border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-900">
                    <CardHeader variant="gradient" color="gray">
                        <Typography
                            variant="h6"
                            color="white"
                            className="text-lg flex items-center gap-2 text-red-600 dark:text-red-400 p-3"
                        >
                            <AlertTriangle className="h-5 w-5" />
                            Account Status Warning
                        </Typography>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-600 dark:text-red-400">
                            This account is currently inactive. The user cannot access the system
                            until the account is reactivated.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
export default UserSecurityInfo;
