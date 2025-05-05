import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../componets/ComposeEmail/TextEditor";
import AttachmentInput from "../componets/ComposeEmail/AttachmentInput";
import {Close} from "@mui/icons-material";
import {Button, Input} from "@material-tailwind/react";

const ReplyMail = ({
    recipientEmail,
    onSend,
    senderEmail,
    originalEmailId,
    subject,
    createdAt,
    user,
    content,
    onClose,
}) => {
    const [replySubject, setReplySubject] = useState("");
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [recipientEmailsCc, setRecipientEmailsCc] = useState([]);
    const [recipientEmailsBcc, setRecipientEmailsBcc] = useState([]);

    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recipientEmailsTo, setRecipientEmailsTo] = useState([]);

    useEffect(() => {
        const filteredRecipients = Array.isArray(recipientEmail)
            ? recipientEmail.filter((email) => email !== senderEmail)
            : recipientEmail !== senderEmail
            ? [recipientEmail]
            : [];

        setRecipientEmailsTo(filteredRecipients);

        const formattedDate = new Date(createdAt).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        const quotedBody = `
            <br/><br/><br/><br/><br/><br/>
            On ${formattedDate}, ${user} &lt;${senderEmail}&gt; wrote:
            <blockquote style="margin:0 0 0 1em; padding-left:1em; border-left:2px solid #ccc;">
                ${content}
            </blockquote>
        `;

        setReplySubject(subject);
        setBody(quotedBody);
    }, [subject, recipientEmail, senderEmail, createdAt, user, content]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("originalEmailId", originalEmailId);
        formData.append("subject", replySubject);
        formData.append("body", body);
        formData.append("is_reply", true);

        const toEmails = recipientEmailsTo?.filter((email) => email);
        toEmails.forEach((email, index) => {
            formData.append(`recipient_emails_to[${index}]`, email);
        });

        const ccEmails = Array.isArray(recipientEmailsCc)
            ? recipientEmailsCc
            : recipientEmailsCc
            ? [recipientEmailsCc]
            : [];

        const bccEmails = Array.isArray(recipientEmailsBcc)
            ? recipientEmailsBcc
            : recipientEmailsBcc
            ? [recipientEmailsBcc]
            : [];

        ccEmails.forEach((email, index) => {
            formData.append(`recipient_emails_cc[${index}]`, email);
        });

        bccEmails.forEach((email, index) => {
            formData.append(`recipient_emails_bcc[${index}]`, email);
        });

        if (attachments && attachments.length > 0) {
            attachments.forEach((file) => {
                formData.append(`files`, file);
            });
        }

        const formDataLog = {};
        formData.forEach((value, key) => {
            if (key.includes("files")) {
                formDataLog[key] = value.name ? value.name : value;
            } else {
                formDataLog[key] = value;
            }
        });

        onSend(formData);
    };

    return (
        <div className="relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                title="Close"
            >
                <Close />
            </button>

            <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-lg bg-white shadow-md">
                <div className="mt-4">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col flex-grow">
                            <label htmlFor="toInput" className="text-sm text-gray-600 mb-1">
                                To
                            </label>
                            <input
                                id="toInput"
                                type="text"
                                value={recipientEmailsTo.join(", ")}
                                onChange={(e) =>
                                    setRecipientEmailsTo(
                                        e.target.value.split(",").map((email) => email.trim()),
                                    )
                                }
                                className="w-full outline-none border-b border-gray-400 focus:border-blue-500 focus:ring-0 rounded-none py-1 px-2"
                                required
                            />
                        </div>

                        <div className="flex space-x-2 pt-6">
                            {!showCc && (
                                <button
                                    type="button"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                    onClick={() => setShowCc(true)}
                                >
                                    CC
                                </button>
                            )}
                            {!showBcc && (
                                <button
                                    type="button"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                    onClick={() => setShowBcc(true)}
                                >
                                    BCC
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {showCc && (
                    <div className="flex justify-between items-center mt-2">
                        <label htmlFor="">CC:- </label>
                        <input
                            type="text"
                            value={recipientEmailsCc.join(", ")}
                            onChange={(e) =>
                                setRecipientEmailsCc(
                                    e.target.value.split(",").map((email) => email.trim()),
                                )
                            }
                            className="flex-1 py-1 px-2 border-b"
                        />
                        <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => setShowCc(false)}
                        >
                            Hide CC
                        </button>
                    </div>
                )}

                {showBcc && (
                    <div className="flex justify-between items-center mt-2">
                        <label htmlFor="">BCC:- </label>
                        <input
                            type="text"
                            value={recipientEmailsBcc.join(", ")}
                            onChange={(e) =>
                                setRecipientEmailsBcc(
                                    e.target.value.split(",").map((email) => email.trim()),
                                )
                            }
                            className="flex-1 py-1 px-2 border-b"
                        />
                        <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => setShowBcc(false)}
                        >
                            Hide BCC
                        </button>
                    </div>
                )}

                <div className="mt-2">
                    <Input
                        label="Subject"
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2 relative">
                    <TextEditor setBody={setBody} body={body} />
                </div>

                <AttachmentInput attachments={attachments} setAttachments={setAttachments} />

                <div className="flex justify-end mt-4">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-4 px-4 py-2 text-white rounded-md ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSubmitting ? "Sending..." : "Send"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

ReplyMail.propTypes = {
    recipientEmail: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
        .isRequired,
    onSend: PropTypes.func.isRequired,
    senderEmail: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    originalEmailId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ReplyMail;
