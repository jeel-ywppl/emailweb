import {AlertTriangle, CheckCircle, Copy, Globe, Mail, Server, XCircle} from "lucide-react";
import DetailCard from "./DetailCard";
import RecordItem from "./RecordItem";
import {Card} from "@material-tailwind/react";
import StatusBadge from "./StatusBadge";

const renderOverview = ({dnsCheckData} = {}) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const overallStatus =
        dnsCheckData?.mx?.valid &&
        dnsCheckData?.spf?.valid &&
        dnsCheckData?.dmarc?.valid &&
        dnsCheckData?.dkim?.valid;

    const getStatusIcon = (status) => {
        switch (status) {
            case true:
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case false:
            case "error":
                return <XCircle className="h-5 w-5 text-red-500" />;
            case "warning":
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            {/* Health Status */}
            <div
                className={`p-6 rounded-xl flex items-center border ${
                    overallStatus
                        ? "bg-green-50 border-green-200"
                        : "bg-yellow-50 border-yellow-200"
                }`}
            >
                <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center mr-6 ${
                        overallStatus
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                    {overallStatus ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                </div>
                <div>
                    <h2
                        className={`text-2xl font-semibold ${
                            overallStatus ? "text-green-700" : "text-yellow-700"
                        }`}
                    >
                        {overallStatus
                            ? "Email Configuration Valid"
                            : "Email Configuration Issues Detected"}
                    </h2>
                    <p
                        className={`text-sm mt-1 ${
                            overallStatus ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                        {overallStatus
                            ? "All DNS records are properly configured for optimal email deliverability."
                            : "Some DNS records need attention to improve email deliverability."}
                    </p>
                </div>
            </div>

            {/* Main Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailCard title="Domain Information" icon={Globe} className="h-full">
                    <div className="divide-y divide-gray-100">
                        <RecordItem label="Domain" value={dnsCheckData?.domain} className="pb-4" />

                        <div className="py-4">
                            <div className="mb-2 text-gray-600 font-medium">A Records</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {dnsCheckData?.dns?.a.map((record, i) => (
                                    <div key={i} className="bg-dns-blue text-white">
                                        {record?.ip}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="mb-2 text-gray-600 font-medium">Name Servers</div>
                            <div className="grid gap-2">
                                {dnsCheckData?.dns?.ns.map((ns, i) => (
                                    <div key={i} className="text-sm flex items-center">
                                        <Server className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                                        <span>{ns?.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DetailCard>

                <DetailCard title="Email Configuration" icon={Mail} className="h-full">
                    <div className="divide-y divide-gray-100">
                        <div className="pb-4 flex items-center justify-between">
                            <span className="text-gray-600 font-medium">MX Records</span>
                            <div className="flex items-center gap-2">
                                {getStatusIcon(dnsCheckData?.mx?.valid)}
                                <span
                                    className={
                                        dnsCheckData?.mx?.valid
                                            ? "text-green-600 font-medium"
                                            : "text-red-600 font-medium"
                                    }
                                >
                                    {dnsCheckData?.mx?.records?.length} record(s)
                                </span>
                            </div>
                        </div>

                        <div className="py-4 flex items-center justify-between">
                            <span className="text-gray-600 font-medium">SPF Record</span>
                            <StatusBadge
                                valid={dnsCheckData?.spf?.valid}
                                text={dnsCheckData?.spf?.valid ? "Valid" : "Issues"}
                            />
                        </div>

                        <div className="py-4 flex items-center justify-between">
                            <span className="text-gray-600 font-medium">DMARC Record</span>
                            <StatusBadge
                                valid={dnsCheckData?.dmarc?.valid}
                                text={dnsCheckData?.dmarc?.valid ? "Valid" : "Issues"}
                            />
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                            <span className="text-gray-600 font-medium">DKIM Records</span>
                            <StatusBadge
                                valid={dnsCheckData?.dkim?.valid}
                                text={dnsCheckData?.dkim?.valid ? "Valid" : "Issues"}
                            />
                        </div>
                    </div>
                </DetailCard>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 gap-4">
                {/* MX Card */}
                <Card
                    className={`overflow-hidden border rounded-xl ${
                        dnsCheckData?.mx?.valid ? "border-green-200" : "border-red-200"
                    }`}
                >
                    <div
                        className={`p-4 flex items-center ${
                            dnsCheckData?.mx?.valid ? "bg-green-50" : "bg-red-50"
                        }`}
                    >
                        <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                dnsCheckData?.mx?.valid
                                    ? "bg-green-100 text-green-500"
                                    : "bg-red-100 text-red-500"
                            }`}
                        >
                            {dnsCheckData?.mx?.valid ? (
                                <CheckCircle size={18} />
                            ) : (
                                <XCircle size={18} />
                            )}
                        </div>
                        <div>
                            <h3
                                className={`font-medium ${
                                    dnsCheckData?.mx?.valid ? "text-green-700" : "text-red-700"
                                }`}
                            >
                                {dnsCheckData?.mx?.valid
                                    ? "MX Records Valid"
                                    : "MX Records Issues Detected"}
                            </h3>
                            <p
                                className={`text-sm ${
                                    dnsCheckData?.mx?.valid ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {dnsCheckData?.mx?.details}
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-white">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Exchange Server</span>
                            <span className="font-medium">
                                {dnsCheckData?.mx?.records[0]?.exchange || "N/A"}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* SPF Card */}
                <Card
                    className={`overflow-hidden border rounded-xl ${
                        dnsCheckData?.spf?.valid ? "border-green-200" : "border-red-200"
                    }`}
                >
                    <div
                        className={`p-4 flex items-center ${
                            dnsCheckData?.spf?.valid ? "bg-green-50" : "bg-red-50"
                        }`}
                    >
                        <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                dnsCheckData?.spf?.valid
                                    ? "bg-green-100 text-green-500"
                                    : "bg-red-100 text-red-500"
                            }`}
                        >
                            {dnsCheckData?.spf?.valid ? (
                                <CheckCircle size={18} />
                            ) : (
                                <XCircle size={18} />
                            )}
                        </div>
                        <div>
                            <h3
                                className={`font-medium ${
                                    dnsCheckData?.spf?.valid ? "text-green-700" : "text-red-700"
                                }`}
                            >
                                {dnsCheckData?.spf?.valid
                                    ? "SPF Record Valid"
                                    : "SPF Record Issues Detected"}
                            </h3>
                            <p
                                className={`text-sm ${
                                    dnsCheckData?.spf?.valid ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {dnsCheckData?.spf?.details}
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-white">
                        <div className="bg-gray-50 border border-gray-100 rounded-md p-2 flex justify-between items-center">
                            <code className="text-xs text-gray-600">
                                {dnsCheckData?.spf?.record}
                            </code>
                            <button
                                size="sm"
                                onClick={() => copyToClipboard(dnsCheckData?.spf?.record)}
                                className="h-7 w-7 p-0 rounded-full"
                            >
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* DMARC Card */}
                <Card
                    className={`overflow-hidden border rounded-xl ${
                        dnsCheckData?.dmarc?.valid ? "border-green-200" : "border-red-200"
                    }`}
                >
                    <div
                        className={`p-4 flex items-center ${
                            dnsCheckData?.dmarc?.valid ? "bg-green-50" : "bg-red-50"
                        }`}
                    >
                        <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                dnsCheckData?.dmarc?.valid
                                    ? "bg-green-100 text-green-500"
                                    : "bg-red-100 text-red-500"
                            }`}
                        >
                            {dnsCheckData?.dmarc?.valid ? (
                                <CheckCircle size={18} />
                            ) : (
                                <XCircle size={18} />
                            )}
                        </div>
                        <div>
                            <h3
                                className={`font-medium ${
                                    dnsCheckData?.dmarc?.valid ? "text-green-700" : "text-red-700"
                                }`}
                            >
                                {dnsCheckData?.dmarc?.valid
                                    ? "DMARC Record Valid"
                                    : "DMARC Record Issues Detected"}
                            </h3>
                            <p
                                className={`text-sm ${
                                    dnsCheckData?.dmarc?.valid ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {dnsCheckData?.dmarc?.details}
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-white">
                        <div className="mb-3 bg-gray-50 border border-gray-100 rounded-md p-2 flex justify-between items-center">
                            <code className="text-xs text-gray-600">
                                {dnsCheckData?.dmarc?.record}
                            </code>
                            <button
                                size="sm"
                                onClick={() => copyToClipboard(dnsCheckData?.dmarc?.record)}
                                className="h-7 w-7 p-0 rounded-full"
                            >
                                <Copy size={14} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Policy</span>
                            <div className="bg-yellow-200 hover:bg-yellow-400 text-white px-2 rounded-full">
                                {dnsCheckData?.dmarc?.tags?.p}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* DKIM Card */}
                <Card
                    className={`overflow-hidden border rounded-xl ${
                        dnsCheckData?.dkim?.valid ? "border-green-200" : "border-red-200"
                    }`}
                >
                    <div
                        className={`p-4 flex items-center ${
                            dnsCheckData?.dkim?.valid ? "bg-green-50" : "bg-red-50"
                        }`}
                    >
                        <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                dnsCheckData?.dkim?.valid
                                    ? "bg-green-100 text-green-500"
                                    : "bg-red-100 text-red-500"
                            }`}
                        >
                            {dnsCheckData?.dkim?.valid ? (
                                <CheckCircle size={18} />
                            ) : (
                                <XCircle size={18} />
                            )}
                        </div>
                        <div>
                            <h3
                                className={`font-medium ${
                                    dnsCheckData?.dkim?.valid ? "text-green-700" : "text-red-700"
                                }`}
                            >
                                {dnsCheckData?.dkim?.valid
                                    ? "DKIM Record Valid"
                                    : "DKIM Record Issues Detected"}
                            </h3>
                            <p
                                className={`text-sm ${
                                    dnsCheckData?.dkim?.valid ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {dnsCheckData?.dkim?.details}
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-white">
                        <div className="mb-3 bg-gray-50 border border-gray-100 rounded-md p-2 flex justify-between items-center">
                            <code className="text-xs text-gray-600 break-all">
                                {dnsCheckData?.dkim?.records?.[0]?.txt}
                            </code>
                            <button
                                size="sm"
                                onClick={() =>
                                    copyToClipboard(dnsCheckData?.dkim?.records?.[0]?.txt)
                                }
                                className="h-7 w-7 p-0 rounded-full"
                            >
                                <Copy size={14} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Selectors</span>
                            <div className="flex flex-wrap gap-1">
                                {dnsCheckData?.dkim?.selectors.map((selector, i) => (
                                    <div key={i} className="bg-blue text-white rounded-full px-2">
                                        {selector}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default renderOverview;
