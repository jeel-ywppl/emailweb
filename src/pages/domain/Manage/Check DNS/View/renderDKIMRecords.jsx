import {Copy, ShieldCheck} from "lucide-react";
import DetailCard from "./DetailCard";
import RecordItem from "./RecordItem";
import {Card} from "@material-tailwind/react";

const renderDKIMRecords = ({dnsCheckData} = {}) => {
    console.log("🐙 dkim", dnsCheckData);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            <DetailCard title="DKIM Records" icon={ShieldCheck}>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <RecordItem
                                label="Found"
                                value={dnsCheckData?.dkim?.found ? "Yes" : "No"}
                                status={dnsCheckData?.dkim?.found}
                            />
                            <RecordItem
                                label="Valid"
                                value={dnsCheckData?.dkim?.valid ? "Yes" : "No"}
                                status={dnsCheckData?.dkim?.valid}
                            />
                            <RecordItem label="TTL" value={`${dnsCheckData?.dkim?.ttl} seconds`} />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 text-sm font-medium mb-2">Selectors:</p>
                            <div className="flex flex-wrap gap-2">
                                {dnsCheckData?.dkim?.selectors.map((selector, i) => (
                                    <div
                                        key={i}
                                        className="bg-blue-300 text-gray-50 px-3 py-1 text-sm font-medium rounded-full shadow-sm"
                                    >
                                        {selector}
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm font-medium mt-3 mb-1">Details:</p>
                            <p className="text-gray-600 text-sm">{dnsCheckData?.dkim?.details}</p>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <h4 className="font-medium text-gray-700 mb-4">DKIM Record Details</h4>

                    {dnsCheckData?.dkim?.records.map((record, idx) => (
                        <Card
                            key={idx}
                            className="overflow-hidden border border-gray-200 rounded-lg mb-4 last:mb-0 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-gray-50 p-4 border-b border-gray-200">
                                <h5 className="font-medium text-gray-800">
                                    Selector: {record?.selector}
                                </h5>
                            </div>
                            <div className="p-4">
                                <RecordItem label="TTL" value={`${record?.ttl} seconds`} />

                                {record.txt && typeof record.txt === "string" && (
                                    <div className="mt-4">
                                        <p className="text-gray-600 text-sm font-medium mb-2">
                                            Record:
                                        </p>
                                        <div className="bg-gray-50 border border-gray-100 p-3 rounded-md flex justify-between items-start">
                                            <code className="text-xs whitespace-pre-wrap break-all overflow-auto max-h-32">
                                                {record?.txt}
                                            </code>
                                            <button
                                                size="sm"
                                                onClick={() => copyToClipboard(record?.txt)}
                                                className="h-7 w-7 p-0 ml-2 rounded-full flex-shrink-0"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {record?.details && (
                                    <div className="mt-4">
                                        <p
                                            className={`text-gray-600 text-sm ${
                                                record?.details?.includes("failed")
                                                    ? "text-red-600"
                                                    : ""
                                            }`}
                                        >
                                            {record?.details}
                                        </p>
                                    </div>
                                )}

                                {record?.tags && (
                                    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-gray-700 mb-3">
                                            DKIM Tags
                                        </h6>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <RecordItem label="Version" value={record?.tags?.v} />
                                            <RecordItem
                                                label="Hash Algorithm"
                                                value={record?.tags?.h}
                                            />
                                            <RecordItem label="Key Type" value={record?.tags?.k} />
                                            <div className="col-span-2">
                                                <p className="text-gray-600 text-sm font-medium mb-2">
                                                    Public Key:
                                                </p>
                                                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 p-2 rounded-md">
                                                    <code className="text-xs">
                                                        {record?.tags?.p && record?.tags?.p?.length > 40
                                                            ? record?.tags?.p?.substring(0, 40) + "..."
                                                            : record?.tags?.p}
                                                    </code>
                                                    <button
                                                        size="sm"
                                                        className="text-dns-purple text-xs ml-2 h-7 flex items-center justify-center flex-nowrap"
                                                        onClick={() =>
                                                            copyToClipboard(record?.tags?.p)
                                                        }
                                                    >
                                                        <Copy size={12} className="mr-1" /> Copy key
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </DetailCard>
        </div>
    );
};

export default renderDKIMRecords;
