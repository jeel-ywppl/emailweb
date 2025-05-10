import RecordItem from "./RecordItem";
import {Card} from "@material-tailwind/react";
import {Copy, ShieldCheck} from "lucide-react";
import DetailCard from "./DetailCard";

const renderSPFRecord = ({dnsCheckData} = {}) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            <DetailCard title="SPF Record" icon={ShieldCheck}>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <RecordItem
                                label="Found"
                                value={dnsCheckData?.spf?.found ? "Yes" : "No"}
                                status={dnsCheckData?.spf?.found}
                            />
                            <RecordItem
                                label="Valid"
                                value={dnsCheckData?.spf?.valid ? "Yes" : "No"}
                                status={dnsCheckData?.spf?.valid}
                            />
                            <RecordItem
                                label="Multiple Records"
                                value={dnsCheckData?.spf?.multipleRecords ? "Yes" : "No"}
                                status={!dnsCheckData?.spf?.multipleRecords}
                            />
                            <RecordItem label="TTL" value={`${dnsCheckData?.spf?.ttl} seconds`} />
                            <RecordItem
                                label="Lookup Count"
                                value={dnsCheckData?.spf?.lookupCount}
                            />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 text-sm font-medium mb-2">Record:</p>
                            <div className="bg-white border border-gray-200 rounded p-2 mb-3 flex justify-between items-center">
                                <code className="text-xs overflow-auto">
                                    {dnsCheckData?.spf?.record}
                                </code>
                                <button
                                    size="sm"
                                    onClick={() => copyToClipboard(dnsCheckData?.spf?.record)}
                                    className="h-7 w-7 p-0 ml-2 rounded-full"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                            <p className="text-gray-700 text-sm font-medium mb-2">Details:</p>
                            <p className="text-gray-600 text-sm">{dnsCheckData?.spf?.details}</p>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <h4 className="font-medium text-gray-700 mb-4">
                        SPF Mechanisms ({dnsCheckData?.spf?.mechanisms?.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {dnsCheckData?.spf?.mechanisms.map((mechanism, idx) => (
                            <Card
                                key={idx}
                                className="border border-gray-200 p-3 rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-700">
                                        {mechanism?.type}
                                    </span>
                                    <span className="bg-gray-700 rounded-full text-white px-2 py-1 text-xs font-medium">
                                        qualifier :{" "} {mechanism?.qualifier || "+"}
                                    </span>
                                </div>
                                {mechanism?.value && (
                                    <RecordItem label="Value" value={mechanism?.value} />
                                )}
                                <RecordItem label="TTL" value={`${mechanism?.ttl} seconds`} />
                            </Card>
                        ))}
                    </div>
                </div>
            </DetailCard>
        </div>
    );
};

export default renderSPFRecord;
