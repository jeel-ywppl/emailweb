import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, Button, IconButton} from "@material-tailwind/react";
import RecipientInput from "../componets/ComposeEmail/RecipientInput";
import SubjectInput from "../componets/ComposeEmail/SubjectInput";
import TextEditor from "../componets/ComposeEmail/TextEditor";
import AttachmentInput from "../componets/ComposeEmail/AttachmentInput";
import {FiMaximize, FiMinimize2} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../store";
import {deleteDraft, getAllDraftsbyUser, getDraftById, updateDraft} from "../store/draft";
import {getAllEmailbyUser, sendMail} from "../store/email";
import {toast} from "react-toastify";
import {TrashIcon} from "lucide-react";

const ComposeEmailModal = ({isOpen, onClose, draft_id}) => {
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector((state) => state.email);
    const [recipients, setRecipients] = useState([]);
    const [ccRecipients, setCcRecipients] = useState([]);
    const [bccRecipients, setBccRecipients] = useState([]);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [hasFetchedDraft, setHasFetchedDraft] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            resetForm();
            setHasFetchedDraft(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && draft_id && !hasFetchedDraft) {
            dispatch(getDraftById(draft_id))
                .unwrap()
                .then((response) => {
                    if (response.success) {
                        const draft = response?.draft;
                        setRecipients(draft?.recipient_emails_to || []);
                        setCcRecipients(draft?.recipient_emails_cc || []);
                        setBccRecipients(draft?.recipient_emails_bcc || []);
                        setSubject(draft?.subject || "");
                        setBody(draft?.body || "");
                        setAttachments(draft?.attachments || []);
                        setHasFetchedDraft(true);
                    } else {
                        toast.error("Failed to fetch draft. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching draft:", error);
                    toast.error("Failed to fetch draft. Please try again.");
                });
        }
    }, [isOpen, draft_id, dispatch, hasFetchedDraft]);

    const extractEmails = (recipientsArray) =>
        recipientsArray
            .map((r) => (typeof r === "object" && r.email ? r.email : r))
            .filter((email) => typeof email === "string" && email.trim() !== "");

    const handleSubmit = (actionType) => {
        if (isSending) return;

        setIsSending(true);

        const recipientEmailsTo = extractEmails(recipients);
        const recipientEmailsCc = extractEmails(ccRecipients);
        const recipientEmailsBcc = extractEmails(bccRecipients);

        if (
            recipientEmailsTo.length === 0 &&
            recipientEmailsCc.length === 0 &&
            recipientEmailsBcc.length === 0 &&
            actionType === "send"
        ) {
            console.error("At least one recipient is required.");
            toast.error("At least one recipient is required."); // Notify user
            setIsSending(false);
            return;
        }

        const newEmail = {
            recipient_emails_to: recipientEmailsTo,
            recipient_emails_cc: recipientEmailsCc,
            recipient_emails_bcc: recipientEmailsBcc,
            subject,
            body,
            files: attachments,
        };

        if (actionType === "save" && draft_id) {
            newEmail.draft_id = draft_id;
        }

        const formData = new FormData();
        Object.keys(newEmail).forEach((key) => {
            if (Array.isArray(newEmail[key])) {
                newEmail[key]?.forEach((item, index) => formData.append(`${key}[${index}]`, item));
            } else {
                formData.append(key, newEmail[key]);
            }
        });

        const action = actionType === "send" ? sendMail(formData) : updateDraft(formData);

        dispatch(action)
            .unwrap()
            .then(() => {
                if (actionType === "send") {
                    dispatch(getAllEmailbyUser({}));
                    if (draft_id) {
                        const draftIdsArray = [draft_id];
                        dispatch(deleteDraft({draft_ids: draftIdsArray}));
                    }
                } else {
                    dispatch(getAllDraftsbyUser({}));
                }
                resetForm();
                onClose();
            })
            .catch((error) => {
                console.error("Failed to send email:", error);
                toast.error("Failed to send email. Please try again.");
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    const resetForm = () => {
        setRecipients([]);
        setCcRecipients([]);
        setBccRecipients([]);
        setSubject("");
        setBody("");
        setAttachments([]);
        setShowCc(false);
        setShowBcc(false);
        setHasFetchedDraft(false);
    };

    const handleClose = () => {
        if (
            !recipients.length &&
            !ccRecipients.length &&
            !bccRecipients.length &&
            !subject &&
            !body
        ) {
            onClose();
        } else {
            handleSubmit("save");
        }
    };

    const toggleFullScreen = () => {
        setIsFullScreen((prev) => !prev);
    };

    const handleDeleteDraft = () => {
        if (draft_id) {
            const draftIdsArray = [draft_id];
            dispatch(deleteDraft({draft_ids: draftIdsArray}))
                .unwrap()
                .then(() => {
                    dispatch(getAllDraftsbyUser({}));
                    onClose();
                })
                .catch((error) => {
                    console.error("Failed to delete draft:", error);
                    toast.error("Failed to delete draft. Please try again.");
                });
        }
    };

    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            className={`block my-auto rounded-lg space-y-2 shadow-xl p-4 w-full ${
                isFullScreen ? "h-screen w-screen" : "sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
            } overflow-y-auto scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack`}
        >
            <div className="flex justify-between items-center border-b pb-2">
                <div className="text-lg font-semibold text-gray-700">Compose New Mail</div>
                <div className="flex items-center space-x-2">
                    <IconButton variant="text" onClick={handleDeleteDraft} className="text-red-600">
                        <TrashIcon className="h-5 w-5 text-gray-600" />
                    </IconButton>
                    <IconButton variant="text" onClick={toggleFullScreen}>
                        {isFullScreen ? (
                            <FiMinimize2 className="h-5 w-5 text-gray-600" />
                        ) : (
                            <FiMaximize className="h-5 w-5 text-gray-600" />
                        )}
                    </IconButton>
                    <IconButton variant="text" onClick={handleClose}>
                        <XMarkIcon className="h-5 w-5 text-gray-600" />
                    </IconButton>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-center items-center">
                    <RecipientInput
                        label="To"
                        recipients={recipients.map((r) =>
                            typeof r === "object" && r.email ? r.email : r,
                        )}
                        setRecipients={setRecipients}
                    />
                    <div className="flex space-x-2">
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
                    <div className="flex justify-between items-center">
                        <RecipientInput
                            label="CC"
                            recipients={ccRecipients.map((r) =>
                                typeof r === "object" && r.email ? r.email : r,
                            )}
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
                            recipients={bccRecipients.map((r) =>
                                typeof r === "object" && r.email ? r.email : r,
                            )}
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
                <SubjectInput subject={subject} setSubject={setSubject} />
                <TextEditor setBody={setBody} body={body} />
                <AttachmentInput attachments={attachments} setAttachments={setAttachments} />
            </div>
            <div className="flex justify-end mt-4 items-baseline">
                <Button
                    color="primary1"
                    onClick={() => handleSubmit("send")}
                    disabled={isLoading || isSending}
                    className="px-5 py-2 rounded-lg font-medium"
                >
                    {isSending ? (
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
    draft_id: PropTypes.string,
};

export default ComposeEmailModal;
