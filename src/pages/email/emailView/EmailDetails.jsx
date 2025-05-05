import {Reply, Forward} from "lucide-react";
import {FaStar, FaRegStar} from "react-icons/fa";
import DOMPurify from "dompurify";
import AttachmentItem from "./AttachmentItem";
import PropTypes from "prop-types";
import {getSenderInitials} from "../../../componets/emailUtils";

const EmailDetails = ({ email, onReply, onForward, onStar, isStarred }) => {
    return (
        <div className="bg-white rounded-b-lg shadow-md p-4">
            <div className="flex justify-between items-center pb-4 border-b">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        {email?.profilePic ? (
                            <img
                                src={email?.profilePic}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-white font-semibold">
                                {getSenderInitials(email?.sender_email)}
                            </span>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold">{email?.sender_email}</h4>
                        <p className="text-xs text-gray-500">{email?.sender_name}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                    <span className="text-sm">{new Date(email?.updatedAt).toLocaleString()}</span>
                    <button onClick={() => onReply(null)}>
                        <Reply size={22} />
                    </button>
                    <button onClick={onStar}>
                        {isStarred ? (
                            <FaStar size={18} className="text-yellow-500" />
                        ) : (
                            <FaRegStar size={18} />
                        )}
                    </button>
                    <div className="" onClick={onForward}>
                        <Forward size={22} />
                    </div>
                </div>
            </div>

            <h1 className="mt-6 text-lg font-semibold">{email?.subject}</h1>

            <div className="mt-4 leading-relaxed text-gray-700 break-words">
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(email?.body)}} />
            </div>

            {email?.attachments?.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Attachments:</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {email?.attachments.map((file, index) => (
                            <AttachmentItem key={index} file={file} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

EmailDetails.propTypes = {
    email: PropTypes.shape({
        sender_email: PropTypes.string,
        sender_name: PropTypes.string,
        profilePic: PropTypes.string,
        subject: PropTypes.string,
        body: PropTypes.string,
        updatedAt: PropTypes.string,
        attachments: PropTypes.arrayOf(
            PropTypes.shape({
                file_path: PropTypes.string,
                original_name: PropTypes.string,
                contentType: PropTypes.string,
                file_type: PropTypes.string,
                showData: PropTypes.string,
            }),
        ),
    }),
    onReply: PropTypes.func.isRequired,
    onForward:PropTypes.func.isRequired,
    onStar: PropTypes.func.isRequired,
    isStarred: PropTypes.bool.isRequired,

};

export default EmailDetails;
