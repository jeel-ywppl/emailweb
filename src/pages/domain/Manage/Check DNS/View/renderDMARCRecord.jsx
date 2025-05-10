import {  Card} from "@material-tailwind/react";
import DetailCard from "./DetailCard";
import RecordItem from "./RecordItem";
import {Copy, ShieldCheck} from "lucide-react";

const renderDMARCRecord = ({dnsCheckData} = {}) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            <DetailCard title="DMARC Record" icon={ShieldCheck}>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <RecordItem
                                label="Found"
                                value={dnsCheckData?.dmarc?.found ? "Yes" : "No"}
                                status={dnsCheckData?.dmarc?.found}
                            />
                            <RecordItem
                                label="Valid"
                                value={dnsCheckData?.dmarc?.valid ? "Yes" : "No"}
                                status={dnsCheckData?.dmarc?.valid}
                            />
                            <RecordItem
                                label="Multiple Records"
                                value={dnsCheckData?.dmarc?.multipleRecords ? "Yes" : "No"}
                                status={!dnsCheckData?.dmarc?.multipleRecords}
                            />
                            <RecordItem label="TTL" value={`${dnsCheckData?.dmarc?.ttl} seconds`} />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 text-sm font-medium mb-2">Record:</p>
                            <div className="bg-white border border-gray-200 rounded p-2 mb-3 flex justify-between items-center">
                                <code className="text-xs overflow-auto">{dnsCheckData?.dmarc?.record}</code>
                                <button
                                    size="sm"
                                    onClick={() => copyToClipboard(dnsCheckData?.dmarc?.record)}
                                    className="h-7 w-7 p-0 ml-2 rounded-full"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                            <p className="text-gray-700 text-sm font-medium mb-2">Details:</p>
                            <p className="text-gray-600 text-sm">{dnsCheckData?.dmarc?.details}</p>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <h4 className="font-medium text-gray-700 mb-4">DMARC Tags</h4>

                    <Card className="border border-gray-200 p-5 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <RecordItem label="Version" value={dnsCheckData?.dmarc?.tags?.v} />
                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-600 font-medium">Policy</span>
                                <div
                                    className={
                                        dnsCheckData?.dmarc?.tags.p === "reject"
                                            ? "bg-green-500 text-white"
                                            : dnsCheckData?.dmarc?.tags?.p === "quarantine"
                                            ? "bg-yellow-500 text-white"
                                            : "bg-gray-500 text-white"
                                    }
                                >
                                    {dnsCheckData?.dmarc?.tags.p}
                                </div>
                            </div>
                            <RecordItem label="Aggregate Reports" value={dnsCheckData?.dmarc?.tags?.rua} />
                            <RecordItem label="Forensic Reports" value={dnsCheckData?.dmarc?.tags?.ruf} />
                        </div>
                    </Card>
                </div>
            </DetailCard>
        </div>
    );
};
export default renderDMARCRecord;
