import {ArrowLeft, Archive, Trash, Mail} from "lucide-react";
import {RiSpam2Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const EmailHeader = ({onAction}) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center border-b px-4 py-3 bg-white shadow-sm">
            <div className="flex items-center sm:space-x-10 space-x-2">
                <button onClick={() => navigate(-1)} title="Go Back">
                    <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-black" />
                </button>
                <button onClick={() => onAction("archive")} title="Archive">
                    <Archive className="w-4 h-4 text-gray-600 hover:text-black" />
                </button>
                <button onClick={() => onAction("trash")} title="Trash">
                    <Trash className="w-4 h-4 text-gray-600 hover:text-black" />
                </button>
                <button onClick={() => onAction("spam")} title="Mark as Spam">
                    <RiSpam2Line className="w-4 h-4 text-gray-600 hover:text-black" />
                </button>
                <button onClick={() => onAction("unread")} title="Mark as Unread">
                    <Mail className="w-4 h-4 text-gray-600 hover:text-black" />
                </button>
            </div>
        </div>
    );
};

EmailHeader.propTypes = {
    onBack: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
    isStarred: PropTypes.bool,
};

EmailHeader.defaultProps = {
    isStarred: false,
};

export default EmailHeader;
