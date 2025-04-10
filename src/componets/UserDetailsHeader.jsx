import {UserCog, Mail, Phone, CalendarDays} from "lucide-react";
import {Avatar} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../store";
import {useCallback, useEffect, useState} from "react";
import {getUser} from "../store/user";
import {config} from "../utils/util";

const UserDetailsHeader = () => {
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

    const userInitials =
        user?.fname && user?.lname
            ? `${user?.fname.charAt(0)}${user?.lname.charAt(0)}`.toUpperCase()
            : "NA";

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex flex-col md:flex-row gap-6 items-center ">
                <div className="w-32 h-32">
                    {user?.avatar ? (
                        <Avatar
                            src={
                                user?.avatar?.startsWith("http")
                                    ? user.avatar
                                    : `${config.BASE_URL}/${user.avatar}`
                            }
                            alt={`${user?.fname} ${user?.lname}`}
                            variant="circular"
                            className="w-32 h-32 object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl font-bold">
                            {userInitials}
                        </div>
                    )}
                </div>

                <div className="space-y-3 text-center md:text-left flex-1">
                    <div>
                        <h1 className="text-2xl font-bold flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                            {user?.fname} {user?.lname}
                            <span
                                className={`ml-0 sm:ml-2 inline-flex px-2 py-1 rounded-full text-sm font-medium text-xs ${
                                    user?.active_status
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                }`}
                            >
                                {user?.active_status ? "Active" : "Inactive"}
                            </span>
                        </h1>

                        <p className="text-gray-500 text-sm">
                            {user?.designation || "No Designation"}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{user?.email}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{user?.phone_number || "Not provided"}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <UserCog className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{user?.role_id?.role_name}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                                Updated {new Date(user?.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsHeader;
