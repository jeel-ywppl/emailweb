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
    subject,
    createdAt,
    user,
    content,
    onClose,
    originalEmailId,
}) => {
    const [replySubject, setReplySubject] = useState("");
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [recipientEmailsCc, setRecipientEmailsCc] = useState([]); 
    const [recipientEmailsBcc, setRecipientEmailsBcc] = useState([]); 

    useEffect(() => {
        setReplySubject(subject);
        setBody("");
    }, [subject, recipientEmail, senderEmail, createdAt, user, content]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("originalEmailId", originalEmailId);
        formData.append("subject", replySubject);
        formData.append("body", body);
        formData.append("is_reply", true);

        const recipientEmails = Array.isArray(recipientEmail) ? recipientEmail : [recipientEmail];
        recipientEmails.forEach((email, index) => {
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

        attachments.forEach((file) => {
            formData.append("files", file);
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
                <h2 className="text-lg font-semibold">Reply to {recipientEmail}</h2>

                <div className="mt-2">
                    <Input
                        label="Subject"
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </div>

                {/* CC Field */}
                <div className="mt-2">
                    <Input
                        label="CC"
                        type="text"
                        value={recipientEmailsCc.join(", ")}
                        onChange={(e) =>
                            setRecipientEmailsCc(
                                e.target.value.split(",").map((email) => email.trim()),
                            )
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                </div>

                {/* BCC Field */}
                <div className="mt-2">
                    <Input
                        label="BCC"
                        type="text"
                        value={recipientEmailsBcc.join(", ")}
                        onChange={(e) =>
                            setRecipientEmailsBcc(
                                e.target.value.split(",").map((email) => email.trim()),
                            )
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
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
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
};

ReplyMail.propTypes = {
    recipientEmail: PropTypes.array.isRequired,
    onSend: PropTypes.func.isRequired,
    senderEmail: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    originalEmailId: PropTypes.string.isRequired,
};

export default ReplyMail;
