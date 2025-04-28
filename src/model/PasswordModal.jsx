import {Button, Dialog, Input} from "@material-tailwind/react";
import {useState, useEffect, useRef, useCallback} from "react";
import {HiEye, HiEyeOff} from "react-icons/hi";
import PropTypes from "prop-types";
import {useAppDispatch, useAppSelector} from "../store";
import {verifyPasswordFor2FA} from "../store/auth";
import {toast} from "react-toastify";
import MyButton from "../componets/MyButton";

const PasswordModal = ({
    open,
    onConfirm,
    onCancel,
    setShowQRModal,
    setShowOTPModal,
    setShowPasswordModal,
    is2FAEnabled,
    mode,
}) => {
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef(null);
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const handleConfirm = useCallback(async () => {
        try {
            const response = await dispatch(
                verifyPasswordFor2FA({password, onoffStatus: !is2FAEnabled}),
            ).unwrap();
            if (response?.data) {
                onConfirm(response?.data, password);
                if (response?.tfa_status) {
                    setShowQRModal(true);
                } else {
                    setShowOTPModal(false);
                    setShowQRModal(false);
                }
            } else {
                toast.error("No QR code returned from the server.");
                setShowQRModal(false);
                setShowPasswordModal(false);
                setShowOTPModal(true);
            }
        } catch {
            toast.error("Failed to verify password.");
        }
    }, [
        password,
        dispatch,
        is2FAEnabled,
        onConfirm,
        setShowQRModal,
        setShowOTPModal,
        setShowPasswordModal,
    ]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                handleConfirm();
            } else if (event.key === "Escape") {
                onCancel();
            }
        };
        if (open) {
            window.addEventListener("keydown", handleKeyPress);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [open, handleConfirm, onCancel]);

    return (
        <Dialog open={open} handler={onCancel} size="sm" className="w-full">
            <div className="bg-white rounded-lg shadow-xl w-full p-6 space-y-4">
                <h3 className="text-2xl font-normal capitalize text-start text-primary1">
                    {mode === "enable"
                        ? "Disable Two-Factor Authentication"
                        : "Enable Two-Factor Authentication"}
                </h3>
                <p>
                    {mode === "enable"
                        ? "Please enter your password to confirm you would like to disable two-factor authentication for your account."
                        : "Please enter your password to confirm you would like to enable two-factor authentication for your account."}
                </p>
                <div className="relative mb-10">
                    <Input
                        variant="outlined"
                        ref={inputRef}
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    >
                        {passwordVisible ? (
                            <HiEyeOff className="w-5 h-5" />
                        ) : (
                            <HiEye className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <div className="flex flex-wrap justify-end gap-4 mt-5">
                    <Button onClick={onCancel} color="gray" className="py-3 text-xs font-medium">
                        Nevermind
                    </Button>
                    <MyButton
                        label={
                            loading
                                ? "Verifying..."
                                : mode === "enable"
                                ? "Disable two-factor authentication"
                                : "Enable two-factor authentication"
                        }
                        onClick={handleConfirm}
                        type={mode === "enable" ? "danger" : "primary"}
                        disabled={loading}
                        className="py-3 text-xs font-medium"
                    />
                </div>
            </div>
        </Dialog>
    );
};

PasswordModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    setShowQRModal: PropTypes.func.isRequired,
    setShowOTPModal: PropTypes.func.isRequired,
    setShowPasswordModal: PropTypes.func.isRequired,
    is2FAEnabled: PropTypes.bool.isRequired,
};

export default PasswordModal;
