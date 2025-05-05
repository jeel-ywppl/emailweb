
import {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import ReplyMail from "../../../model/ReplyMail";

const ReplySection = ({ replyDetails, senderName, onSend, onClose}) => {
    const replyRef = useRef(null);

    useEffect(() => {
        if (replyRef.current) {
            replyRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, []);

    return (
        <div ref={replyRef} className="mt-4">
            <ReplyMail
                originalEmailId={replyDetails.id}
                recipientEmail={
                    Array.isArray(replyDetails?.recipientEmail)
                        ? replyDetails?.recipientEmail
                        : [replyDetails?.recipientEmail]
                }
                senderEmailCC={replyDetails?.senderEmailCC}
                senderEmailBCC={replyDetails?.senderEmailBCC}
                senderEmail={replyDetails?.senderEmail}
                subject={replyDetails?.subject}
                createdAt={replyDetails?.createdAt}
                user={senderName}
                content={replyDetails?.content}
                onSend={onSend}
                onClose={onClose}
                index={replyDetails?.index}
            />
        </div>
    );
};

ReplySection.propTypes = {
    emailId: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    onSend: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    replyDetails: PropTypes.shape({
        recipientEmail: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]).isRequired,
        senderEmailCC: PropTypes.arrayOf(PropTypes.string),
        senderEmailBCC: PropTypes.arrayOf(PropTypes.string),
        senderEmail: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        content: PropTypes.string,
        index: PropTypes.number,
        id:PropTypes.string
    }).isRequired,
};

export default ReplySection;
