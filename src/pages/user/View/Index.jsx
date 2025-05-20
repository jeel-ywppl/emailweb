import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {ChevronLeft} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../../store";
import {getUser} from "../../../store/user";
import UserDetailsHeader from "./UserDetailsHeader";
import UserBasicInfo from "./UserBasicInfo";
import UserSecurityInfo from "./UserSecurityInfo";
import Permission from "../../../pages/Permission";
import { useMaterialTailwindController } from "../../../context";

const UserView = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [controller] = useMaterialTailwindController();
    const {sidenavColor} = controller;

    const isWhite = sidenavColor === "white";

    const [activeTab, setActiveTab] = useState("basic");
    const [userData, setUserData] = useState(null);

    const getSingleUser = useCallback(
        async (ID) => {
            try {
                const response = await dispatch(getUser(ID)).unwrap();
                setUserData(response?.data);
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
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex items-center mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to User
                </Link>
            </div>
            <UserDetailsHeader user={userData} />
            <Tabs value={activeTab} className="mt-6 w-full">
                <TabsHeader
                    className="bg-transparent border border-gray-200 dark:border-gray-700 max-w-md"
                    indicatorProps={{
                        className: `shadow-md rounded-md `,
                        style: {
                            backgroundColor:
                                sidenavColor === "white"
                                    ? "#fff"
                                    : sidenavColor === "midnight"
                                    ? "#1e293b"
                                    : sidenavColor,
                        },
                    }}
                >
                    {["basic", "security", "permission"].map((tab) => (
                        <Tab
                            key={tab}
                            value={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-medium ${
                                activeTab === tab
                                    ? isWhite
                                        ? "text-black"
                                        : "text-white"
                                    : "text-black dark:text-white"
                            }`}
                        >
                            {tab === "add_records"
                                ? "Add Records"
                                : tab === "open_dkim"
                                ? "Open DKIM"
                                : "Check DNS"}
                        </Tab>
                    ))}
                </TabsHeader>

                <TabsBody>
                    <TabPanel value="basic" className="mt-6 space-y-6">
                        <UserBasicInfo user={userData} />
                    </TabPanel>
                    <TabPanel value="security" className="mt-6 space-y-6">
                        <UserSecurityInfo user={userData} />
                    </TabPanel>
                    <TabPanel value="permission" className="mt-6 space-y-6">
                        <Permission user={userData} />
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
};

export default UserView;
