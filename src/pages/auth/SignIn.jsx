import {useEffect, useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store";
import {useFormik} from "formik";
import {Button} from "@material-tailwind/react";
import {authenticateUser, getUserInfo, reCaptcha, verifyOTPFor2FA} from "../../store/auth";
import {signInValidationSchema} from "../../validation/signInValidationSchema";
import LoginAuthOtpModel from "./loginAuthOtpModel";
import {setItem} from "../../utils/localStorage";

const Index = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [showPassword, setShowPassword] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [captchaImage, setCaptchaImage] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");

    const fetchCaptcha = async () => {
        try {
            const response = await dispatch(reCaptcha({captcha_text: ""}));
            console.log("CAPTCHA API Response:", response);
            if (response?.payload) {
                setCaptchaImage(response.payload.svg); 
                setCaptchaToken(response.payload.captcha_token); 
                console.log("🍯 Captcha Token:", response.payload.captcha_token);
            } else {
                console.warn("Invalid CAPTCHA response:", response);
            }
        } catch (error) {
            console.error("Error fetching CAPTCHA:", error);
        }
    };
    useEffect(() => {
        fetchCaptcha();
    }, []);

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
            try {
                const payload = {
                    ...values,
                    captcha_text: captchaText,
                    captcha_token: captchaToken, // Include the captcha token here
                };

                const response = await dispatch(
                    authenticateUser({
                        ...payload,
                    }),
                );

                if (response?.payload?.otpRequired) {
                    setOtpModalOpen(true);
                } else if (response?.payload?.success) {
                    await dispatch(getUserInfo());
                    navigate("/");
                } else {
                    setFieldError("general", response?.payload?.message || "Login failed.");
                    fetchCaptcha(); // Refresh CAPTCHA on failure
                }
            } catch (error) {
                console.error(error);
                setFieldError("general", "An unexpected error occurred.");
                fetchCaptcha(); // Refresh CAPTCHA on failure
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
            console.error(response?.payload?.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:flex lg:w-1/2 bg-[url('/imgs/pattern.png')] bg-cover bg-center flex-col p-12 relative">
                <div className="absolute top-6 left-6">
                    <h1 className="text-4xl font-bold tracking-tight text-right text-white">
                        Welcome!
                    </h1>
                </div>

                <div className="flex items-center justify-center h-full gap-6">
                    <div className="flex items-center gap-4 bg-gradient-to-r from-zinc-800 to-zinc-700 p-6 rounded-md">
                        <div className="bg-white p-2 rounded-md">
                            <img
                                src="/imgs/smalllogo.png"
                                alt="Invoxx Logo"
                                className="w-10 h-10"
                            />
                        </div>

                        <h1 className="text-white text-6xl font-[800] uppercase font-Special_Gothic_Expanded_One">
                            INNVOXX
                        </h1>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight">Log in</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
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

                        {/* CAPTCHA Section */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600 uppercase tracking-wide">
                                CAPTCHA
                            </label>
                            <div className="flex items-center gap-3">
                                {captchaImage && (
                                    <div
                                        className="rounded"
                                        dangerouslySetInnerHTML={{__html: captchaImage}}
                                    />
                                )}
                                <input
                                    type="text"
                                    placeholder="Enter CAPTCHA"
                                    className="h-12 border-gray-200 w-full rounded-md"
                                    value={captchaText}
                                    onChange={(e) => setCaptchaText(e.target.value)}
                                />
                            </div>
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
