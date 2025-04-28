import PropTypes from "prop-types";
import {useAppDispatch} from "../store";
import {send2FARecoveryOTP} from "../store/auth";
import {useEffect, useState, useCallback} from "react";
import {Dialog} from "@material-tailwind/react";
import RecovryOTPVerify from "./RecovryOTPVerify";
import MyButton from "../componets/MyButton";

const LostAccessModal = ({open, onClose, email, user, set2FAEnabled, is2FAEnabled}) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    const handleContinue = useCallback(async () => {
        setLoading(true);
        try {
            const result = await dispatch(send2FARecoveryOTP({onoff_status: true})).unwrap();
            if (result) {
                setShowVerifyModal(true);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            } else if (event.key === "Enter") {
                handleContinue();
            }
        };
        if (open) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose, handleContinue]);

    return (
        <>
            <Dialog open={open} handler={onClose} className="py-8 px-5 space-y-7">
                <div>
                    <h1 className="text-3xl font-sans font-semibold text-gray-800">
                        Disable two-factor authentication
                    </h1>
                    <span className="block text-base font-normal text-gray-600">{user?.email}</span>
                </div>
                <div>
                    <p className="mt-2 text-base text-gray-700">
                        To proceed, we must verify the request. We’ll send a reset code to{" "}
                        <span className="font-semibold">{email}</span>.
                    </p>
                </div>
                <div className="flex items-center justify-end">
                    <MyButton label="Cancel" onClick={onClose} type="outlineGray" />

                    <MyButton
                        label={loading ? "Processing..." : "Continue"}
                        onClick={handleContinue}
                        disabled={loading}
                        type="primary"
                    />
                </div>
            </Dialog>

            <RecovryOTPVerify
                open={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
                email={email}
                set2FAEnabled={set2FAEnabled}
                is2FAEnabled={is2FAEnabled}
            />
        </>
    );
};

LostAccessModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    set2FAEnabled: PropTypes.func,
    is2FAEnabled: PropTypes.bool,
    user: PropTypes.shape({
        email: PropTypes.string,
    }).isRequired,
};

export default LostAccessModal;
