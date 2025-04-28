import {useEffect, useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store";
import {useFormik} from "formik";
import {Button} from "@material-tailwind/react";
import {authenticateUser, getUserInfo, verifyOTPFor2FA} from "../../store/auth";
import {signInValidationSchema} from "../../validation/signInValidationSchema";
import LoginAuthOtpModel from "./loginAuthOtpModel";
import {toast} from "react-toastify";
import {setItem} from "../../utils/localStorage";

const Index = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [showPassword, setShowPassword] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);

    const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const loadRecaptchaScript = () => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    };

    useEffect(() => {
        loadRecaptchaScript();
    }, []);

    const resetRecaptcha = () => {
        window.grecaptcha.reset();
    };

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
        setFieldError,
        setSubmitting,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: signInValidationSchema,
        onSubmit: async (values) => {
            if (!window.grecaptcha || !window.grecaptcha.getResponse) {
                setFieldError("general", "reCAPTCHA is not ready. Please refresh the page.");
                return;
            }

            const recaptchaToken = window.grecaptcha.getResponse();
            if (!recaptchaToken) {
                setFieldError("general", "Please complete the reCAPTCHA.");
                return;
            }

            try {
                const payload = {
                    ...values,
                    "g-recaptcha-response": recaptchaToken,
                };

                const response = await dispatch(authenticateUser(payload));

                if (response?.payload?.otpRequired) {
                    setOtpModalOpen(true);
                } else if (response?.payload?.success) {
                    await dispatch(getUserInfo());
                    navigate("/");
                } else {
                    setFieldError("general", response?.payload?.message || "Login failed.");
                }
                resetRecaptcha();
            } catch (error) {
                console.error(error);
                resetRecaptcha();
                setFieldError("general", "An unexpected error occurred.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && index > 0) {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleOtpSubmit = async () => {
        const otpString = otp.join("");
        const response = await dispatch(
            verifyOTPFor2FA({
                email: values?.email,
                otp: otpString,
            }),
        );
        if (response?.payload?.success) {
            setItem("AUTH_KEY", response?.payload?.token);
            navigate("/");
            setOtpModalOpen(false);
        } else {
            toast.error(response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:flex lg:w-1/2 bg-[#f5f5f5] flex-col p-12 relative">
                <div className="absolute top-6 left-6">
                    <h1 className="text-4xl font-bold tracking-tight text-right">Welcome!</h1>
                </div>

                <div className="flex  items-center justify-center h-full gap-6">
                    <div className="text-5xl font-black text-center">Hive Mailer</div>

                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-16 h-16 text-[#153e6d]"
                        >
                            <path
                                d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM2 24.59V7.23l10.12 7.23zM3.41 26l10.36-10.36 1.64 1.17a1 1 0 0 0 1.16 0l1.64-1.17L28.59 26zM30 24.59 19.88 14.46 30 7.23z"
                                data-name="2-Email"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight">Log in</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email field */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email "
                                className="h-12 border-gray-200 w-full rounded-md"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email && (
                                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                            )}
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600 uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-12 border-gray-200 w-full rounded-md"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                                {touched.password && errors.password && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Remember me checkbox */}
                        <div className="mb-4">
                            <div
                                className="g-recaptcha scale-[0.88] transform origin-left inline-block"
                                data-sitekey={RECAPTCHA_SITE_KEY}
                            ></div>
                            {errors.general && (
                                <p className="text-red-500 text-sm mt-1">{errors.general}</p>
                            )}
                        </div>

                        {/* Submit button */}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex justify-center items-center space-x-2">
                                    <span>Logging In</span>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                </div>
                            ) : (
                                "Log in now"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
            <LoginAuthOtpModel
                open={otpModalOpen}
                otp={otp}
                handleChange={handleOtpChange}
                handleBackspace={handleBackspace}
                handleSubmit={handleOtpSubmit}
                onCancel={() => setOtpModalOpen(false)}
            />
        </div>
    );
};

export default Index;
