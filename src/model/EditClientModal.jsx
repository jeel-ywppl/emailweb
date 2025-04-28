import {useEffect, useState} from "react";
import {useAppDispatch} from "../store";
import {editClient, findClient} from "../store/client";
import {useFormik} from "formik";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {Dialog, Input} from "@material-tailwind/react";
import PropTypes from "prop-types";
import MyButton from "../componets/MyButton";
import { editClientValidationSchema } from "../validation/editClientValidationSchema";

const EditClientModal = ({clientData, isOpen, onClose, setIsEditModalOpen}) => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsEditModalOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setIsEditModalOpen]);

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
        resetForm,
    } = useFormik({
        initialValues: {
            fname: clientData?.fname || "",
            lname: clientData?.lname || "",
            email: clientData?.email || "",
            company_name: clientData?.company_name || "",
            subdomain: clientData?.subdomain || "",
            client_email: clientData?.client_email || "",
        },
        enableReinitialize: true,
        validationSchema: editClientValidationSchema,
        onSubmit: async (values) => {
            const response = await dispatch(editClient({id: clientData?._id, updatedData: values}));
            if (response?.payload?.success) {
                setIsEditModalOpen(false);
                dispatch(findClient());
                resetForm();
            }
        },
    });

    return (
        <Dialog open={isOpen} onClose={onClose} size="md">
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Edit Client</h3>
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

                    <div className="col-span-full flex justify-end mt-4 gap-4">
                        <MyButton
                            label="Cancel"
                            onClick={onClose}
                            type="outlineGray"
                            disabled={isSubmitting}
                        />

                        <MyButton
                            label={isSubmitting ? "Creating..." : "Create Client"}
                            htmlType="submit"
                            disabled={isSubmitting}
                            type="primary"
                        />
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

EditClientModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    fetchData: PropTypes.func,
    setIsEditModalOpen: PropTypes.func,
    clientData: PropTypes.object,
};

export default EditClientModal;
