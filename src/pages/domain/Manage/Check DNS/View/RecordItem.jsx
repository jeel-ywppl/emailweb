import {AlertTriangle, CheckCircle, XCircle} from "lucide-react";
import PropTypes from "prop-types";

const RecordItem = ({label, value, status, className}) => {
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
        <div className={`flex items-center justify-between py-3 ${className}`}>
            <span className="text-gray-600 font-medium">{label}</span>
            <div className="flex items-center gap-2">
                {status !== undefined && getStatusIcon(status)}
                <span
                    className={`font-semibold ${
                        status === true || status === "success"
                            ? "text-green-600"
                            : status === false || status === "error"
                            ? "text-red-600"
                            : "text-gray-800"
                    }`}
                >
                    {value}
                </span>
            </div>
        </div>
    );
};

RecordItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["success", "error", "warning"])]),
    className: PropTypes.string,
};

export default RecordItem;
