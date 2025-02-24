import {useEffect} from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
} from "@material-tailwind/react";
import {useFormik} from "formik";
import {companyValidationSchema} from "../validation/companyValidationScheama";

const CompanyModal = ({open, handleOpen, handleSubmit, editIndex, initialValues}) => {
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
        resetForm,
    } = useFormik({
        initialValues: {
            name: initialValues?.name || "",
            address: initialValues?.address || "",
            phone: initialValues?.phone || "",
            industry: initialValues?.industry || "",
            state: initialValues?.state || "",
            city: initialValues?.city || "",
            country: initialValues?.country || "",
            email: initialValues?.email || "",
            pin_code: initialValues?.pin_code || "",
            active_status: initialValues?.active_status || "",
        },
        enableReinitialize: true,
        validationSchema: companyValidationSchema,
        onSubmit: async (values, formikHelpers) => {
            await handleSubmit(values, formikHelpers); 
            resetForm();
            handleOpen();
        },
    });

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>
                {editIndex !== null ? "Edit Company" : "Create New Company"}
            </DialogHeader>
            <DialogBody>
                <form onSubmit={formikSubmit} className="space-y-4">
                    {/* Company Name */}
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

                    {/* Address */}
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

                    {/* Phone Number */}
                    <div>
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="number"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.phone && errors.phone && (
                            <p className="text-red-500 text-xs">{errors.phone}</p>
                        )}
                    </div>

                    {/* Industry */}
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

                    {/* State */}
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

                    {/* City */}
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

                    {/* Country */}
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

                    {/* Email */}
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

                    {/* Pin Code */}
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

                    {/* Active Status */}
                    <div>
                        <label className="text-sm font-medium">Active Status</label>
                        <select
                            name="active_status"
                            value={values.active_status}
                            onChange={handleChange}
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

                    {/* Modal Actions */}
                    <DialogFooter>
                        <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {editIndex !== null ? "Update" : "Submit"}
                        </Button>
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
    editIndex: PropTypes.number,
    initialValues: PropTypes.shape({
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
