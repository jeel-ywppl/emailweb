import {Reply, Forward} from "lucide-react";
import DOMPurify from "dompurify";
import AttachmentItem from "./AttachmentItem";
import PropTypes from "prop-types";
import {getSenderInitials} from "../../../componets/emailUtils";

const RepliesList = ({replies = [], onReplyClick}) => {
    return (
        <div className="mt-2">
            {replies.map((reply, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 mt-2">
                    <div className="flex justify-between items-center border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-white font-semibold">
                                    {getSenderInitials(reply?.sender_email)}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">{reply?.sender_email}</h4>
                                <p className="text-xs text-gray-500">{reply?.sender_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-500 space-x-3">
                            <span className="text-xs">
                                {new Date(reply?.createdAt).toLocaleString()}
                            </span>
                            <button
                                onClick={() => onReplyClick(reply)}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <Reply size={22} />
                            </button>
                            <Forward size={22} />
                        </div>
                    </div>

                    <h1 className="mt-6 text-lg font-semibold break-words break-all">
                        {reply?.subject}
                    </h1>

                    <div className="mt-4 text-gray-700 leading-relaxed break-words break-all">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(reply?.body),
                            }}
                        />
                    </div>

                    {reply?.attachments?.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold">Attachments:</h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {reply.attachments.map((file, index) => (
                                    <AttachmentItem key={index} file={file} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

RepliesList.propTypes = {
    replies: PropTypes.arrayOf(
        PropTypes.shape({
            sender_email: PropTypes.string,
            sender_name: PropTypes.string,
            createdAt: PropTypes.string,
            subject: PropTypes.string,
            body: PropTypes.string,
            attachments: PropTypes.arrayOf(
                PropTypes.shape({
                    file_path: PropTypes.string,
                    original_name: PropTypes.string,
                    contentType: PropTypes.string,
                    showData: PropTypes.string,
                }),
            ),
        }),
    ),
    onReplyClick: PropTypes.func,
};

export default RepliesList;
