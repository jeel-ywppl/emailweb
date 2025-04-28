import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {ChevronLeft} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { getUser } from "../../../store/user";
import UserDetailsHeader from "./UserDetailsHeader";
import UserBasicInfo from "./UserBasicInfo";
import UserSecurityInfo from "./UserSecurityInfo";
import Permission from "../../../pages/Permission"

const UserView = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("basic");
    const [userData, setUserData] = useState(null);

    const getSingleUser = useCallback(
        async (ID) => {
            try {
                const response = await dispatch(getUser(ID)).unwrap();
                setUserData(response.data);
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
                        className: "bg-black shadow-md rounded-md",
                    }}
                >
                    <Tab
                        value="basic"
                        onClick={() => setActiveTab("basic")}
                        className={`text-sm font-medium ${
                            activeTab === "basic" ? "text-white" : "text-black"
                        }`}
                    >
                        Basic Info
                    </Tab>
                    <Tab
                        value="security"
                        onClick={() => setActiveTab("security")}
                        className={`text-sm font-medium ${
                            activeTab === "security" ? "text-white" : "text-black"
                        }`}
                    >
                        Security
                    </Tab>
                    <Tab
                        value="permission"
                        onClick={() => setActiveTab("permission")}
                        className={`text-sm font-medium ${
                            activeTab === "permission" ? "text-white" : "text-black"
                        }`}
                    >
                        permission
                    </Tab>
                </TabsHeader>

                <TabsBody>
                    <TabPanel value="basic" className="mt-6 space-y-6">
                        <UserBasicInfo />
                    </TabPanel>
                    <TabPanel value="security" className="mt-6 space-y-6">
                        <UserSecurityInfo />
                    </TabPanel>
                    <TabPanel value="permission" className="mt-6 space-y-6">
                        <Permission />
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
};

export default UserView;
