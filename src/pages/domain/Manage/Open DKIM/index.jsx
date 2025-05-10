import {useState} from "react";
import {Input} from "@mui/material";
import {toast} from "react-toastify";
import RecordField from "./RecordField";
import {useAppDispatch} from "../../../../store";
import {checkDkim} from "../../../../store/Domain";
import MyButton from "../../../../componets/MyButton";

const OpenDkim = () => {
    const dispatch = useAppDispatch();
    const [domain, setDomain] = useState("");
    const [selector, setSelector] = useState("default");
    const [dkimRecord, setDkimRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!domain.trim()) {
            toast.error("Please enter a domain");
            return;
        }

        setIsLoading(true);
        try {
            const {payload} = await dispatch(checkDkim({domain, selector}));
            if (payload) {
                setDkimRecord(payload);
            }
        } catch {
            toast.error("Failed to generate DKIM record");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-black mb-2">DKIM Generator</h1>
                <p className="text-gray-500 text-sm">
                    Enter a domain and selector to generate a DKIM record.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label
                        htmlFor="domain"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Domain
                    </label>
                    <Input
                        id="domain"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label
                        htmlFor="selector"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Selector
                    </label>
                    <Input
                        id="selector"
                        placeholder="default"
                        value={selector}
                        onChange={(e) => setSelector(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="text-center">
                <MyButton
                    onClick={handleGenerate}
                    disabled={isLoading}
                    type="primary"
                    label={isLoading ? "Generating..." : "Generate DKIM Record"}
                />
            </div>

            {dkimRecord && (
                <div className="pt-6 space-y-5 border-t">
                    <h2 className="text-lg font-semibold text-gray-800">
                        DKIM Record for <span className="text-blue-600">{dkimRecord?.domain}</span>
                    </h2>

                    <RecordField
                        label="Record Name"
                        value={dkimRecord?.record_name}
                        onCopy={() => copyToClipboard(dkimRecord?.record_name)}
                    />
                    <RecordField
                        label="Record Type"
                        value={dkimRecord?.type}
                        onCopy={() => copyToClipboard(dkimRecord?.type)}
                    />
                    <RecordField
                        label="Record Value"
                        value={dkimRecord?.content}
                        multiline
                        onCopy={() => copyToClipboard(dkimRecord?.content)}
                    />
                </div>
            )}
        </div>
    );
};

export default OpenDkim;
