import {Button} from "@material-tailwind/react";
import {Copy} from "lucide-react";
import PropTypes from "prop-types";

const RecordField = ({label, value, onCopy, multiline = false}) => {
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <Button
                    onClick={onCopy}
                    size="sm"
                    variant="outlined"
                    className="text-xs px-2 py-1 flex items-center gap-1"
                >
                    <Copy className="w-3 h-3" /> Copy
                </Button>
            </div>
            <div
                className={`bg-gray-50 border border-gray-200 p-3 rounded-md text-sm font-mono text-gray-700 ${
                    multiline ? "whitespace-pre-wrap break-words" : ""
                }`}
            >
                {value}
            </div>
        </div>
    );
};

RecordField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onCopy: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
};

export default RecordField;
