import { Button, Dialog,  DialogBody, DialogFooter } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const LoginAuthOtpModel = ({
    open,
    otp,
    handleChange,
    handleBackspace,
    handleSubmit,
    onCancel,
    errorMessage,
    loading,
}) => {
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (open && firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [open]);

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0) {
            handleBackspace(e, index);
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        if (e.key === "ArrowRight" && index < otp.length - 1) {
            e.preventDefault();
            document.getElementById(`otp-input-${index + 1}`).focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        if (e.key === "Enter") {
            handleSubmit();
        }

        if (e.key === "Escape") {
            onCancel();
        }
    };

    const handleOtpSubmit = () => {
        const otpString = otp.join(""); 
        handleSubmit(otpString);
    };

    if (!open) return null;

    return (
        <Dialog open={open} handler={onCancel} size="sm">
            <h2 className="text-3xl pt-3 font-medium text-gray-800 text-center">
                Two-Factor Authentication
            </h2>
            <DialogBody>
                   <p className="text-center text-sm text-gray-500 mb-5">enter the 6-digit code genrated by your authenticator app to confirm your action.</p>
                <div className="flex gap-4 justify-center mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="border border-gray-300 text-center w-14 h-14 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id={`otp-input-${index}`}
                            aria-label={`OTP digit ${index + 1}`}
                            ref={index === 0 ? firstInputRef : null}
                        />
                    ))}
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
                )}
            </DialogBody>
            <DialogFooter className="flex items-end justify-end gap-3">
                <Button
                    onClick={onCancel}
                    color="gray"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleOtpSubmit}
                    color="blue"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Submit"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

LoginAuthOtpModel.propTypes = {
    open: PropTypes.bool.isRequired,
    otp: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBackspace: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
};

LoginAuthOtpModel.defaultProps = {
    errorMessage: "",
    loading: false,
};

export default LoginAuthOtpModel;
