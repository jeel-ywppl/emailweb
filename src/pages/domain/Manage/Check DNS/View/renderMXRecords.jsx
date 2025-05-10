import {Badge, Card} from "@material-tailwind/react";
import RecordItem from "./RecordItem";
import DetailCard from "./DetailCard";
import { Mail } from "lucide-react";

const renderMXRecords = ({dnsCheckData} = {}) => {
    return (
        <div className="space-y-6">
            <DetailCard title="MX Records" icon={Mail}>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <RecordItem
                                label="Found"
                                value={dnsCheckData?.mx?.found ? "Yes" : "No"}
                                status={dnsCheckData?.mx?.found}
                            />
                            <RecordItem
                                label="Valid"
                                value={dnsCheckData?.mx?.valid ? "Yes" : "No"}
                                status={dnsCheckData?.mx?.valid}
                            />
                            <RecordItem label="TTL" value={`${dnsCheckData?.mx?.ttl} seconds`} />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 text-sm font-medium mb-2">Details:</p>
                            <p className="text-gray-600 text-sm">{dnsCheckData?.mx?.details}</p>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <h4 className="font-medium text-gray-700 mb-4">
                        MX Records ({dnsCheckData?.mx?.records?.length})
                    </h4>

                    {dnsCheckData?.mx?.records.map((record, idx) => (
                        <Card
                            key={idx}
                            className="overflow-hidden border border-gray-200 rounded-lg mb-4 last:mb-0 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-gray-50 p-4 border-b border-gray-200">
                                <h5 className="font-medium text-gray-800">{record?.exchange}</h5>
                            </div>
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <RecordItem label="Priority" value={record?.priority} />
                                <RecordItem label="IP" value={record?.ip} />
                                <RecordItem label="TTL" value={`${record?.ttl} seconds`} />
                                <RecordItem
                                    label="SMTP Check"
                                    value={record?.smtp?.success ? "Success" : "Failed"}
                                    status={record?.smtp?.success}
                                />
                            </div>
                            {record?.smtp?.details && (
                                <div className="px-4 pb-4">
                                    <div className="bg-gray-50 border border-gray-100 rounded p-3">
                                        <p className="text-sm text-gray-600">
                                            {record?.smtp?.details}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {record?.blacklist.length > 0 && (
                                <div className="border-t border-gray-200 p-4">
                                    <h6 className="text-sm font-medium text-gray-700 mb-2">
                                        Blacklisted on:
                                    </h6>
                                    <div className="flex flex-wrap gap-1">
                                        {record?.blacklist.map((item, i) => (
                                            <Badge key={i} variant="destructive">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </DetailCard>
        </div>
    );
};

export default renderMXRecords;
