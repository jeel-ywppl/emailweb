import {useState, useRef, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import {useAppDispatch, useAppSelector} from "../store";
import {verifyOTPFor2FA, getUserInfo} from "../store/auth";
import {Dialog} from "@material-tailwind/react";
import MyButton from "../componets/MyButton";

const OtpModal = ({open, onConfirm, onCancel, set2FAEnabled, is2FAEnabled, mode, onClose}) => {
    const dispatch = useAppDispatch();
    const {loading, user} = useAppSelector((state) => state.auth);
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/[^0-9]/g, "");
        setOtp(newOtp);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (event, index) => {
        if (event.key === "Backspace" && !event.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = useCallback(async () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 6) return;
        if (!user?.email) return;

        const response = await dispatch(
            verifyOTPFor2FA({
                email: user.email,
                otp: otpCode,
                tfaStatus: !is2FAEnabled,
            }),
        );

        if (!response?.error?.message) {
            setOtp(Array(6).fill(""));
            dispatch(getUserInfo());
            set2FAEnabled(response?.payload?.tfa_status);
            onConfirm();
            onClose();
        } else {
            setErrorMessage("Invalid OTP. Please try again.");
            setOtp(Array(6).fill(""));
        }
    }, [otp, user, dispatch, is2FAEnabled, set2FAEnabled, onConfirm, onClose]);

    useEffect(() => {
        if (open) {
            setOtp(Array(6).fill(""));
            setErrorMessage("");
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }
    }, [open]);

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleSubmit();
            } else if (event.key === "Escape") {
                handleCancel();
            }
        };

        if (open) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, handleSubmit, handleCancel]);

    return (
        <Dialog size="xs" open={open} onClose={onCancel}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full ">
                <h3 className="text-xl font-semibold text-start text-gray-900">
                    {mode === "enable"
                        ? "Disable Two-Factor Authentication"
                        : "Enable Two-Factor Authentication"}
                </h3>

                <p className="text-gray-600 text-start mt-2">
                    Enter the 6-digit code from your authenticator app to confirm.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3 ">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder="0"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-gray-400 text-lg rounded-md focus:outline-none focus:ring-none  transition-all duration-150"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-center mt-2 text-sm">{errorMessage}</p>
                )}

                <div className="flex justify-end gap-2 mt-6">
                    <MyButton
                        label="Nevermind"
                        onClick={onCancel}
                        type="outlineGray"
                        disabled={loading}
                        className="py-3 text-xs font-medium"
                    />

                    <MyButton
                        label={
                            loading
                                ? "Verifying..."
                                : mode === "enable"
                                ? "Disable two-factor authentication"
                                : "Enable two-factor authentication"
                        }
                        onClick={handleSubmit}
                        type={mode === "enable" ? "danger" : "primary"}
                        disabled={loading}
                        className="py-3 text-xs font-medium"
                    />
                </div>
            </div>
        </Dialog>
    );
};

OtpModal.propTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    set2FAEnabled: PropTypes.func,
    is2FAEnabled: PropTypes.bool,
};

export default OtpModal;
