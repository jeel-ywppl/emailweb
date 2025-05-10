import { AlertTriangle, Globe, Server } from "lucide-react";
import DetailCard from "./DetailCard";
import { Card } from "@material-tailwind/react";
import RecordItem from "./RecordItem";

const renderDNSInfo = ({dnsCheckData} = {}) =>{
  console.log(dnsCheckData, "info");
    return (
    <div className="space-y-6">
      <DetailCard title="DNS Information" icon={Globe}>
        <div className="space-y-6">
          <h4 className="font-medium text-gray-700 mb-2">SOA Record</h4>
          <Card className="border border-gray-200 p-5 rounded-lg mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RecordItem label="Name Server" value={dnsCheckData?.dns?.soa?.nsname} />
              <RecordItem label="Hostmaster" value={dnsCheckData?.dns?.soa?.hostmaster} />
              <RecordItem label="Serial" value={dnsCheckData?.dns?.soa?.serial} />
              <RecordItem label="Refresh" value={`${dnsCheckData?.dns?.soa?.refresh} seconds`} />
              <RecordItem label="Retry" value={`${dnsCheckData?.dns?.soa?.retry} seconds`} />
              <RecordItem label="Expire" value={`${dnsCheckData?.dns?.soa?.expire} seconds`} />
              <RecordItem label="Min TTL" value={`${dnsCheckData?.dns?.soa?.minttl} seconds`} />
              <RecordItem label="TTL" value={`${dnsCheckData?.dns?.soa?.ttl} seconds`} />
            </div>
          </Card>

          <h4 className="font-medium text-gray-700 mb-3">Nameservers</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {dnsCheckData?.dns?.ns.map((ns, idx) => (
              <Card key={idx} className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Server className="h-4 w-4 text-gray-400 mr-2" />
                  <h5 className="font-medium text-gray-700">{ns?.name}</h5>
                </div>
                <RecordItem label="IP" value={ns?.ip} />
                <RecordItem label="TTL" value={`${ns?.ttl} seconds`} />
              </Card>
            ))}
          </div>

          <h4 className="font-medium text-gray-700 mb-3">A Records</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {dnsCheckData?.dns?.a.map((record, idx) => (
              <Card key={idx} className="border border-gray-200 p-4 rounded-lg">
                <RecordItem label="IP" value={record?.ip} />
                <RecordItem label="TTL" value={`${record?.ttl} seconds`} />
              </Card>
            ))}
          </div>

          {dnsCheckData?.dns?.details && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-600 h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <h5 className="text-yellow-800 font-medium mb-1">DNS Notes</h5>
                  <p className="text-yellow-700 text-sm">{dnsCheckData?.dns?.details}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DetailCard>
    </div>
  );
}
export default renderDNSInfo;   