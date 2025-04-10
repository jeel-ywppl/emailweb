import {useFormik} from "formik";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/index";
import {registrationValidationSchema} from "../validation/registrationValidationSchema";
import {createUser, findUser} from "../store/user";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {findDomainWithoutFilter} from "../store/Domain";
import {findRoleWithoutFilter} from "../store/roles";
import {Autocomplete, TextField} from "@mui/material";

const RegisterNewUser = ({closeModal, handleNewUserRegistration}) => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const {noFilterData} = useAppSelector((state) => state.domain);
    const {noFilterRole} = useAppSelector((state) => state.roles);
    console.log("🦐 noFilterRole", noFilterRole);

    const {noFilterCompany} = useAppSelector((state) => state.company);

    useEffect(() => {
        dispatch(findDomainWithoutFilter());
        dispatch(findRoleWithoutFilter());
    }, [dispatch]);

    const {
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            domain_id: "",
            phone_number: "",
            recovery_email: "",
            password: "",
            role_id: "",
            companyId: "",
        },
        validationSchema: registrationValidationSchema,
        onSubmit: async (values, {setSubmitting, setFieldError, resetForm}) => {
            try {
                const userData = {...values};
                const response = await dispatch(createUser(userData));

                if (response?.payload?.arg) {
                    resetForm();
                    handleNewUserRegistration();
                } else {
                    setFieldError(
                        "general",
                        response?.payload?.message || "Failed to create user.",
                    );
                }
                await dispatch(findUser());
                closeModal();
            } catch {
                setFieldError("email", "Submission failed. Try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-20 z-50 flex items-center justify-center">
                <div className="font-[sans-serif] max-w-4xl flex items-center md:h-screen p-4">
                    <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden relative bg-white">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="max-md:order-1 flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4 hidden md:block">
                            <div>
                                <h4 className="text-white text-lg">Create Your Account</h4>
                                <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                                    Welcome to our registration page! Get started by creating your
                                    account.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white text-lg">Simple & Secure Registration</h4>
                                <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                                    Our registration process is designed to be straightforward and
                                    secure. We prioritize your privacy and data security.
                                </p>
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="md:col-span-2 w-full py-6 px-4 sm:px-10 max-md:max-w-xl mx-auto"
                        >
                            <div className="space-y-4">
                                <div className="mr-2">
                                    <label className="text-gray-600 text-sm mb-1 block">
                                        First Name
                                    </label>
                                    <input
                                        name="fname"
                                        type="text"
                                        value={values.fname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                                            touched.fname && errors.fname ? "border-red-500" : ""
                                        }`}
                                        placeholder="Enter first name"
                                    />
                                    {touched.fname && errors.fname && (
                                        <div className="text-red-500 text-sm">{errors.fname}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-gray-600 text-sm mb-1 block">
                                        Last Name
                                    </label>
                                    <input
                                        name="lname"
                                        type="text"
                                        value={values.lname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                                            touched.lname && errors.lname ? "border-red-500" : ""
                                        }`}
                                        placeholder="Enter last name"
                                    />
                                    {touched.lname && errors.lname && (
                                        <div className="text-red-500 text-sm">{errors.lname}</div>
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
                                    <Autocomplete
                                        sx={{width: "50%"}}
                                        options={noFilterCompany}
                                        getOptionLabel={(option) => option?.name || ""}
                                        onChange={(event, selectedOption) => {
                                            const companyId = selectedOption?._id || "";
                                            setFieldValue("companyId", companyId);
                                            setFieldValue("domain_id", ""); 
                                            dispatch(
                                                findRoleWithoutFilter({company_id: companyId}),
                                            );
                                            dispatch(
                                                findDomainWithoutFilter({company_id: companyId}),
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Choose a company"
                                                variant="outlined"
                                                size="small"
                                                className="bg-white w-full"
                                                InputLabelProps={{
                                                    className: "text-sm text-gray-700",
                                                }}
                                            />
                                        )}
                                    />

                                    <Autocomplete
                                        sx={{width: "50%"}}
                                        options={noFilterRole}
                                        getOptionLabel={(option) => option?.role_name || ""}
                                        onChange={(event, selectedOption) => {
                                            const roleId = selectedOption?._id || "";
                                            setFieldValue("role_id", roleId);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="All roles"
                                                variant="outlined"
                                                size="small"
                                                className="bg-white w-full"
                                                InputLabelProps={{
                                                    className: "text-sm text-gray-700",
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-600 text-sm mb-1 block">
                                        Email Address
                                    </label>
                                    <div className="flex items-center gap-1">
                                        <input
                                            name="email"
                                            type="text"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`text-gray-800 bg-white border border-gray-300 flex-grow text-sm pl-4 pr-8 py-2.5 rounded-l-md ${
                                                touched.email && errors.email
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            placeholder="Enter email (e.g., example123)"
                                        />
                                        <select
                                            name="domain_id"
                                            value={values.domain_id}
                                            onChange={(e) =>
                                                setFieldValue("domain_id", e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            className={`text-gray-800 bg-white border border-gray-300 text-sm py-2.5 px-4 rounded-r-md ${
                                                touched.domain_id && errors.domain_id
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <option value="">Select domain</option>
                                            {noFilterData.map((domain) => (
                                                <option key={domain?._id} value={domain?._id}>
                                                    {domain?.domain_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {(touched.email && errors.email) ||
                                    (touched.sub_domain && errors.sub_domain) ? (
                                        <div className="text-red-500 text-sm">
                                            {errors.email || errors.sub_domain}
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="text-gray-600 text-sm mb-1 block">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone_number"
                                        type="text"
                                        value={values.phone_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                                            touched.phone_number && errors.phone_number
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        placeholder="Enter phone number"
                                    />
                                    {touched.phone_number && errors.phone_number && (
                                        <div className="text-red-500 text-sm">
                                            {errors.phone_number}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-gray-600 text-sm mb-1 block">
                                        Recovery Email
                                    </label>
                                    <input
                                        name="recovery_email"
                                        type="text"
                                        value={values.recovery_email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                                            touched.recovery_email && errors.recovery_email
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        placeholder="Enter Recovery Email"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="text-gray-600 text-sm mb-1 block">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                                            touched.password && errors.password
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 top-6 right-3 flex items-center text-gray-500"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>

                                    {touched.password && errors.password && (
                                        <div className="text-red-500 text-sm">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <input
                                        name="acceptTerms"
                                        type="checkbox"
                                        className="h-4 w-4 shrink-0 text-dark  border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="acceptTerms"
                                        className="ml-3 block text-sm text-gray-600"
                                    >
                                        I accept the{" "}
                                        <a
                                            href="javascript:void(0);"
                                            className="text-dark font-semibold hover:underline ml-1"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2.5 px-5 text-sm text-white bg-secondary2 rounded-lg hover:bg-primary1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    {isSubmitting ? "Creating..." : "Create User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

RegisterNewUser.propTypes = {
    closeModal: PropTypes.func.isRequired,
    handleNewUserRegistration: PropTypes.func.isRequired,
};

export default RegisterNewUser;
