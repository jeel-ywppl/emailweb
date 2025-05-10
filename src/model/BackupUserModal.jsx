import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {Input, Dialog} from "@material-tailwind/react";
import {useAppDispatch} from "../store";
import {backupData} from "../store/backup";
import MyButton from "../componets/MyButton";

const BackupUserModal = ({isOpen, onClose, user}) => {
    const dispatch = useAppDispatch();
    const [backupEmail, setBackupEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            setBackupEmail("");
            setErrorMessage("");
        }
    }, [isOpen]);

    const handleBackup = async () => {
        if (!backupEmail) {
            setErrorMessage("Email is required.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(backupEmail)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setErrorMessage("");

        const value = {
            user_id: user?._id,
            backup_user_email: backupEmail,
        };

        try {
            const response = await dispatch(backupData(value));

            if (response?.payload?.success) {
                onClose();
            } else {
                setErrorMessage(
                    response?.payload?.message ||
                        "An error occurred while sending the backup email.",
                );
            }
        } catch {
            setErrorMessage("Failed to send backup email. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} handler={onClose} size="sm">
            <div className="p-5">
                <h2 className="text-lg font-semibold mb-4">Backup User</h2>
                <p className="text-sm text-gray-600 mb-4">
                    You are about to send a backup email for <strong>{user?.email}</strong>. Please
                    enter the email below.
                </p>

                <Input
                    type="email"
                    label="Backup Email"
                    value={backupEmail}
                    onChange={(e) => setBackupEmail(e.target.value)}
                    className="mb-4"
                />

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <div className="flex justify-end gap-2 mt-3">
                    <MyButton label="Cancel" onClick={onClose} type="outlineGray" />

                    <MyButton label="Send" onClick={handleBackup} type="primary" />
                </div>
            </div>
        </Dialog>
    );
};

BackupUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
    }),
};

BackupUserModal.defaultProps = {
    user: null,
};

export default BackupUserModal;
