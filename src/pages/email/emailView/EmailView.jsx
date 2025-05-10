import {useState, useEffect, useRef, useCallback} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store";
import {changeEmailStatus, getSinglMail, replyMail} from "../../../store/email";
import Loader from "../../../componets/Loader";
import EmailHeader from "./EmailHeader";
import EmailDetails from "./EmailDetails";
import RepliesList from "./RepliesList";
import ReplySection from "./ReplySection";
import ComposeEmailModal from "../../../model/ComposeEmailModal";

const EmailView = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const replyRef = useRef(null);
    const {selectedEmail: email, isLoading} = useAppSelector((state) => state.email);
    const loggedInUserEmail = useAppSelector((state) => state.auth.user?.email);

    const [isReplying, setIsReplying] = useState(false);
    const [replyDetails, setReplyDetails] = useState(null);

    const [isStarred, setIsStarred] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
    const [isSpam, setIsSpam] = useState(false);
    const [isUnread, setIsUnread] = useState(false);
    const [showCompose, setShowCompose] = useState(false);
    const [forwardData, setForwardData] = useState(null);

    useEffect(() => {
        dispatch(getSinglMail(id));
    }, [dispatch, id]);

    const handleReply = async (formData) => {
        try {
            const response = await dispatch(replyMail(formData));
            if (response?.payload?.success) {
                setIsReplying(false);
                await dispatch(getSinglMail(id));
            } else {
                console.error("Failed to send reply:", response?.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    const handleForwardClick = () => {
        setForwardData({
            subject: `Fwd: ${email?.subject}`,
            content: email?.body,
            user: email?.from,
            createdAt: email?.createdAt,
            id: email?._id,
        });
        setShowCompose(true);
    };

    const handleReplyClick = useCallback(
        (reply) => {
            let recipientEmail = email?.recipient_emails_to || [];
            if (reply) {
                recipientEmail = reply?.recipient_emails_to || [];
            }

            const isLoggedInUserInRecipients = recipientEmail.includes(loggedInUserEmail);

            const filteredRecipients = isLoggedInUserInRecipients
                ? [reply ? reply.sender_email : email.sender_email]
                : recipientEmail.filter((email) => email !== loggedInUserEmail);

            if (reply) {
                setReplyDetails({
                    senderEmail: filteredRecipients,
                    recipientEmail: filteredRecipients,
                    senderEmailCC: reply?.recipient_emails_cc,
                    senderEmailBCC: reply?.recipient_emails_bcc,
                    subject: reply?.subject || email?.subject,
                    user: reply?.from,
                    createdAt: reply?.createdAt,
                    content: reply?.body,
                    id: email?._id,
                });
            } else {
                setReplyDetails({
                    recipientEmail: filteredRecipients,
                    senderEmail: filteredRecipients,
                    senderEmailCC: email?.recipient_emails_cc,
                    senderEmailBCC: email?.recipient_emails_bcc,
                    subject: email?.subject,
                    user: email?.from,
                    createdAt: email?.createdAt,
                    content: email?.body,
                    id: email?._id,
                });
            }
            setIsReplying(true);
            setTimeout(() => {
                replyRef?.current?.scrollIntoView({behavior: "smooth", block: "start"});
            }, 300);
        },
        [email, loggedInUserEmail],
    );

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
            <div className="w-full h-full overflow-y-auto font-sans rounded-lg scrollbar-thin">
                <EmailHeader
                    onBack={() => navigate(-1)}
                    onAction={handleEmailAction}
                    isStarred={isStarred}
                />
                <EmailDetails
                    email={email}
                    onReply={handleReplyClick}
                    onForward={handleForwardClick}
                    onStar={handleEmailAction.bind(null, "star")}
                    isStarred={isStarred}
                />

                <RepliesList replies={email?.replies} onReplyClick={handleReplyClick} />
                {isReplying && replyDetails && (
                    <div ref={replyRef}>
                        <ReplySection
                            replyDetails={replyDetails}
                            email={email}
                            onSend={handleReply}
                            onClose={() => setIsReplying(false)}
                        />
                    </div>
                )}
            </div>
            <ComposeEmailModal
                isOpen={showCompose}
                onClose={() => setShowCompose(false)}
                forwardData={forwardData}
            />
        </div>
    );
};

export default EmailView;
