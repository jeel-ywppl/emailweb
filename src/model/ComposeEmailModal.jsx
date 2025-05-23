import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, IconButton} from "@material-tailwind/react";
import RecipientInput from "../componets/ComposeEmail/RecipientInput";
import SubjectInput from "../componets/ComposeEmail/SubjectInput";
import TextEditor from "../componets/ComposeEmail/TextEditor";
import AttachmentInput from "../componets/ComposeEmail/AttachmentInput";
import {FiMaximize, FiMinimize2} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../store";
import {deleteDraft, getAllDraftsbyUser, getDraftById, updateDraft} from "../store/draft";
import {getAllEmailbyUser, sendMail} from "../store/email";
import {TrashIcon} from "lucide-react";
import MyButton from "../componets/MyButton";

const ComposeEmailModal = ({isOpen, onClose, draft_id, forwardData}) => {
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
        if (isOpen && forwardData) {
            setRecipients([]);
            setCcRecipients([]);
            setBccRecipients([]);
            setSubject(forwardData?.subject || "");
            setBody(() => {
                const formattedForward = `
                    <br/><br/>
                    ---------- Forwarded message ---------<br/>
                    <strong>From:</strong> ${forwardData?.user || ""} &lt;${
                    forwardData?.user?.email || ""
                }&gt;<br/>
                    <strong>Sent:</strong> ${new Date(forwardData?.createdAt).toLocaleString()}<br/>
                    <strong>Subject:</strong> ${forwardData?.subject}<br/><br/>
                    ${forwardData?.content || ""}
                `;
                return formattedForward;
            });
        }
    }, [isOpen, forwardData]);

    useEffect(() => {
        if (isOpen && draft_id && !hasFetchedDraft) {
            dispatch(getDraftById(draft_id))
                .unwrap()
                .then((response) => {
                    if (response?.success) {
                        const draft = response?.draft;
                        setRecipients(draft?.recipient_emails_to || []);
                        setCcRecipients(draft?.recipient_emails_cc || []);
                        setBccRecipients(draft?.recipient_emails_bcc || []);
                        setSubject(draft?.subject || "");
                        setBody(draft?.body || "");
                        setAttachments(draft?.attachments || []);
                        setHasFetchedDraft(true);
                    } else {
                        console.error("Failed to fetch draft. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching draft:", error);
                });
        }
    }, [isOpen, draft_id, dispatch, hasFetchedDraft]);

    const extractEmails = (recipientsArray) =>
        recipientsArray
            .map((r) => (typeof r === "object" && r.email ? r.email : r))
            ?.filter((email) => typeof email === "string" && email.trim() !== "");

    // const handleSubmit = (actionType) => {
    //     if (isSending) return;

    //     setIsSending(true);

    //     const recipientEmailsTo = extractEmails(recipients);
    //     const recipientEmailsCc = extractEmails(ccRecipients);
    //     const recipientEmailsBcc = extractEmails(bccRecipients);

    //     if (
    //         recipientEmailsTo.length === 0 &&
    //         recipientEmailsCc.length === 0 &&
    //         recipientEmailsBcc.length === 0 &&
    //         actionType === "send"
    //     ) {
    //         setIsSending(false);
    //         return;
    //     }

    //     const formData = new FormData();

    //     recipientEmailsTo.forEach((email, index) =>
    //         formData.append(`recipient_emails_to[${index}]`, email),
    //     );
    //     recipientEmailsCc.forEach((email, index) =>
    //         formData.append(`recipient_emails_cc[${index}]`, email),
    //     );
    //     recipientEmailsBcc.forEach((email, index) =>
    //         formData.append(`recipient_emails_bcc[${index}]`, email),
    //     );

    //     formData.append("subject", subject);
    //     formData.append("body", body);

    //     attachments
    //         .filter((file) => file instanceof File)
    //         .forEach((file) => {
    //             formData.append("files", file);
    //         });

    //     if (actionType === "save" && draft_id) {
    //         formData.append("draft_id", draft_id);
    //     }

    //     const formDataLog = {};
    //     formData.forEach((value, key) => {
    //         if (key === "files" && value.name) {
    //             if (!formDataLog[key]) formDataLog[key] = [];
    //             formDataLog[key].push(value.name);
    //         } else {
    //             formDataLog[key] = value;
    //         }
    //     });

    //     formData.append("is_reply", actionType === "send" && forwardData ? "false" : "true");
    //     if (forwardData?.id) {
    //         formData.append("email_id", forwardData?.id);
    //     }

    //     const action = actionType === "send" ? sendMail(formData) : updateDraft(formData);

    //     dispatch(action)
    //         .unwrap()
    //         .then(() => {
    //             if (actionType === "send") {
    //                 dispatch(getAllEmailbyUser({}));
    //                 if (draft_id) {
    //                     dispatch(deleteDraft({draft_ids: [draft_id]}));
    //                 }
    //             } else {
    //                 dispatch(getAllDraftsbyUser({}));
    //             }
    //             resetForm();
    //             onClose();
    //         })
    //         .catch((error) => {
    //             console.error("Failed to send email:", error);
    //         })
    //         .finally(() => {
    //             setIsSending(false);
    //         });
    // };

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
            setIsSending(false);
            return;
        }

        const formData = new FormData();

        // Append recipient emails without using bracket notation
        recipientEmailsTo.forEach((email) => formData.append("recipient_emails_to[]", email));
        recipientEmailsCc.forEach((email) => formData.append("recipient_emails_cc[]", email));
        recipientEmailsBcc.forEach((email) => formData.append("recipient_emails_bcc[]", email));

        formData.append("subject", subject);
        formData.append("body", body);

        // Append attachments (Files)
        attachments
            .filter((file) => file instanceof File)
            .forEach((file) => {
                formData.append("files", file);
            });

        // Draft ID if saving
        if (actionType === "save" && draft_id) {
            formData.append("draft_id", draft_id);
        }

        // is_reply and email_id (for reply/forward)
        formData.append("is_reply", actionType === "send" && forwardData ? "false" : "true");

        if (forwardData?.id) {
            formData.append("email_id", forwardData?.id);
        }

        // Log the full FormData
        console.log("📦 FormData Payload:");
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(
                    `${key}: File -> name: ${value.name}, size: ${value.size}, type: ${value.type}`,
                );
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        // Send or save
        const action = actionType === "send" ? sendMail(formData) : updateDraft(formData);

        dispatch(action)
            .unwrap()
            .then(() => {
                if (actionType === "send") {
                    dispatch(getAllEmailbyUser({}));
                    if (draft_id) {
                        dispatch(deleteDraft({draft_ids: [draft_id]}));
                    }
                } else {
                    dispatch(getAllDraftsbyUser({}));
                }
                resetForm();
                onClose();
            })
            .catch((error) => {
                console.error("❌ Failed to send email:", error);
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
                            typeof r === "object" && r?.email ? r?.email : r,
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
                                typeof r === "object" && r?.email ? r?.email : r,
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
                <MyButton
                    type="sidenav"
                    onClick={() => handleSubmit("send")}
                    disabled={isLoading || isSending}
                    label={isLoading || isSending ? "Sending..." : "Send"}
                    className="px-5 py-2 rounded-lg font-medium"
                />
            </div>
        </Dialog>
    );
};

ComposeEmailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    draft_id: PropTypes.string,
    forwardData: PropTypes.shape({
        subject: PropTypes.string,
        content: PropTypes.string,
        id: PropTypes.string,
        createdAt: PropTypes.string,
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
        }),
    }),
};

export default ComposeEmailModal;
