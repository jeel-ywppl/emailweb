import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    Button,
    Input,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Dialog,
} from "@material-tailwind/react";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../store";
import {editUser} from "../store/user";
import {editUserValidationSchema} from "../validation/editUserValidationSchema";
import { findDomainWithoutFilter } from "../store/Domain";

const EditUserModal = ({isOpen, user, onClose, setIsEditModalOpen, fetchData}) => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const {noFilterData} = useAppSelector((state) => state.domain);

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

    useEffect(() => {
        dispatch(findDomainWithoutFilter());
    }, [dispatch]);

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
            password: user?.password || "",
            email: user?.email || "",
            domain_id: user?.domain_id || "",
            recovery_email: user?.recovery_email || "",
            phone_number: user?.phone_number || "",
        },
        enableReinitialize: true,
        validationSchema: editUserValidationSchema,
        onSubmit: async (values) => {
            const response = await dispatch(editUser({id: user._id, updatedData: values}));
            if (response?.payload?.success) {
                setIsEditModalOpen(false);
                fetchData();
                resetForm();
            }
        },
    });

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogHeader>Edit {user?.fname}</DialogHeader>
            <DialogBody>
                <form onSubmit={values.handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Input
                            label="Change Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="focus:ring-0 focus:outline-none border-gray-300 pr-10"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        {touched.password && errors.password && (
                            <p className="text-red-500 text-xs">{errors.password}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <input
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-gray-800 bg-white border border-gray-300 flex-grow text-sm pl-4 pr-8 py-2.5 rounded-l-md"
                            placeholder="Enter email"
                        />
                        <select
                            name="domain_id"
                            value={values.domain_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-gray-800 bg-white border border-gray-300 text-sm py-2.5 px-4 rounded-r-md"
                        >
                            <option value="">Select domain</option>
                            {noFilterData.map((domain) => (
                                <option key={domain?._id} value={domain?._id}>
                                    {domain?.domain_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {touched.email && errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                    {touched.domain_id && errors.domain_id && (
                        <p className="text-red-500 text-xs">{errors.domain_id}</p>
                    )}
                    <Input
                        label="Recovery Email"
                        name="recovery_email"
                        type="email"
                        value={values.recovery_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="focus:ring-0 focus:outline-none border-gray-300"
                        fullWidth
                    />
                    {touched.recovery_email && errors.recovery_email && (
                        <p className="text-red-500 text-xs">{errors.recovery_email}</p>
                    )}
                    <Input
                        label="Phone Number"
                        name="phone_number"
                        type="Number"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="focus:ring-0 focus:outline-none border-gray-300"
                        fullWidth
                    />
                    {touched.phone_number && errors.phone_number && (
                        <p className="text-red-500 text-xs">{errors.phone_number}</p>
                    )}
                    {errors.general && <p className="text-red-500 text-xs">{errors.general}</p>}
                </form>
            </DialogBody>

            <DialogFooter className="gap-3">
                <Button color="gray" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button color="green" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

EditUserModal.propTypes = {
    isOpen: PropTypes.bool,
    user: PropTypes.shape({
        _id: PropTypes.string,
        fname: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        domain_id: PropTypes.string,
        recovery_email: PropTypes.string,
        phone_number: PropTypes.string,
    }),
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    fetchData: PropTypes.func,
    setIsEditModalOpen: PropTypes.func,
};

export default EditUserModal;
