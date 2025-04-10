import {useEffect, useState, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getUser} from "../store/user";
import {ArrowLeft} from "lucide-react";
import {Button, Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import UserDetailsHeader from "../componets/UserDetailsHeader";
import UserBasicInfo from "../componets/UserBasicInfo";
import UserSecurityInfo from "../componets/UserSecurityInfo";
import {useAppDispatch} from "../store";
import Permission from "./Permission";

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
            <div className="flex justify-between items-center mb-6">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
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
                        <UserBasicInfo  />
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
