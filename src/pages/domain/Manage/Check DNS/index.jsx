import {useState} from "react";
import renderOverview from "./View/renderOverview";
import renderMXRecords from "./View/renderMXRecords";
import renderSPFRecord from "./View/renderSPFRecord";
import renderDMARCRecord from "./View/renderDMARCRecord";
import renderDKIMRecords from "./View/renderDKIMRecords";
import renderDNSInfo from "./View/renderDNSInfo";
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";
import {Globe} from "lucide-react";
import PropTypes from "prop-types";
import {useMaterialTailwindController} from "../../../../context";

const tabData = [
    {label: "Overview", value: "overview", render: (data) => renderOverview({dnsCheckData: data})},
    {label: "MX Records", value: "mx", render: (data) => renderMXRecords({dnsCheckData: data})},
    {label: "SPF", value: "spf", render: (data) => renderSPFRecord({dnsCheckData: data})},
    {label: "DMARC", value: "dmarc", render: (data) => renderDMARCRecord({dnsCheckData: data})},
    {label: "DKIM", value: "dkim", render: (data) => renderDKIMRecords({dnsCheckData: data})},
    {label: "DNS Info", value: "dns", render: (data) => renderDNSInfo({dnsCheckData: data})},
];

const DNSResults = ({dnsCheckData}) => {
    const [controller] = useMaterialTailwindController();
    const {sidenavColor} = controller;

    const isWhite = sidenavColor === "white";

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-2xl font-bold flex items-center">
                    <Globe className="text-dns-purple mr-2 h-6 w-6" />
                    DNS Results for{" "}
                    <span className="text-dns-purple ml-2">{dnsCheckData?.domain}</span>
                </h2>
            </div>

            <div className="p-6">
                <Tabs value={activeTab} onChange={(val) => setActiveTab(val)}>
                    <TabsHeader
                        className="bg-gray-100 rounded-lg mb-6"
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
                        {tabData.map(({label, value}) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={`text-sm font-medium ${
                                    activeTab === value
                                        ? isWhite
                                            ? "text-black"
                                            : "text-white"
                                        : "text-black dark:text-white"
                                }`}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>

                    <TabsBody>
                        {tabData.map(({value, render}) => (
                            <TabPanel key={value} value={value}>
                                {render(dnsCheckData)}
                                {console.log("🍏 dnsCheckData", dnsCheckData)}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    );
};

DNSResults.propTypes = {
    dnsCheckData: PropTypes.shape({
        domain: PropTypes.string.isRequired,
        mxRecords: PropTypes.array,
        spf: PropTypes.string,
        dmarc: PropTypes.string,
        dkim: PropTypes.array,
        dnsInfo: PropTypes.object,
    }).isRequired,
};

export default DNSResults;
