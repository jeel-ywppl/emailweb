import {useFormik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "@material-tailwind/react";
import {createClient} from "../../../store/client";
import {useAppDispatch} from "../../../store";
import {ChevronLeft, EyeIcon, EyeOffIcon} from "lucide-react";
import MyButton from "../../../componets/MyButton";
import {useState} from "react";
import { createClientValidationSchema } from "../../../validation/createClientValidationSchema";

const CreateClientForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const {handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, touched} =
        useFormik({
            initialValues: {
                company_name: "",
                subdomain: "",
                fname: "",
                lname: "",
                client_email: "",
                password: "",
            },
            validationSchema: createClientValidationSchema,
            onSubmit: async (values) => {
                const res = await dispatch(createClient(values));
                if (res?.type === "client/createClient/fulfilled" || res?.success) {
                    navigate(-1);
                }
            },
        });

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Companies
                </Link>
            </div>
            <div className="p-6 max-w-2xl mx-auto ">
                <h2 className="text-2xl font-semibold mb-6">Add New Client</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="">
                        <Input
                            label="Company Name"
                            name="company_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.company_name}
                        />
                        {touched.company_name && errors.company_name && (
                            <div className="text-red-500 text-xs">{errors.company_name}</div>
                        )}
                    </div>

                    <div className="">
                        <Input
                            label="Subdomain"
                            name="subdomain"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.subdomain}
                        />
                        {touched.subdomain && errors.subdomain && (
                            <div className="text-red-500 text-xs">{errors.subdomain}</div>
                        )}
                    </div>

                    <div className="">
                        <Input
                            label="First Name"
                            name="fname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fname}
                        />
                        {touched.fname && errors.fname && (
                            <div className="text-red-500 text-xs">{errors.fname}</div>
                        )}
                    </div>

                    <div className="">
                        <Input
                            label="Last Name"
                            name="lname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lname}
                        />
                        {touched.lname && errors.lname && (
                            <div className="text-red-500 text-xs">{errors.lname}</div>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Client Email"
                            name="client_email"
                            type="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.client_email}
                        />
                        {touched.client_email && errors.client_email && (
                            <div className="text-red-500 text-xs">{errors.client_email}</div>
                        )}
                    </div>

                    <div className="relative">
                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0  right-3 flex items-center text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        {touched.password && errors.password && (
                            <div className="text-red-500 text-xs">{errors.password}</div>
                        )}
                    </div>

                    <div className="col-span-full flex justify-end mt-4">
                        <MyButton
                            label={isSubmitting ? "Creating..." : "Create Client"}
                            htmlType="submit"
                            fullWidth
                            disabled={isSubmitting}
                            type="primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClientForm;
