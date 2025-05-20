import {useEffect, useState} from "react";
import {getUserInfo} from "../store/auth";
import {editUser} from "../store/user";
import {useAppDispatch, useAppSelector} from "../store";
import {Typography, Switch, Tooltip, Input} from "@material-tailwind/react";
import OtpModal from "../model/OTPModal";
import QRModal from "../model/QRModal";
import PasswordModal from "../model/PasswordModal";
import TopModal from "../model/TopModal";
import LostAccessModal from "../model/LostAccessModal";
import MyButton from "../componets/MyButton";
import {useMaterialTailwindController} from "../context";
import {useFormik} from "formik";
import EnvDashboard from "./EnvDashboard";

const placeholderImage = "https://via.placeholder.com/200";

const AccountSettings = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);
    const [controller] = useMaterialTailwindController();
    const {sidenavColor} = controller;

    const [recoveryEmail, setRecoveryEmail] = useState(user?.recovery?.recovery_email || "");
    const [emailError, setEmailError] = useState("");

    const [qrCode, setQrCode] = useState(null);
    const [is2FAEnabled, set2FAEnabled] = useState(user?.twoFactorStatus);

    const [modals, setModals] = useState({
        password: false,
        qr: false,
        otp: false,
        top: false,
        lostAccess: false,
    });

    useEffect(() => {
        setRecoveryEmail(user?.recovery?.recovery_email || "");
    }, [user]);

    const toggleModal = (key, value) => {
        setModals((prev) => ({...prev, [key]: value}));
    };

    const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    const handleEnable2FA = () => toggleModal("password", true);

    const handlePasswordConfirm = (qrCodeData) => {
        setQrCode(qrCodeData);
        toggleModal("password", false);
        toggleModal("qr", true);
    };

    const handleQRConfirm = () => {
        toggleModal("qr", false);
        toggleModal("otp", true);
    };

    const handleOTPConfirm = () => {
        toggleModal("otp", false);
        toggleModal("top", true);
    };

    const handle2FAComplete = () => {
        toggleModal("top", false);
        set2FAEnabled((prev) => !prev);
    };

    const {handleSubmit, isSubmitting} = useFormik({
        initialValues: {},
        enableReinitialize: true,
        onSubmit: async () => {
            if (!validateEmail(recoveryEmail)) {
                setEmailError("Please enter a valid email address.");
                return;
            }

            setEmailError("");

            const response = await dispatch(
                editUser({
                    id: user?._id,
                    updatedData: {
                        recovery_email: recoveryEmail,
                    },
                }),
            );

            if (response?.payload?.success) {
                dispatch(getUserInfo());
            }
        },
    });

    return (
        <div className="">
            <div className="w-full h-full border rounded-xl p-3 bg-white shadow-lg font-sans mt-2">
                <div className="p-5">
                    <section className="border-b border-gray-200 pb-6 mb-6">
                        <Typography
                            variant="h4"
                            color="primary1-gray"
                            className="font-semibold mb-4"
                        >
                            Two-factor authentication recovery
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <Typography color="primary1" className="font-medium">
                                Recovery email address
                            </Typography>
                            <div className="col-span-2 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="email"
                                        placeholder="Enter email address"
                                        value={recoveryEmail}
                                        onChange={(e) => setRecoveryEmail(e.target.value)}
                                        error={!!emailError}
                                    />
                                    <MyButton
                                        htmlType="button"
                                        label={isSubmitting ? "Saving..." : "Save"}
                                        onClick={handleSubmit}
                                        type={
                                            sidenavColor === "white"
                                                ? "black"
                                                : sidenavColor || "primary"
                                        }
                                        disabled={
                                            isSubmitting ||
                                            recoveryEmail === user?.recovery?.recovery_email
                                        }
                                    />
                                </div>
                                {emailError && (
                                    <Typography color="red" className="text-xs">
                                        {emailError}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </section>

                    <Typography variant="h4" color="primary1-gray" className="font-semibold mb-4">
                        Two-factor authentication
                    </Typography>
                    <Typography color="gray" className="mb-6 text-sm">
                        Add another layer of security to your account. You’ll need to verify
                        yourself with 2FA every time you sign in.
                    </Typography>

                    {is2FAEnabled && (
                        <Typography
                            color="red"
                            className="text-sm cursor-pointer hover:underline mt-2"
                            onClick={() => toggleModal("lostAccess", true)}
                        >
                            Lost access to 2FA?
                        </Typography>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-6">
                        <div className="flex items-center gap-1">
                            <Typography color="primary1-gray" className="font-medium">
                                Authenticator app
                            </Typography>
                            <Tooltip
                                content="Use an authenticator app like Google Authenticator or Authy to generate 6-digit codes."
                                className="max-w-[200px] text-center"
                            >
                                <span className="text-primary1-500 cursor-pointer text-sm">ⓘ</span>
                            </Tooltip>
                        </div>
                        <Switch
                            color="primary1"
                            checked={is2FAEnabled}
                            onChange={handleEnable2FA}
                        />
                    </div>
                </div>
            </div>
            <hr />
            {user?.role_id?.role_id === 0 && <EnvDashboard />}

            {modals.password && (
                <PasswordModal
                    open
                    mode={is2FAEnabled ? "disable" : "enable"}
                    onConfirm={handlePasswordConfirm}
                    onCancel={() => toggleModal("password", false)}
                    setShowQRModal={(val) => toggleModal("qr", val)}
                    setShowOTPModal={(val) => toggleModal("otp", val)}
                    setShowPasswordModal={(val) => toggleModal("password", val)}
                    is2FAEnabled={is2FAEnabled}
                />
            )}
            {modals.qr && (
                <QRModal
                    open
                    imageUrl={qrCode || placeholderImage}
                    onConfirm={handleQRConfirm}
                    onCancel={() => toggleModal("qr", false)}
                />
            )}
            {modals.otp && (
                <OtpModal
                    open
                    mode={is2FAEnabled ? "disable" : "enable"}
                    onConfirm={handleOTPConfirm}
                    onCancel={() => toggleModal("otp", false)}
                    onClose={() => toggleModal("otp", false)}
                    set2FAEnabled={set2FAEnabled}
                    is2FAEnabled={is2FAEnabled}
                />
            )}
            {modals.top && (
                <TopModal open onComplete={handle2FAComplete} is2FAEnabled={is2FAEnabled} />
            )}
            {modals.lostAccess && (
                <LostAccessModal
                    open
                    onClose={() => toggleModal("lostAccess", false)}
                    email={recoveryEmail}
                    user={user}
                    set2FAEnabled={set2FAEnabled}
                    is2FAEnabled={is2FAEnabled}
                />
            )}
        </div>
    );
};

export default AccountSettings;
