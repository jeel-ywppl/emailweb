import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {Button, Checkbox, Input, Typography} from "@material-tailwind/react";
import {useFormik} from "formik";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {authenticateUser, getUserInfo, verifyOTPFor2FA} from "../../store/auth";
import {signInValidationSchema} from "../../validation/signInValidationSchema";
import {useAppDispatch, useAppSelector} from "../../store";
import LoginAuthOtpModel from "./loginAuthOtpModel";
import {toast} from "react-toastify";
import {setItem} from "../../utils/localStorage";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [showPassword, setShowPassword] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const {user} = useAppSelector((state) => state.auth);

    const {handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, touched} =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: signInValidationSchema,
            onSubmit: async (values, {setSubmitting, setFieldError}) => {
                try {
                    console.log("response----", values);
                    const response = await dispatch(authenticateUser(values));
                    if (response?.payload?.otpRequired) {
                        setOtpModalOpen(true);
                    } else {
                        setOtpModalOpen(false);
                        navigate("/");
                    }
                    if (response?.payload?.success && !response?.payload?.otpRequired) {
                        await dispatch(getUserInfo());
                        console.log(user, "authentication trfsl");
                        // if (response?.payload?.otpRequired) {
                        //     console.log("setOtpModalOpen", response?.payload);
                        //     setOtpModalOpen(true);
                        // } else {
                        //     setOtpModalOpen(false);
                        //     navigate("/inbox");
                        // }
                    } else {
                        console.log("response?.payload?.message", response?.payload?.message);
                        setFieldError("general", response?.payload?.message || "Login failed.");
                    }
                } catch {
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
        <section
            className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{backgroundImage: `url('/imgs/1746.jpg')`}}
        >
            <div className="absolute inset-0 bg-black/40 "></div>
            <div className="relative inset-0 bg-black/0 backdrop-blur-[1px] w-full sm:w-4/5 lg:w-5/12 xl:w-[35%] px-5 sm:px-10  border rounded-xl py-8 border-gray-200 bg-trasparant   text-white">
                <div className="text-center ">
                    <Typography variant="h3" className="font-bold mb-4 text-white">
                        Log In
                    </Typography>
                    <Typography variant="paragraph" color="" className="text-lg font-normal">
                        Enter your email and password to Sign In.
                    </Typography>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 mb-2 mx-auto w-full">
                    <div className="mb-4">
                        <Typography variant="small" color="" className="mb-1 font-medium">
                            Email
                        </Typography>
                        <Input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            labelProps={{
                                className: "hidden",
                            }}
                            className="border border-white  text-white focus:shadow-md focus:shadow-gray-500 ring-1 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-white focus:!border-t-white "
                        />
                        {touched.email && errors.email && (
                            <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <Typography variant="small" color="" className="mb-1 font-medium">
                            Password
                        </Typography>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={values.password}
                                placeholder="********"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="border border-white  text-white focus:shadow-md focus:shadow-gray-500 ring-1 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-white focus:!border-t-white "
                            />
                            <button
                                type="button"
                                className="absolute top-2.5 right-3 text-gray-500 focus:outline-none"
                                size="xs"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {touched.password && errors.password && (
                            <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Checkbox
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={values.acceptTerms}
                            onChange={handleChange}
                            className="border border-gray-200"
                            containerProps={{className: "-ml-2.5"}}
                            label={
                                <Typography
                                    variant="small"
                                    color="white"
                                    className="flex items-center justify-start font-medium"
                                >
                                    I agree to the&nbsp;
                                    <Link
                                        to="#"
                                        className="font-normal transition-colors hover:text-blue-900 underline"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </Typography>
                            }
                        />
                        {touched.acceptTerms && errors.acceptTerms && (
                            <div className="text-red-500 text-sm mt-1">{errors.acceptTerms}</div>
                        )}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        className="mt-6 bg-blue-trasparant border border-white text-white hover:shadow-md hover:shadow-gray-500 ring-1 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 hover:!border-white hover:!border-t-white"
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
                            "Log In"
                        )}
                    </Button>
                </form>
            </div>
            <LoginAuthOtpModel
                open={otpModalOpen}
                otp={otp}
                handleChange={handleOtpChange}
                handleBackspace={handleBackspace}
                handleSubmit={handleOtpSubmit}
                onCancel={() => setOtpModalOpen(false)}
            />
        </section>
    );
};

export default SignIn;
