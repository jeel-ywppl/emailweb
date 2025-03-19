import {useEffect, useState} from "react";
import {useAppSelector} from "../store";
import {Typography, Button, Switch, Tooltip, Input} from "@material-tailwind/react";
import OtpModal from "../model/OTPModal";
import QRModal from "../model/QRModal";
import PasswordModal from "../model/PasswordModal";
import TopModal from "../model/TopModal";
import LostAccessModal from "../model/LostAccessModal"

const AccountSettings = () => {
    const {user} = useAppSelector((state) => state.auth);
    const [recoveryEmail, setRecoveryEmail] = useState(user?.recovery?.recovery_email || "");
    const [emailError, setEmailError] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showTopModal, setShowTopModal] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [is2FAEnabled, set2FAEnabled] = useState(user?.twoFactorStatus);
    const [isLostAccessModalOpen, setIsLostAccessModalOpen] = useState(false);

    const placeholderImage = "https://via.placeholder.com/200";

    console.log(user?.recovery?.recovery_email, "user?.recoveryEmail");

    useEffect(() => {
        setRecoveryEmail(user?.recovery?.recovery_email || "");
    }, [user]);

    const saveEmail = () => {
        if (!recoveryEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
            console.log("Saved recovery email:", recoveryEmail);
            alert("Recovery email saved!");
        }
    };

    const handleEnable2FA = (event) => {
        if (event.target.checked) {
            setShowPasswordModal(true);
        } else {
            setShowPasswordModal(true);
        }
    };

    const handlePasswordConfirm = (qrCode) => {
        setShowPasswordModal(false);
        setQrCode(qrCode);
    };

    const handleQRConfirm = () => {
        setShowQRModal(false);
        setShowOTPModal(true);
    };

    const handleOTPConfirm = () => {
        setShowOTPModal(false);  
        setShowTopModal(true);   
    };
    

    const handleOTPCancel = () => {
        setShowOTPModal(false);
    };

    const handle2FAComplete = () => {
        setShowTopModal(false);
        set2FAEnabled((prevState) => !prevState);
    };

    return (
        <div className="p-5">
            <section className="border-b border-gray-200 pb-6 mb-6">
                <Typography variant="h4" color="primary1-gray" className="font-semibold mb-4">
                    Account recovery
                </Typography>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <Typography color="primary1" className="font-medium">
                            Recovery email address
                        </Typography>
                        <div className="col-span-2 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Input
                                    type="email"
                                    color="primary1-gray"
                                    placeholder="Enter email address"
                                    value={recoveryEmail}
                                    onChange={(e) => setRecoveryEmail(e.target.value)}
                                    error={emailError ? true : false}
                                />
                                {emailError && (
                                    <Typography color="red" className="text-xs">
                                        {emailError}
                                    </Typography>
                                )}
                                <Button color="primary1" onClick={saveEmail}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Typography variant="h4" color="primary1-gray" className="font-semibold mb-4">
                Two-factor authentication
            </Typography>
            <Typography color="gray" className="mb-6 text-sm">
                Add another layer of security to your account. You’ll need to verify yourself with
                2FA every time you sign in.
            </Typography>
            <div className="space-y-6">
                {is2FAEnabled && (
                    <div className="mt-2">
                        <Typography
                            color="red"
                            className="text-sm cursor-pointer hover:underline"
                            onClick={() => setIsLostAccessModalOpen(true)}
                        >
                            Lost access to 2FA?
                        </Typography>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Typography color="primary1-gray" className="font-medium">
                            Authenticator app
                        </Typography>
                        <Tooltip content="Use an authenticator app like Google Authenticator or Authy to generate 6-digit codes.">
                            <span className="text-primary1-500 cursor-pointer text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <Switch color="primary1" checked={is2FAEnabled} onChange={handleEnable2FA} />
                </div>
            </div>
            {showPasswordModal && (
                <PasswordModal
                    open={showPasswordModal}
                    onConfirm={handlePasswordConfirm}
                    onCancel={() => setShowPasswordModal(false)}
                    setShowQRModal={setShowQRModal}
                    setShowOTPModal={setShowOTPModal}
                    is2FAEnabled={is2FAEnabled}
                    setShowPasswordModal={setShowPasswordModal}
                />
            )}

            {showQRModal && (
                <QRModal
                    imageUrl={qrCode || placeholderImage}
                    onConfirm={handleQRConfirm}
                    open={showQRModal}
                    onCancel={() => setShowQRModal(false)}
                />
            )}

            {showOTPModal && (
                <OtpModal
                    open={showOTPModal}
                    onConfirm={handleOTPConfirm}
                    onCancel={handleOTPCancel}
                    set2FAEnabled={set2FAEnabled}
                    is2FAEnabled={is2FAEnabled}
                />
            )}

            {showTopModal && (
                <TopModal
                    open={showTopModal}
                    onComplete={handle2FAComplete}
                    is2FAEnabled={is2FAEnabled}
                />
            )}

            <LostAccessModal
                open={isLostAccessModalOpen}
                onClose={() => setIsLostAccessModalOpen(false)}
                email={recoveryEmail} 
                user={user}
                set2FAEnabled={set2FAEnabled}
                is2FAEnabled={is2FAEnabled}
            />
        </div>
    );
};

export default AccountSettings;
