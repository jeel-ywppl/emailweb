import {useEffect, useState} from "react";
import {
    Card,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography,
} from "@material-tailwind/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import {useAppDispatch} from "../../../store";
import {getDomainById} from "../../../store/Domain";
import DnsRecords from "./DNS Records";
import OpenDkim from "./Open DKIM";
import CheckDns from "./Check DNS";

const DnsSetting = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [dnsSetting, setDnsSetting] = useState();

    const [activeTab, setActiveTab] = useState("add_records");
    const [dnsCheckData, setDnsCheckData] = useState(); 
    console.log("🔥 dnsCheckData", dnsCheckData);

    useEffect(() => {
        const fetchDnsSetting = async () => {
            const response = await dispatch(getDomainById({_id: id}));
            if (response?.payload) {
                setDnsSetting(response?.payload?.data);
                setDnsCheckData(response?.payload?.dnsCheck); 
            }
        };
        fetchDnsSetting();
    }, [id, dispatch]);

    return (
        <div className="w-full p-6 space-y-6">
            <div className="flex items-center mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Domain
                </Link>
            </div>
            <Card className="p-4 border border-gray-300 space-y-4">
                <h2 className="text-lg font-semibold">Domain Details</h2>
                <div className="px-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Domain Name:
                            </Typography>
                            <Typography>{dnsSetting?.domain_name}</Typography>
                        </div>
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Company:
                            </Typography>
                            <Typography>{dnsSetting?.company_id?.name}</Typography>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Expiration Date:
                            </Typography>
                            <Typography>
                                {new Date(dnsSetting?.expiration_date).toLocaleDateString() ||
                                    "N/A"}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Status:
                            </Typography>
                            <Typography color={dnsSetting?.active_status ? "green" : "red"}>
                                {dnsSetting?.active_status ? "Active" : "Inactive"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>
            <Tabs value={activeTab} className="mt-6 w-full">
                <TabsHeader
                    className="bg-transparent border border-gray-200 dark:border-gray-700 max-w-md"
                    indicatorProps={{
                        className: "bg-black shadow-md rounded-md",
                    }}
                >
                    <Tab
                        value="add_records"
                        onClick={() => setActiveTab("add_records")}
                        className={`text-sm font-medium ${
                            activeTab === "add_records" ? "text-white" : "text-black"
                        }`}
                    >
                        Add Records
                    </Tab>
                    <Tab
                        value="open_dkim"
                        onClick={() => setActiveTab("open_dkim")}
                        className={`text-sm font-medium ${
                            activeTab === "open_dkim" ? "text-white" : "text-black"
                        }`}
                    >
                        Open DKIM
                    </Tab>
                    <Tab
                        value="check_dns"
                        onClick={() => setActiveTab("check_dns")}
                        className={`text-sm font-medium ${
                            activeTab === "check_dns" ? "text-white" : "text-black"
                        }`}
                    >
                        Check DNS
                    </Tab>
                </TabsHeader>

                <TabsBody>
                    <TabPanel value="add_records" className="mt-6 space-y-6">
                        <DnsRecords records={dnsSetting?.dns_records || []} />
                    </TabPanel>
                    <TabPanel value="open_dkim" className="mt-6 space-y-6">
                        <OpenDkim />
                    </TabPanel>
                    <TabPanel value="check_dns" className="mt-6 space-y-6">
                        <CheckDns dnsCheckData={dnsCheckData} />
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
};

export default DnsSetting;
