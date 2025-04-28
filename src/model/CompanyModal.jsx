import {useEffect} from "react";
import PropTypes from "prop-types";
import {useAppDispatch} from "../store";
import {Dialog, DialogHeader, DialogBody, DialogFooter, Input} from "@material-tailwind/react";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {companyValidationSchema} from "../validation/companyValidationScheama";
import {createCompany, editCompany, findCompany} from "../store/company";
import MyButton from "../componets/MyButton";

const CompanyModal = ({open, handleOpen, editIndex, initialValues, onSuccess}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleOpen();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleOpen]);

    const {
        handleChange,
        handleBlur,
        handleSubmit: formikSubmit,
        values,
        errors,
        touched,
        isSubmitting,
        resetForm,
    } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: companyValidationSchema,
        onSubmit: async (values, {setSubmitting, setFieldError}) => {
            try {
                if (editIndex !== null) {
                    if (!initialValues?._id) {
                        toast.error("Company ID is missing!");
                        return;
                    }
                    const response = await dispatch(
                        editCompany({id: initialValues?._id, updatedData: values}),
                    ).unwrap();

                    if (response?.success) {
                        await dispatch(findCompany());
                        onSuccess?.();
                        toast.success("Company updated successfully!");
                    } else {
                        setFieldError("general", response?.message || "Failed to update company.");
                    }
                } else {
                    const response = await dispatch(createCompany(values)).unwrap();
                    if (response?.success) {
                        await dispatch(findCompany());
                        toast.success("Company created successfully!");
                        onSuccess?.();
                    } else {
                        setFieldError("general", response?.message || "Failed to create company.");
                    }
                }
                handleOpen();
                resetForm();
            } catch (error) {
                toast.error(error || "Something went wrong!");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
                mount: {scale: 1, y: 0},
                unmount: {scale: 0.9, y: -100},
            }}
        >
            <DialogHeader>
                {editIndex !== null ? "Edit Company" : "Create New Company"}
            </DialogHeader>
            <DialogBody>
                <form onSubmit={formikSubmit} className="space-y-4">
                    <div>
                        <Input
                            label="Company Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name && (
                            <p className="text-red-500 text-xs">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.address && errors.address && (
                            <p className="text-red-500 text-xs">{errors.address}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.phone && errors.phone && (
                            <p className="text-red-500 text-xs">{errors.phone}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Industry"
                            name="industry"
                            value={values.industry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.industry && errors.industry && (
                            <p className="text-red-500 text-xs">{errors.industry}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="State"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.state && errors.state && (
                            <p className="text-red-500 text-xs">{errors.state}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.city && errors.city && (
                            <p className="text-red-500 text-xs">{errors.city}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Country"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.country && errors.country && (
                            <p className="text-red-500 text-xs">{errors.country}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                            <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Pin Code"
                            type="number"
                            name="pin_code"
                            value={values.pin_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.pin_code && errors.pin_code && (
                            <p className="text-red-500 text-xs">{errors.pin_code}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Active Status</label>
                        <select
                            name="active_status"
                            value={values.active_status}
                            onChange={(e) => {
                                handleChange({
                                    target: {
                                        name: e.target.name,
                                        value: e.target.value === "true",
                                    },
                                });
                            }}
                            onBlur={handleBlur}
                            className="p-2 border rounded-lg w-full"
                        >
                            <option value="">Select</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        {touched.active_status && errors.active_status && (
                            <p className="text-red-500 text-xs">{errors.active_status}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <MyButton
                            label="Cancel"
                            onClick={handleOpen}
                            type="outlineGray"
                            className="mr-2"
                        />

                        <MyButton
                            htmlType="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            label={
                                isSubmitting
                                    ? "Processing..."
                                    : editIndex !== null
                                    ? "Update"
                                    : "Submit"
                            }
                            type="primary"
                        />
                    </DialogFooter>
                </form>
            </DialogBody>
        </Dialog>
    );
};

CompanyModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    editIndex: PropTypes.number,
    initialValues: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        address: PropTypes.string,
        phone: PropTypes.string,
        industry: PropTypes.string,
        state: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string,
        email: PropTypes.string,
        pin_code: PropTypes.string,
        active_status: PropTypes.string,
    }).isRequired,
};

export default CompanyModal;
