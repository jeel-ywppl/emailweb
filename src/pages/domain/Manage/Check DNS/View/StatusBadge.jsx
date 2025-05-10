import {CheckCircle, XCircle} from "lucide-react";
import PropTypes from "prop-types";


const StatusBadge = ({valid, text}) => {
    if (valid) {
        return (
            <div className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>{text || "Valid"}</span>
            </div>
        );
    }
    return (
        <div className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 ">
            <XCircle className="h-3 w-3" />
            <span>{text || "Invalid"}</span>
        </div>
    );
};

StatusBadge.propTypes = {
    valid: PropTypes.bool.isRequired,
    text: PropTypes.string,
};


export default StatusBadge;
