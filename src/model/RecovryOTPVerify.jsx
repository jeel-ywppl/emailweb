import PropTypes from "prop-types";
import {useAppDispatch} from "../store";
import {useState} from "react";
import {verify2FARecoveryOTP} from "../store/auth";
import {Dialog, Button} from "@material-tailwind/react";

const RecovryOTPVerify = ({open, onClose, email, set2FAEnabled, is2FAEnabled}) => {
    const dispatch = useAppDispatch();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async () => {
        setLoading(true);
        setError("");

        try {
            const isValidOTP = /^[0-9]{6}$/.test(code);
            if (!isValidOTP) {
                throw new Error("Please enter a valid 6-digit OTP.");
            }

            const result = await dispatch(
                verify2FARecoveryOTP({otp: parseInt(code), onoff_status: !is2FAEnabled}),
            ).unwrap();

            if (set2FAEnabled && typeof set2FAEnabled === "function") {
                set2FAEnabled(result?.onoff_status);
            }

            onClose();
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message || "Invalid OTP, please try again.");
        }

        setLoading(false);
    };

    return (
        <Dialog open={open} handler={onClose} className="py-8 px-5 space-y-7">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Verify account</h1>
                <p className="text-gray-700 mt-2">
                    For security, we sent a verification code to{" "}
                    <span className="font-semibold">{email}</span>. Please enter the code below.
                </p>
                <p className="text-gray-700 mt-2">
                    If you don&apos;t see the email, check your spam folder.
                </p>
            </div>
            <div>
                <label className="text-gray-700 font-semibold text-xl">Verification code</label>
                <input
                    type="number"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    placeholder="123456"
                    className="mt-1 block w-full rounded border focus:shadow-md focus:shadow-gray-500 ring-1 ring-transparent placeholder:text-gray-500"
                />
                <p className="text-blue-500 text-xs mt-1">Code is 6 digits without spaces</p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="flex flex-col gap-3">
                <Button
                    color="primary1"
                    className="w-full"
                    onClick={handleVerify}
                    disabled={code.length !== 6 || loading}
                >
                    {loading ? "Verifying..." : "Verify account"}
                </Button>
            </div>
        </Dialog>
    );
};

RecovryOTPVerify.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    set2FAEnabled: PropTypes.func,
    is2FAEnabled: PropTypes.bool,
};

export default RecovryOTPVerify;
