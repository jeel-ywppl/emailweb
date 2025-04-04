import {useState, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {changeEmailStatus, getSinglMail, replyMail} from "../../store/email";
import {useNavigate, useParams} from "react-router-dom";
import {config} from "../../utils/util";
import {MdOutlineFileDownload} from "react-icons/md";
import DOMPurify from "dompurify";
import {Archive, ArrowLeft, Forward, Mail, Reply, Trash} from "lucide-react";
import Loader from "../Loader";
import ReplyMail from "../../model/ReplyMail";
import {RiSpam2Line} from "react-icons/ri";
import {FaStar, FaRegStar} from "react-icons/fa";

const EmailView = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const replyRef = useRef(null);
    const {selectedEmail: email, isLoading} = useAppSelector((state) => state.email);

    const [isReplying, setIsReplying] = useState(false);
    const [replyDetails, setReplyDetails] = useState(null);

    const [isStarred, setIsStarred] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
    const [isSpam, setIsSpam] = useState(false);
    const [isUnread, setIsUnread] = useState(false);

    useEffect(() => {
        dispatch(getSinglMail(id));
    }, [dispatch, id]);

    const getSenderInitials = (fname) => {
        if (!fname) {
            return "";
        }
        const nameParts = fname.split(" ");
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    const handleDownload = async (imageUrl, filename) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    };

    const handleReply = async (formData) => {
        try {
            const response = await dispatch(replyMail(formData));
            if (response?.payload?.success) {
                console.log(response?.message || "Email replied successfully!");
                setIsReplying(false);
                await dispatch(getSinglMail(id));
            } else {
                console.error("Failed to send reply:", response?.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    const handleReplyClick = (reply) => {
        if (reply) {
            setReplyDetails({
                recipientEmail: reply?.sender_email,
                senderEmail: email?.recipient_emails_to,
                senderEmailCC: email?.recipient_emails_cc,
                senderEmailBCC: email?.recipient_emails_bcc,
                subject: reply?.subject,
                createdAt: reply?.createdAt,
                content: reply?.body,
            });
        } else {
            setReplyDetails({
                recipientEmail: email?.recipient_emails_to,
                senderEmail: email?.sender_email,
                senderEmailCC: email?.recipient_emails_cc,
                senderEmailBCC: email?.recipient_emails_bcc,
                subject: email?.subject,
                createdAt: email?.createdAt,
                content: email?.body,
            });
        }
        setIsReplying(true);
        setTimeout(() => {
            replyRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
        }, 300);
    };

    const handleEmailAction = async (action) => {
        const actionMap = {
            star: {star_status: !isStarred},
            archive: {archive_status: !isArchived},
            unread: {read_status: !isUnread},
            trash: {trash_status: true},
            spam: {spam_status: !isSpam},
        };

        const payload = {
            email_id: [id],
            ...actionMap[action],
        };

        try {
            const response = await dispatch(changeEmailStatus(payload));
            if (response?.payload?.success) {
                console.log(`Email marked as ${action}!`);
                await dispatch(getSinglMail(id));
                if (action === "star") setIsStarred(!isStarred);
                if (action === "archive") setIsArchived(!isArchived);
                if (action === "unread") setIsUnread(!isUnread);
                if (action === "spam") setIsSpam(!isSpam);
            } else {
                console.log(`Failed to mark email as ${action}`);
            }
        } catch (error) {
            console.error(`Error marking email as ${action}:`, error);
        }
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center">
                <Loader />
            </div>
        );

    return (
        <div className="pt-5 pl-5">
            <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 font-sans rounded-lg">
                <div className="flex justify-between items-center border-b px-4 py-3 bg-white shadow-sm">
                    <div className="flex items-center sm:space-x-10 space-x-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-600 hover:text-black"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => handleEmailAction("archive")}
                            className="text-gray-600 hover:text-black"
                            title="Archive"
                        >
                            <Archive className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleEmailAction("trash")}
                            className="text-gray-600 hover:text-black"
                            title="trash"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleEmailAction("spam")}
                            className="text-gray-600 hover:text-black"
                            title="Mark as Spam"
                        >
                            <RiSpam2Line className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleEmailAction("unread")}
                            className="text-gray-600 hover:text-black"
                            title="Mark as Unread"
                        >
                            <Mail className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-b-lg shadow-md p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                {email?.profilePic ? (
                                    <img
                                        src={email?.profilePic}
                                        alt={email?.sender_email}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-semibold text-lg">
                                        {getSenderInitials(email?.sender_email)}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    {email?.sender_email}
                                </h4>
                                <p className="text-xs text-gray-500">{email?.sender_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-500 space-x-3">
                            <span className="text-sm">
                                {new Date(email?.createdAt).toLocaleString()}
                            </span>
                            <button
                                onClick={() => handleReplyClick(null)}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <Reply size={22} />
                            </button>
                            <button
                                onClick={() => handleEmailAction("star")}
                                className={`text-gray-600 hover:text-yellow-500 transition-colors duration-200 ${
                                    isStarred ? "text-yellow-500" : ""
                                }`}
                            >
                                {isStarred ? <FaStar size={18} /> : <FaRegStar size={18} />}
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <Forward size={22} />
                            </button>
                        </div>
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-800">{email?.subject}</h1>
                    <div className="mt-4 text-gray-700 leading-relaxed">
                        {email?.body ? (
                            <div
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(email?.body)}}
                            />
                        ) : (
                            <p>No content available</p>
                        )}
                    </div>
                    {email?.attachments?.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold">Attachments:</h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {email?.attachments.map((file, index) => (
                                    <div key={index} className="border p-2 rounded-lg">
                                        {file?.file_type ? (
                                            <img
                                                src={
                                                    file?.file_path.startsWith("http")
                                                        ? file?.file_path
                                                        : `${config.LIVE_URL}/${file?.file_path}`
                                                }
                                                alt={file?.original_name}
                                                className="w-24 h-24 object-cover rounded cursor-pointer"
                                            />
                                        ) : (
                                            <p>{file?.original_name || "Unknown File"}</p>
                                        )}
                                        <div
                                            onClick={() =>
                                                handleDownload(
                                                    `${config.LIVE_URL}/${file?.file_path}`,
                                                    file?.original_name,
                                                )
                                            }
                                            className="block mt-1 text-blue-500"
                                        >
                                            <MdOutlineFileDownload className="w-5 h-5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {email?.replies?.length > 0 && (
                    <div className="mt-2">
                        {email?.replies?.map((reply, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4 mt-2">
                                <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-white font-semibold text-lg">
                                                {getSenderInitials(reply?.sender_email)}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                {reply?.sender_email}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {reply?.sender_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-500 space-x-3">
                                        <span className="text-xs">
                                            {new Date(reply?.createdAt).toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => handleReplyClick(reply, index)}
                                            className="p-2 rounded-full hover:bg-gray-200"
                                        >
                                            <Reply size={22} />
                                        </button>
                                        <button className="p-2 rounded-full hover:bg-gray-200">
                                            <Forward size={22} />
                                        </button>
                                    </div>
                                </div>

                                <h1 className="mt-6 text-lg font-semibold text-gray-800">
                                    {reply?.subject}
                                </h1>

                                <div className="mt-4 text-gray-700 leading-relaxed">
                                    {reply?.body ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(reply?.body),
                                            }}
                                        />
                                    ) : (
                                        <p>No content available</p>
                                    )}
                                </div>

                                {reply?.attachments?.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Attachments:</h3>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {reply?.attachments.map((file, index) => (
                                                <div key={index} className="border p-2 rounded-lg">
                                                    {file?.file_type?.startsWith("image/") ? (
                                                        <img
                                                            src={
                                                                file?.file_path.startsWith("http")
                                                                    ? file?.file_path
                                                                    : `${config.LIVE_URL}/${file?.file_path}`
                                                            }
                                                            alt={file?.original_name}
                                                            className="w-24 h-24 object-cover rounded cursor-pointer"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center">
                                                            <p>
                                                                {file?.original_name ||
                                                                    "Unknown File"}
                                                            </p>
                                                            <div
                                                                onClick={() =>
                                                                    handleDownload(
                                                                        `${config.LIVE_URL}/${file?.file_path}`,
                                                                        file?.original_name,
                                                                    )
                                                                }
                                                                className="block mt-1 text-blue-500 cursor-pointer"
                                                            >
                                                                <MdOutlineFileDownload className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {isReplying && replyDetails && (
                    <div ref={replyRef}>
                        <ReplyMail
                            originalEmailId={email?._id}
                            recipientEmail={replyDetails?.recipientEmail}
                            senderEmailCC={email?.recipient_emails_cc[0]}
                            senderEmailBCC={email?.recipient_emails_bcc[0]}
                            senderEmail={replyDetails?.recipient_emails_to}
                            subject={replyDetails?.subject}
                            createdAt={replyDetails?.createdAt}
                            user={email?.sender_name}
                            content={replyDetails?.content}
                            onSend={handleReply}
                            onClose={() => setIsReplying(false)}
                            index={replyDetails?.index}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailView;
