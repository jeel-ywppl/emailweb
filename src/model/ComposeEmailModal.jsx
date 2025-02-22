import {useState} from "react";
import PropTypes from "prop-types";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, Button, IconButton} from "@material-tailwind/react";
import RecipientInput from "../componets/ComposeEmail/RecipientInput";
import SubjectInput from "../componets/ComposeEmail/SubjectInput";
import TextEditor from "../componets/ComposeEmail/TextEditor";
import AttachmentInput from "../componets/ComposeEmail/AttachmentInput";

const ComposeEmailModal = ({isOpen, onClose, onSend}) => {
    const [recipients, setRecipients] = useState([]);
    const [ccRecipients, setCcRecipients] = useState([]);
    const [bccRecipients, setBccRecipients] = useState([]);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);

    const handleSend = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newEmail = {
                to: recipients,
                cc: ccRecipients,
                bcc: bccRecipients,
                subject,
                body,
                attachments,
            };
            onSend(newEmail);

            // Reset form fields
            setRecipients([]);
            setCcRecipients([]);
            setBccRecipients([]);
            setSubject("");
            setBody("");
            setAttachments([]);
            setShowCc(false);
            setShowBcc(false);
            setIsLoading(false);
            onClose();
        }, 500);
    };

    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            className="block my-auto rounded-lg space-y-2 shadow-xl p-4 w-full max-w-full sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-full md:h-[82%] lg:h-[82%]  xl:h-[80%] overflow-y-auto  scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
            <div className="flex justify-between items-center border-b pb-2">
                <div className="text-lg font-semibold text-gray-700">New Message</div>
                <div className="flex items-center space-x-2">
                    <IconButton variant="text" onClick={onClose}>
                        <XMarkIcon className="h-5 w-5 text-gray-600" />
                    </IconButton>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-center items-center">
                    <RecipientInput
                        label="To"
                        recipients={recipients}
                        setRecipients={setRecipients}
                    />
                    <div className="flex space-x-2 ">
                        {!showCc && (
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                onClick={() => setShowCc(true)}
                            >
                                CC
                            </button>
                        )}
                        {!showBcc && (
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                onClick={() => setShowBcc(true)}
                            >
                                BCC
                            </button>
                        )}
                    </div>
                </div>
                {showCc && (
                    <div className="flex justify-between items-center ">
                        <RecipientInput
                            label="CC"
                            recipients={ccRecipients}
                            setRecipients={setCcRecipients}
                        />
                        <button
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => setShowCc(false)}
                        >
                            Hide CC
                        </button>
                    </div>
                )}
                {showBcc && (
                    <div className="flex justify-between items-center">
                        <RecipientInput
                            label="BCC"
                            recipients={bccRecipients}
                            setRecipients={setBccRecipients}
                        />
                        <button
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => setShowBcc(false)}
                        >
                            Hide BCC
                        </button>
                    </div>
                )}
                <SubjectInput subject={subject} setSubject={setSubject} className="" />
                <TextEditor setBody={setBody} body={body} />
                <AttachmentInput attachments={attachments} setAttachments={setAttachments} />
            </div>
            <div className="flex justify-end mt-4 items-baseline">
                <Button
                    color="primary1"
                    onClick={handleSend}
                    disabled={isLoading}
                    className="px-5 py-2 rounded-lg font-medium"
                >
                    {isLoading ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Send"
                    )}
                </Button>
            </div>
        </Dialog>
    );
};

ComposeEmailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
};

export default ComposeEmailModal;
