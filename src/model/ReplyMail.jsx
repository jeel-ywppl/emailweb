import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../componets/ComposeEmail/TextEditor";
import AttachmentInput from "../componets/ComposeEmail/AttachmentInput";
import {Close, ExpandMore, ExpandLess} from "@mui/icons-material";
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
    index, // Add index prop
}) => {
    const [replySubject, setReplySubject] = useState("");
    const [body, setBody] = useState(""); // Keep body empty initially
    const [attachments, setAttachments] = useState([]);
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    // Clear the body field when the modal opens (or when the required props change)
    useEffect(() => {
        setReplySubject(subject); // Set the subject for reply
        setBody(""); // Clear body to make it empty initially
    }, [subject, recipientEmail, senderEmail, createdAt, user, content]); // Ensure effect runs only when these change

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("originalEmailId", originalEmailId);
        formData.append("subject", replySubject);
        formData.append("body", body);
        formData.append("is_reply", true);
        formData.append("recipient_emails_to", recipientEmail);
        formData.append("recipient_emails_cc", "");
        formData.append("recipient_emails_bcc", "");
        formData.append("index", index);
        attachments.forEach((file) => {
            formData.append("files", file);
        });
        onSend(formData);
    };

    const toggleMessageVisibility = () => {
        setIsMessageVisible((prev) => {
            const newVisibility = !prev;
            if (newVisibility) {
                setBody(
                    (prevBody) =>
                        prevBody +
                        `
                    <p>on ${new Date(
                        createdAt,
                    ).toLocaleString()} ${user} &lt;${recipientEmail}&gt; wrote:</p>
                    <p>${content}</p>
                `,
                );
            } else {
                setBody((prevBody) => prevBody.replace(/<p>on .*? wrote:<\/p>\s*<p>.*?<\/p>/, ""));
            }
            return newVisibility;
        });
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
                        label="subject"
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="mt-2 relative">
                    <TextEditor setBody={setBody} body={body} />
                    <button
                        type="button"
                        onClick={toggleMessageVisibility}
                        className="absolute right-2 top-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {isMessageVisible ? <ExpandLess /> : <ExpandMore />}
                        <span className="ml-1">{isMessageVisible ? "" : ""}</span>
                    </button>
                </div>
                <AttachmentInput attachments={attachments} setAttachments={setAttachments} />

                <div className="flex justify-end mt-4">
                    <Button
                        color="primary1"
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
    recipientEmail: PropTypes.string.isRequired,
    onSend: PropTypes.func.isRequired,
    senderEmail: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    originalEmailId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default ReplyMail;
